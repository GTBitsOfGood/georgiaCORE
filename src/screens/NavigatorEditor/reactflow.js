const OPTION_HEIGHT = 50;

export const createNode = ({ question, x, y, connectingNodeId = null }) => {
  let nodes = [];
  let edges = [];

  if (question.type == "url") {
    nodes.push({
      id: question.id,
      targetPosition: "left",
      data: {
        label: question.url,
      },
      style: {
        background: "#fff",
        width: 160,
        height: 50,
      },
      position: { x, y },
      type: "output",
    });
  } else if (question.type == "error") {
    nodes.push({
      id: question.id,
      targetPosition: "left",
      data: {
        label: "Error Node",
      },
      style: {
        background: "red",
        width: 160,
        height: 50,
      },
      position: { x, y },
      type: "output",
    });
  } else if (question.type == "text") {
    nodes.push({
      id: question.id,
      targetPosition: "left",
      data: {
        heading: question.heading,
        bodyText: question.bodyText,
      },
      style: {
        background: "#90EE90",
        width: 160,
        height: 50,
      },
      position: { x, y },
      type: "text",
    });
  } else if (question.type === "question") {
    // Create node for question
    nodes.push({
      // Separated this in case the ids are reused between question and option
      // Depending on how the backend is implemented this separation might not be needed
      id: question.id,

      targetPosition: "left",
      dataType: "question",
      data: { label: question.question },
      style: {
        backgroundColor: question.isRoot
          ? "LightSalmon"
          : "rgba(255, 0, 0, 0.2)",
        width: 160,
        height: question.options.length * OPTION_HEIGHT + 50,
      },
      position: { x, y },
      type: question.isRoot ? "root" : "output",
    });

    for (const [i, option] of question.options.entries()) {
      // Create nodes for options
      nodes.push({
        id: option.id,

        sourcePosition: "right",
        dataType: "option",
        type: "input",
        data: { label: option.option },
        parentNode: question.id,
        draggable: false,
        selectable: false,
        position: { x: 5, y: 50 + i * OPTION_HEIGHT },
      });

      // Edges between option and next question
      if (option.nextId) {
        edges.push({
          id: option.id + "-" + option.nextId,
          source: option.id,
          target: option.nextId,
        });
      }
    }
  }

  // Edge between question and connecting node
  if (connectingNodeId) {
    edges.push({
      id: connectingNodeId + "-" + question.id,
      source: connectingNodeId,
      target: question.id,
    });
  }

  return [nodes, edges];
};

export const generateInitialNodes = (questions) => {
  // BFS through questions
  // Create nodes for each question
  // Create nodes for each option
  // Create edges between option and next question
  let nodes = [];
  let edges = [];

  if (!questions || questions.length === 0) {
    return [[], []];
  }

  let visited = new Set();
  let queue = [];

  const root = questions.find((question) => question.isRoot);
  if (!root) {
    throw new Error("No root question");
  }

  queue.push([root.id, 0]);
  visited.add(root.id);

  let optionY = 0;
  let currentLevel = 0;

  while (queue.length > 0) {
    const [sourceId, level] = queue.shift();
    if (level !== currentLevel) {
      currentLevel = level;
      optionY = 0;
    }
    const question = questions.find((q) => q.id === sourceId);
    if (question.type === "question") {
      for (const option of question.options) {
        if (option.nextId && !visited.has(option.nextId)) {
          queue.push([option.nextId, level + 1]);
          visited.add(option.nextId);
        }
      }
    }

    let [newNodes, newEdges] = createNode({
      question,
      x: 250 * level,
      y: optionY,
    });

    nodes = nodes.concat(newNodes);
    edges = edges.concat(newEdges);

    if (question.type === "question")
      optionY += question.options.length * OPTION_HEIGHT + 70;
    else optionY += 50;
  }

  return [nodes, edges];
};
