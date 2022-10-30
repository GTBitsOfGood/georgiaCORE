import React, { useMemo, useRef, useReducer, useEffect } from "react";
import { useSession } from "next-auth/react";

import ReactFlow, {
  useOnSelectionChange,
  useKeyPress,
  useReactFlow,
  addEdge,
  ReactFlowProvider,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  MiniMap,
  Controls,
} from "reactflow";

import { Button, useDisclosure } from "@chakra-ui/react";

import EditQuestionModal from "./EditQuestionModal";
import ErrorPage from "src/components/ErrorPage";
import { createNode, generateInitialNodes } from "./reactflow";
import { getAllQuestions, setQuestions } from "src/actions/Question";
import { getAuthUsers } from "src/actions/AuthUser";
import NavigationTree from "src/navigation/NavigationTree";
import testQuestions from "./testQuestions";
import InstructionsModal from "./InstructionsModal";
import RootNode from "src/components/Nodes/RootNode";
import OptionNode from "src/components/Nodes/OptionNode";
import TextNode from "src/components/Nodes/TextNode";

const deleteNodesAndEdges = (nodes, edges, navigationTree, questionId) => {
  const newNodes = nodes.filter(
    (node) => node.id !== questionId && node.parentNode !== questionId
  );

  const optionIds = navigationTree
    .getQuestion(questionId)
    .options.map((o) => o.id);

  const newEdges = edges.filter(
    (edge) =>
      edge.source !== questionId &&
      edge.target !== questionId &&
      !optionIds.includes(edge.source)
  );

  return [newNodes, newEdges];
};

const deleteNode = (nodes, edges, nodeId) => {
  const newNodes = nodes.filter((node) => node.id !== nodeId);

  return [newNodes, edges];
};

const reducer = (state, action) => {
  switch (action.type) {
    case "open_edit_modal":
      return {
        ...state,
        editModalOpen: true,
        editModalNodeId: action.questionId,
      };
    case "copy":
      return {
        ...state,
        copiedNode: state.selectedNode,
      };
    case "paste": {
      const copiedNode = action.copiedNode;
      console.log(copiedNode);
      if (!copiedNode) {
        return state;
      }

      const question = state.navigationTree.getQuestion(copiedNode.id);
      const copyOfQuestion = state.navigationTree.copyQuestion(question);
      state.navigationTree.addQuestion(copyOfQuestion);

      const [newNodes, newEdges] = createNode({
        question: copyOfQuestion,
        x: copiedNode.position.x + 100,
        y: copiedNode.position.y + 100,
      });

      return {
        ...state,
        nodes: [...state.nodes, ...newNodes],
        edges: [...state.edges, ...newEdges],
      };
    }
    case "selection_change":
      console.log(action);
      return {
        ...state,
        selectedNode: action.nodes[0],
      };
    case "update_question": {
      state.navigationTree.updateQuestion(action.question);
      // get the current question x and y
      const node = state.nodes.find((n) => n.id === action.question.id);
      const connectingEdge = state.edges.find((e) => e.target === node.id);

      // delete and recreate the corresponding nodes and edges
      let [newNodes, newEdges] = deleteNodesAndEdges(
        state.nodes,
        state.edges,
        state.navigationTree,
        action.question.id
      );

      let connectingNodeId = null;
      if (connectingEdge) {
        connectingNodeId = connectingEdge.source;
      }
      const [recreatedNodes, recreatedEdges] = createNode({
        question: action.question,
        x: node.position.x,
        y: node.position.y,
        connectingNodeId,
      });

      newNodes = [...newNodes, ...recreatedNodes];
      newEdges = [...newEdges, ...recreatedEdges];

      return {
        ...state,
        nodes: newNodes,
        edges: newEdges,
      };
    }
    case "delete_question": {
      var [deletedNodes, deletedEdges] = [state.nodes, state.edges];
      action.nodes.forEach((node) => {
        const question = state.navigationTree.getQuestion(node.id);
        // option nodes will be deleted with update_question so we
        // just delete questions from tree
        if (question && !question.isRoot) {
          state.navigationTree.deleteQuestion(node.id);

          [deletedNodes, deletedEdges] = deleteNode(
            deletedNodes,
            deletedEdges,
            node.id
          );
        }
      });

      return {
        ...state,
        nodes: deletedNodes,
        edges: deletedEdges,
      };
    }
    case "edge_delete":
      action.edges.forEach((edge) => {
        const optionId = edge.source;
        const parentId = state.nodes.find(
          (node) => node.id == optionId
        ).parentNode;
        const parentQuestion = state.navigationTree.getQuestion(parentId);

        const option = parentQuestion.options.find((o) => o.id === optionId);
        const newQuestion = {
          ...parentQuestion,
          options: parentQuestion.options.map((o) => {
            if (o.id == optionId) {
              return {
                ...option,
                nextId: null,
              };
            }
            return o;
          }),
        };
        state.navigationTree.updateQuestion(newQuestion);
      });

      return state;
    case "close_edit_modal":
      return { ...state, editModalOpen: false };
    case "node_change":
      return { ...state, nodes: applyNodeChanges(action.changes, state.nodes) };
    case "edge_change":
      return { ...state, edges: applyEdgeChanges(action.changes, state.edges) };
    case "connect": {
      // Assert that the connection is valid
      // 1. The edge does not already exist
      // 2. The option is not already connected to another question
      // 3. The edge connects an option to a non-option node
      // 4. The edge connects an option to a question that is not the parent of the option
      const { source, target } = action.connection;
      const sourceNode = state.nodes.find((n) => n.id === source);
      const targetNode = state.nodes.find((n) => n.id === target);

      // 1. The edge does not already exist
      // 2. The option is not already connected to another question
      if (sourceNode.dataType === "option") {
        if (
          state.edges.some((e) => e.source === source || e.target === source)
        ) {
          return state;
        }
      } else if (targetNode.dataType === "option") {
        if (
          state.edges.some((e) => e.target === target || e.source === target)
        ) {
          return state;
        }
      }

      // 3. The edge connects an option to a non-option node
      if (
        sourceNode.dataType !== "option" &&
        targetNode.dataType !== "option"
      ) {
        return state;
      }

      // 4. The edge connects an option to a question that is not the parent of the option
      if (
        sourceNode.parentNode === target ||
        targetNode.parentNode === source
      ) {
        return state;
      }

      let questionId = "";
      if (sourceNode.dataType === "option") {
        questionId = sourceNode.parentNode;
      } else {
        questionId = targetNode.parentNode;
      }

      const question = state.navigationTree.getQuestion(questionId);
      const option = question.options.find(
        (o) => o.id === source || o.id === target
      );

      const newQuestion = {
        ...question,
        options: question.options.map((o) => {
          if (o.id === option.id) {
            return {
              ...option,
              nextId: target,
            };
          }
          return o;
        }),
      };

      state.navigationTree.updateQuestion(newQuestion);
      return { ...state, edges: addEdge(action.connection, state.edges) };
    }
    case "connect_stop": {
      const event = action.event;
      const targetIsPane = event.target.classList.contains("react-flow__pane");

      // User ended a connection not to a node
      if (
        targetIsPane &&
        action.connectingNode.current.handleType === "source"
      ) {
        // Check if the source node already has an edge
        const sourceNodeHasEdge = state.edges.some(
          (e) =>
            e.source === action.connectingNode.current.nodeId ||
            e.target === action.connectingNode.current.nodeId
        );
        if (sourceNodeHasEdge) return state;

        // we need to remove the wrapper bounds, in order to get the correct position
        const { top, left } =
          action.reactFlowWrapper.current.getBoundingClientRect();
        const { x, y } = action.project({
          x: event.clientX - left,
          y: event.clientY - top,
        });

        const question = state.navigationTree.createUntitledQuestion();
        state.navigationTree.addQuestion(question);
        const parentQuestion = state.navigationTree.getQuestionByOptionId(
          action.connectingNode.current.nodeId
        );
        state.navigationTree.updateQuestion({
          ...parentQuestion,
          options: parentQuestion.options.map((option) => {
            return {
              ...option,
              nextId:
                option.id === action.connectingNode.current.nodeId
                  ? question.id
                  : option.nextId,
            };
          }),
        });
        const [newNodes, newEdges] = createNode({
          question,
          x,
          y,
          connectingNodeId: action.connectingNode.current.nodeId,
        });
        return {
          ...state,
          nodes: state.nodes.concat(newNodes),
          edges: state.edges.concat(newEdges),
        };
      }
      return state;
    }
    case "set_state": {
      const [nodes, edges] = generateInitialNodes(
        state.navigationTree.getQuestions()
      );
      return { ...state, nodes, edges, editModalOpen: false };
    }
    default:
      throw Error("Unknown action: " + action.type);
  }
};

const TreeEditor = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNode = useRef(null);
  const copiedNode = useRef(null);

  const { project } = useReactFlow();
  const { data: session, status } = useSession();
  const [authUser, setAuthUser] = React.useState("");

  const [state, dispatch] = useReducer(reducer, {}, () => {
    const navigationTree = new NavigationTree([]);
    const [nodes, edges] = generateInitialNodes(navigationTree.getQuestions());
    return {
      nodes,
      edges,
      navigationTree,
      editModalOpen: false,
      selectedNode: null,
    };
  });

  // Copy and paste nodes
  const cmdCPressed = useKeyPress(["Meta+c", "Strg+c"]);
  const cmdVPressed = useKeyPress(["Meta+v", "Strg+v"]);

  useEffect(() => {
    if (cmdCPressed) {
      copiedNode.current = state.selectedNode;
    }
  }, [cmdCPressed, state.selectedNode]);
  useEffect(() => {
    if (cmdVPressed) {
      dispatch({
        type: "paste",
        copiedNode: copiedNode.current,
      });
    }
  }, [cmdVPressed]);

  // initialize navigationTree in reducer
  useEffect(() => {
    async function initializeQuestions() {
      const questions = await getAllQuestions();
      if (questions.length > 0) {
        state.navigationTree.setQuestions(questions);
      } else {
        // temporary initial tree for debugging
        state.navigationTree.setQuestions(testQuestions);
      }
      // force reducer to recognize changed navigationTree
      dispatch({ type: "set_state" });
    }
    initializeQuestions();
  }, [state.navigationTree]);

  useOnSelectionChange({
    onChange: ({ nodes }) => dispatch({ type: "selection_change", nodes }),
  });

  React.useEffect(() => {
    async function setAllAuthUserEmails() {
      const newAuthUsers = [];
      const newAuthUsersData = await getAuthUsers();
      newAuthUsers.push(newAuthUsersData);
      if (newAuthUsers[0] && session) {
        let emailsArray = [];
        for (let i = 0; i < Object.values(newAuthUsers[0]).length; i++) {
          emailsArray.push(newAuthUsers[0][i].email);
        }
        if (emailsArray.includes(session.user.email)) {
          setAuthUser("allowed");
        } else if (!emailsArray.includes(session.user.email)) {
          setAuthUser("not allowed");
        }
      }
    }

    setAllAuthUserEmails().catch((e) => {
      throw new Error("Invalid token!" + e);
    });
  }, [session]);

  const nodeTypes = useMemo(
    () => ({ root: RootNode, text: TextNode, option: OptionNode }),
    []
  );

  const {
    isOpen: isInstructionsOpen,
    onOpen: openInstructions,
    onClose: onInstructionsClose,
  } = useDisclosure();

  if (status === "loading") {
    return <></>;
  } else if (status == "authenticated" && authUser != "allowed") {
    return (
      <>
        <ErrorPage message="User Cannot Access this Page." />
      </>
    );
  } else if (status == "unauthenticated") {
    return (
      <>
        <ErrorPage message="User is not logged in." />
      </>
    );
  }

  return (
    <>
      <InstructionsModal
        isOpen={isInstructionsOpen}
        onClose={onInstructionsClose}
      />

      <div
        className="wrapper"
        ref={reactFlowWrapper}
        style={{ height: "100%", width: "100%" }}
      >
        <EditQuestionModal
          isOpen={state.editModalOpen}
          dispatch={dispatch}
          question={state.navigationTree.getQuestion(state.editModalNodeId)}
        />
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={state.nodes}
          edges={state.edges}
          onNodesChange={(changes) =>
            dispatch({ type: "node_change", changes })
          }
          onEdgesChange={(changes) =>
            dispatch({ type: "edge_change", changes })
          }
          onEdgesDelete={(edges) => dispatch({ type: "edge_delete", edges })}
          onNodesDelete={(nodes) =>
            dispatch({ type: "delete_question", nodes })
          }
          onConnect={(connection) => dispatch({ type: "connect", connection })}
          onConnectStart={(_, { nodeId, handleType }) => {
            connectingNode.current = { nodeId, handleType };
          }}
          onConnectEnd={(event) =>
            dispatch({
              type: "connect_stop",
              event,
              project,
              reactFlowWrapper,
              connectingNode,
            })
          }
          onNodeDoubleClick={(event, node) => {
            dispatch({
              type: "open_edit_modal",
              questionId: node.id,
            });
          }}
          fitView
        >
          <div style={{ position: "absolute", zIndex: 5, right: 0 }}>
            <Button
              backgroundColor="#AFB9A5"
              style={{ margin: "10px" }}
              size="lg"
              onClick={openInstructions}
            >
              Instructions
            </Button>
            <Button
              color="white"
              backgroundColor="#F6893C" // georgiacore orange
              style={{
                margin: "10px",
              }}
              size="lg"
              onClick={() => setQuestions(state.navigationTree.getQuestions())}
            >
              Save
            </Button>
          </div>
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </>
  );
};

const NavigatorEditorPage = () => {
  return (
    <ReactFlowProvider>
      <TreeEditor />
    </ReactFlowProvider>
  );
};

export default NavigatorEditorPage;
