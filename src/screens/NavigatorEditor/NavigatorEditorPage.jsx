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

import { Button, useDisclosure, Box, HStack, Text } from "@chakra-ui/react";

import EditQuestionModal from "./EditQuestionModal";
import ErrorPage from "src/components/ErrorPage";
import { createNode, generateInitialNodes } from "./reactflow";
import { getAuthUsers } from "src/actions/AuthUser";
import {
  getActiveQuestionTree,
  getQuestionTreeById,
  updateQuestionTree,
} from "src/actions/Tree";
import NavigationTree from "src/navigation/NavigationTree";
import testQuestions from "./testQuestions";
import InstructionsModal from "./InstructionsModal";
import RootNode from "src/components/Nodes/RootNode";
import OptionNode from "src/components/Nodes/OptionNode";
import QuestionNode from "src/components/Nodes/QuestionNode";
import ErrorNode from "src/components/Nodes/ErrorNode";
import TextNode from "src/components/Nodes/TextNode";
import { useRouter } from "next/router";
import URLNode from "src/components/Nodes/URLNode";
import { LockIcon, QuestionIcon, UnlockIcon } from "@chakra-ui/icons";
import { useForceUpdate } from "framer-motion";

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
    case "save":
      return {
        ...state,
        unsavedChanges: false,
      };
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
      if (!copiedNode) {
        return state;
      }

      const question = state.navigationTree.getQuestion(copiedNode.id);
      const copyOfQuestion =
        NavigationTree.copyQuestionNotRootNewUids(question);
      state.navigationTree.addQuestion(copyOfQuestion);

      const [newNodes, newEdges] = createNode({
        question: copyOfQuestion,
        x: copiedNode.position.x + 100,
        y: copiedNode.position.y + 100,
      });

      return {
        ...state,
        unsavedChanges: true,
        nodes: [...state.nodes, ...newNodes],
        edges: [...state.edges, ...newEdges],
      };
    }
    case "selection_change":
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
        unsavedChanges: true,
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
        unsavedChanges: true,
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

      return { ...state, unsavedChanges: true };
    case "close_edit_modal":
      return { ...state, editModalOpen: false };
    case "node_change":
      return {
        ...state,
        nodes: applyNodeChanges(action.changes, state.nodes),
        // unsavedChanges: true, // disabled so dragging doesn't cause unsaved changes popup
      };
    case "edge_change":
      return {
        ...state,
        edges: applyEdgeChanges(action.changes, state.edges),
        unsavedChanges: true,
      };
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
      return {
        ...state,
        edges: addEdge(action.connection, state.edges),
        unsavedChanges: true,
      };
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
        if (state.locked) return state;
        const question = NavigationTree.createUntitledQuestion();
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
          unsavedChanges: true,
        };
      }
      return state;
    }
    case "set_state": {
      const flow = state.navigationTree.getReactFlowState();
      if (flow) {
        return {
          ...state,
          nodes: flow.nodes || [],
          edges: flow.edges || [],
          editModalOpen: false,
        };
      }

      const [nodes, edges] = generateInitialNodes(
        state.navigationTree.getQuestions()
      );
      return { ...state, nodes, edges, editModalOpen: false };
    }
    case "set_react_flow_instance": {
      return { ...state, reactFlowInstance: action.reactFlowInstance };
    }
    case "format": {
      const [nodes, edges] = generateInitialNodes(
        state.navigationTree.getQuestions()
      );
      return { ...state, nodes, edges, unsavedChanges: true };
    }
    case "toggle_lock":
      return { ...state, locked: !state.locked };
    default:
      throw Error("Unknown action: " + action.type);
  }
};

const TreeEditor = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNode = useRef(null);
  const copiedNode = useRef(null);

  const router = useRouter();
  const { query } = router;
  const [invalidID, setInvalidId] = React.useState(false);
  const [treeID, setTreeID] = React.useState(undefined);

  const { data: session, status } = useSession();
  const [authUser, setAuthUser] = React.useState("");

  const { project } = useReactFlow();

  const [state, dispatch] = useReducer(reducer, {}, () => {
    const navigationTree = new NavigationTree({ questions: [] });
    const [nodes, edges] = generateInitialNodes(navigationTree.getQuestions());
    return {
      nodes,
      edges,
      navigationTree,
      editModalOpen: false,
      reactFlowInstance: null,
      locked: false,
      unsavedChanges: false,
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
      setTreeID(query.id);
      //let treeID = query.id;
      let tree;

      if (treeID) {
        setInvalidId(false);
        tree = await getQuestionTreeById(treeID);

        if (tree) {
          state.navigationTree.setTree(tree ?? { questions: [] });
          // force reducer to recognize changed navigationTree
          dispatch({ type: "set_state" });
        } else {
          setInvalidId(true);
        }
      } else {
        setInvalidId(true);
      }
    }
    initializeQuestions();
  }, [state.navigationTree, router.isReady, treeID, query.id]);

  useOnSelectionChange({
    onChange: ({ nodes }) => dispatch({ type: "selection_change", nodes }),
  });

  useEffect(() => {
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
    () => ({
      root: RootNode,
      text: TextNode,
      option: OptionNode,
      question: QuestionNode,
      error: ErrorNode,
      url: URLNode,
    }),
    []
  );

  const {
    isOpen: isInstructionsOpen,
    onOpen: openInstructions,
    onClose: onInstructionsClose,
  } = useDisclosure();

  // Open instructions modal on first visit of the page
  useEffect(() => {
    if (!localStorage.getItem("visited")) {
      localStorage.setItem("visited", "true");
      openInstructions();
    }
  }, [openInstructions]);

  // Set unsaved changes to false when page first loads
  useEffect(() => {
    state.undsavedChanges = false;
  }, []);

  // prompt the user if they try and leave with unsaved changes
  useEffect(() => {
    const warningText =
      "You have unsaved changes - are you sure you wish to leave this page?";
    const handleWindowClose = (e) => {
      if (!state.unsavedChanges) return;
      e.preventDefault();
      return (e.returnValue = warningText);
    };
    const handleBrowseAway = () => {
      if (!state.unsavedChanges) return;
      if (window.confirm(warningText)) return;
      router.events.emit("routeChangeError");
      throw "routeChange aborted.";
    };
    window.addEventListener("beforeunload", handleWindowClose);
    router.events.on("routeChangeStart", handleBrowseAway);
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      router.events.off("routeChangeStart", handleBrowseAway);
    };
  }, [state.unsavedChanges, router.events]);

  if (status === "loading") {
    return <></>;
  } else if (status == "authenticated" && authUser != "allowed") {
    return (
      <>
        <ErrorPage message="User Cannot Access this Page." />
      </>
    );
  }
  if (status == "unauthenticated") {
    return (
      <>
        <ErrorPage message="User is not logged in." />
      </>
    );
  }

  if (invalidID) {
    return (
      <>
        <ErrorPage message="This tree does not exist." />
      </>
    );
  }

  let lastUpdated = "Loading...";

  const updateLastUpdated = (d) => {
    lastUpdated =
      d.getFullYear() +
      "/" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "/" +
      ("0" + d.getDate()).slice(-2) +
      " " +
      ("0" + d.getHours()).slice(-2) +
      ":" +
      ("0" + d.getMinutes()).slice(-2) +
      ":" +
      ("0" + d.getSeconds()).slice(-2);
  };

  if (state.navigationTree.getTree().editedOn) {
    const d = new Date(state.navigationTree.getTree().editedOn);
    updateLastUpdated(d);
  }

  return (
    <>
      {state.navigationTree != null &&
      state.navigationTree.getQuestions() != null ? (
        <>
          <QuestionIcon
            onClick={openInstructions}
            position="absolute"
            bottom={10}
            right={10}
            color="#59784D"
            variant="ghost"
            w={10}
            h={10}
            zIndex={2}
            cursor="pointer"
          />
          <Text right="10%" top="170px" position="absolute" zIndex={999}>
            Last Saved: {lastUpdated}
          </Text>
          <Box
            left="10%"
            right="10%"
            top="100px"
            background="#D9D9D9"
            borderRadius={"10px"}
            zIndex={1}
            position="fixed"
          >
            <HStack>
              <Button
                size="md"
                style={{ margin: "10px", backgroundColor: "#59784D" }}
                onClick={() => dispatch({ type: "toggle_lock" })}
              >
                <UnlockIcon
                  color="white"
                  size="lg"
                  position="absolute"
                  visibility={state.locked ? "hidden" : "visible"}
                />
                <LockIcon
                  color="white"
                  size="lg"
                  position="absolute"
                  visibility={state.locked ? "visible" : "hidden"}
                />
              </Button>
              <Button
                backgroundColor="#AFB9A5"
                style={{ margin: "10px" }}
                size="lg"
                onClick={() => {
                  dispatch({ type: "format" });
                }}
              >
                Format
              </Button>
              <HStack style={{ marginLeft: "auto" }}>
                <Button
                  color="white"
                  backgroundColor="#F6893C" // georgiacore orange
                  style={{
                    margin: "10px",
                  }}
                  size="lg"
                  onClick={() => {
                    // Save the state of the ReactFlow nodes
                    if (state.reactFlowInstance) {
                      const reactFlowState = state.reactFlowInstance.toObject();
                      state.navigationTree.updateReactFlowState(reactFlowState);
                    }

                    dispatch({ type: "save" });
                    updateQuestionTree(
                      state.navigationTree.getTree(),
                      session.user?.name
                    );
                    state.navigationTree.getTree().editedOn = new Date();
                  }}
                >
                  Save
                </Button>
                <Button
                  backgroundColor="#AFB9A5"
                  style={{ margin: "10px" }}
                  size="lg"
                  onClick={() => window.open("/navigator?id=" + treeID)}
                >
                  Preview
                </Button>
              </HStack>
            </HStack>
          </Box>
          <InstructionsModal
            isOpen={isInstructionsOpen}
            onClose={onInstructionsClose}
          />
          <div
            className="wrapper"
            ref={reactFlowWrapper}
            style={{
              height: "90%",
              width: "100%",
              position: "fixed",
              zIndex: 0,
            }}
          >
            <EditQuestionModal
              isOpen={state.editModalOpen}
              dispatch={dispatch}
              question={state.navigationTree.getQuestion(state.editModalNodeId)}
            />
            <ReactFlow
              nodesDraggable={!state.locked}
              nodesConnectable={!state.locked}
              nodesFocusable={!state.locked}
              edgesFocusable={!state.locked}
              elementsSelectable={!state.locked}
              nodeTypes={nodeTypes}
              nodes={state.nodes}
              edges={state.edges}
              onInit={(reactFlowInstance) =>
                dispatch({ type: "set_react_flow_instance", reactFlowInstance })
              }
              onNodesChange={(changes) =>
                dispatch({ type: "node_change", changes })
              }
              onEdgesChange={(changes) =>
                dispatch({ type: "edge_change", changes })
              }
              onEdgesDelete={(edges) =>
                dispatch({ type: "edge_delete", edges })
              }
              onNodesDelete={(nodes) =>
                dispatch({ type: "delete_question", nodes })
              }
              onConnect={(connection) =>
                dispatch({ type: "connect", connection })
              }
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
              <Background />

              <Controls />
            </ReactFlow>
          </div>
        </>
      ) : (
        <p>No Active Tree</p>
      )}
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
