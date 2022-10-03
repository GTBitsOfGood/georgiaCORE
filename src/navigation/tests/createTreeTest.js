import NavigationTree from "../NavigationTree.js";

const input = [
  {
    id: "1",
    question: "Do you want to continue?",
    type: "question",
    options: [
      {
        id: "1-1",
        option: "Yes",
        nextId: "2",
        url: null,
      },
      {
        id: "1-2",
        option: "No",
        nextId: "3",
        url: null,
      },
    ],
  },
  {
    id: "2",
    question: "What is your age?",
    type: "question",
    options: [
      {
        id: "2-1",
        option: "18-25",
        nextId: "3",
        url: null,
      },
      {
        id: "2-2",
        option: "26-35",
        nextId: "3",
        url: null,
      },
    ],
  },
  {
    id: "3",
    question: "Are you done?",
    type: "question",
    options: [
      {
        id: "3-1",
        option: "Yes",
        nextId: null,
        url: "https://www.google.com",
      },
      {
        id: "3-2",
        option: "No",
        nextId: null,
        url: null,
      },
      {
        id: "3-3",

        option: "Maybe",
        nextId: null,
        url: null,
      },
      {
        id: "3-4",

        option: "Maybe",
        nextId: null,
        url: null,
      },
      {
        id: "3-5",

        option: "Maybe",
        nextId: null,
        url: null,
      },
      {
        id: "3-6",

        option: "Maybe",
        nextId: null,
        url: null,
      },
    ],
  },
];

const tree = new NavigationTree(input);
tree.printTree();
