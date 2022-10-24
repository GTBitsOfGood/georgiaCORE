const testQuestions = [
  {
    id: "1",
    isRoot: true,
    question: "Do you want to continue?",
    type: "question",
    options: [
      {
        id: "1-1",
        option: "Yes",
        nextId: "2",
      },
      {
        id: "1-2",
        option: "No",
        nextId: "3",
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
      },
      {
        id: "2-2",
        option: "26-35",
        nextId: "3",
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
      },
      {
        id: "3-2",
        option: "No",
        nextId: "4",
      },
    ],
  },
  {
    id: "4",
    heading: "Heading",
    bodyText: "Body text",
    type: "text",
    options: [],
  },
];

export default testQuestions;
