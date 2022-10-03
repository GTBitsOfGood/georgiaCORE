import React, { useRef, useReducer } from "react";
import ReactFlow, {
  useReactFlow,
  addEdge,
  ReactFlowProvider,
  applyNodeChanges,
  applyEdgeChanges,
} from "react-flow-renderer";

import EditQuestionModal from "../../components/NavigationEditor/EditQuestionModal";
import {
  createUntitledQuestion,
  getQuestion,
  getQuestions,
  updateQuestion,
} from "./questions";
import { createNode, generateInitialNodes } from "./reactflow";
import { Button, useDisclosure } from "@chakra-ui/react";
import InstructionsModal from "src/components/NavigationEditor/InstructionsModal";

// Delete all nodes and edges that are connected to the given node
const deleteNodesAndEdges = (nodes, edges, questionId) => {
  const newNodes = nodes.filter(
    (node) => node.id !== questionId && node.parentNode !== questionId
  );

  const optionIds = getQuestion(questionId).options.map((o) => o.id);

  const newEdges = edges.filter(
    (edge) =>
      edge.source !== questionId &&
      edge.target !== questionId &&
      !optionIds.includes(edge.source)
  );

  return [newNodes, newEdges];
};

const reducer = (state, action) => {
  switch (action.type) {
    case "open_edit_modal":
      return {
        ...state,
        editModalOpen: true,
        editModalNodeId: action.questionId,
      };
    case "update_question": {
      updateQuestion(action.question);
      // get the current question x and y
      const node = state.nodes.find((n) => n.id === action.question.id);
      const connectingNodeId = state.edges.find(
        (e) => e.target === node.id
      ).source;

      // delete and recreate the corresponding nodes and edges
      const [deletedNodes, deletedEdges] = deleteNodesAndEdges(
        state.nodes,
        state.edges,
        action.question.id
      );

      const [newNodes, newEdges] = createNode({
        question: action.question,
        x: node.position.x,
        y: node.position.y,
        connectingNodeId,
      });

      return {
        ...state,
        nodes: [...deletedNodes, ...newNodes],
        edges: [...deletedEdges, ...newEdges],
      };
    }
    case "delete_question": {
      const [deletedNodes, deletedEdges] = deleteNodesAndEdges(
        state.nodes,
        state.edges,
        action.questionId
      );

      return {
        ...state,
        nodes: deletedNodes,
        edges: deletedEdges,
      };
    }
    case "edge_delete":
      action.edges.forEach((edge) => {
        const optionId = edge.source;
        const questionId = state.nodes.find(
          (node) => node.id == optionId
        ).parentNode;

        const question = getQuestion(questionId);

        const option = question.options.find((o) => o.id === optionId);
        const newQuestion = {
          ...question,
          options: [
            ...question.options,
            {
              ...option,
              nextId: null,
            },
          ],
        };
        updateQuestion(newQuestion);
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

      const question = getQuestion(questionId);
      const option = question.options.find((o) => o.id === source);

      const newQuestion = {
        ...question,
        options: [
          ...question.options,
          {
            ...option,
            nextId: target,
          },
        ],
      };
      updateQuestion(newQuestion);
      return { ...state, edges: addEdge(action.connection, state.edges) };
    }
    case "connect_stop": {
      const event = action.event;
      const targetIsPane = event.target.classList.contains("react-flow__pane");

      // User ended a connection not to a node
      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const { top, left } =
          action.reactFlowWrapper.current.getBoundingClientRect();
        const { x, y } = action.project({
          x: event.clientX - left,
          y: event.clientY - top,
        });

        const question = createUntitledQuestion();
        const [newNodes, newEdges] = createNode({
          question,
          x,
          y,
          connectingNodeId: action.connectingNodeId.current,
        });
        return {
          ...state,
          nodes: state.nodes.concat(newNodes),
          edges: state.edges.concat(newEdges),
        };
      }
      return state;
    }
    default:
      throw Error("Unknown action: " + action.type);
  }
};

const TreeEditor = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);

  const { project } = useReactFlow();
  const [state, dispatch] = useReducer(reducer, {}, () => {
    const [nodes, edges] = generateInitialNodes(getQuestions());

    return { nodes, edges, editModalOpen: false };
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button style={{ margin: "10px" }} onClick={onOpen}>
        Instructions
      </Button>
      <InstructionsModal isOpen={isOpen} onClose={onClose} />
      <div
        className="wrapper"
        ref={reactFlowWrapper}
        style={{ height: "100%", width: "100%" }}
      >
        <EditQuestionModal
          isOpen={state.editModalOpen}
          dispatch={dispatch}
          question={getQuestion(state.editModalNodeId)}
        />
        <ReactFlow
          nodes={state.nodes}
          edges={state.edges}
          onNodesChange={(changes) =>
            dispatch({ type: "node_change", changes })
          }
          onEdgesChange={(changes) =>
            dispatch({ type: "edge_change", changes })
          }
          onEdgesDelete={(edges) => dispatch({ type: "edge_delete", edges })}
          onConnect={(connection) => dispatch({ type: "connect", connection })}
          onConnectStart={(_, { nodeId }) => {
            connectingNodeId.current = nodeId;
          }}
          onConnectStop={(event) =>
            dispatch({
              type: "connect_stop",
              event,
              project,
              reactFlowWrapper,
              connectingNodeId,
            })
          }
          onNodeDoubleClick={(event, node) => {
            dispatch({
              type: "open_edit_modal",
              questionId: node.id,
            });
          }}
          fitView
        />
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
