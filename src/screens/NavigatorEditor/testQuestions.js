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
        icon: "QuestionMark",
        nextId: "2",
      },
      {
        id: "1-2",
        option: "No",
        icon: "QuestionMark",
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
        icon: "QuestionMark",
        nextId: "3",
      },
      {
        id: "2-2",
        option: "26-35",
        icon: "QuestionMark",
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
        icon: "QuestionMark",
        nextId: null,
      },
      {
        id: "3-2",
        option: "No",
        icon: "QuestionMark",
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

export const testTree = {
  active: true,
  title: "test title",
  thumbnailImage: null,
  questions: testQuestions,
  // Metadata
  editedOn: new Date(), // updated internally by mongodb/actions
  // (will be updated when tree goes active => inactive, so will be wrong for the active tree)
  lastActive: new Date(), // updated internally by mongodb/actions
  author: "yours truly", // updated internally by mongodb/actions
};

export default testQuestions;
