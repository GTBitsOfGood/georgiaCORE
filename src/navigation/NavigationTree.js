import { v4 as uuidv4 } from "uuid";

export default class NavigationTree {
  constructor(tree) {
    this.tree = tree;
    /*
    active: Boolean,
    title: String,
    thumbnailImage: Buffer,
    reactFlowState: Object,
    questions: [{
      id: String,
      question: String,
      type: { type: String, enum: QUESTION_TYPES },
      options: [
        {
          id: String,
          option: String,
          nextId: String,
          url: String,
        }
      ],
    }],
    // Metadata
    editedOn: Date, // updated internally by mongodb/actions
    // (will be updated when tree goes active => inactive, so will be wrong for the active tree)
    lastActive: Date, // updated internally by mongodb/actions
    author: String, // updated internally by mongodb/actions

      Array<
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
      >
    */
  }

  // Getters/Setters

  getTree() {
    return this.tree;
  }

  setTree(tree) {
    this.tree = tree;
  }

  getQuestions() {
    return this.tree.questions;
  }

  setQuestions(questions) {
    this.tree.questions = questions;
  }

  getQuestion(id) {
    return this.tree.questions.find((q) => q.id === id);
  }

  getQuestionByOptionId(optionId) {
    return this.tree.questions.find((q) => {
      return q.options.some((option) => option.id == optionId);
    });
  }

  getQuestionIndex(id) {
    return this.tree.questions.findIndex((q) => q.id == id);
  }

  addQuestion(question) {
    this.tree.questions.push(question);
  }

  updateQuestion(question) {
    const index = this.getQuestionIndex(question.id);
    this.tree.questions[index] = question;
  }

  deleteQuestion(id) {
    const index = this.getQuestionIndex(id);
    this.tree.questions.splice(index, 1);
  }

  static createQuestion(questionContent, type, options, initial = false) {
    let id = uuidv4();

    if (initial) {
      id = "1";
    }

    const question = {
      isRoot: false,
      id,
      question: questionContent,
      type,
      openNewTab: true,
      options: options.map((o) => {
        return {
          id: uuidv4(),
          option: o.option,
          icon: o.icon,
          nextId: o.nextId,
        };
      }),
    };

    return question;
  }

  static copyQuestionSameEverything(question) {
    const newQuestion = {
      ...question,
    };

    delete newQuestion._id;

    newQuestion.options = question.options.map((o) => {
      const newO = { ...o };
      delete newO._id;
      return newO;
    });
    return newQuestion;
  }

  static copyQuestionNotRootNewUids(question) {
    const id = uuidv4();

    const newQuestion = {
      ...question,
      isRoot: false,
      id,
    };

    delete newQuestion._id;

    newQuestion.options = question.options.map((o) => {
      const newO = { ...o, id: uuidv4() };
      delete newO._id;
      return newO;
    });
    return newQuestion;
  }

  static createUntitledQuestion() {
    return this.createQuestion("Untitled Question (max length: 55 chars)", "question", [
      {
        option: "Option 1 (max: 25)",
        icon: "QuestionMark",
        nextId: null,
      },
    ]);
  }

  updateReactFlowState(reactFlowState) {
    this.tree.reactFlowState = reactFlowState;
  }

  getReactFlowState() {
    return this.tree.reactFlowState;
  }

  static createInitialQuestion() {
    const question = this.createQuestion(
      "Do you want to continue?",
      "question",
      [
        {
          option: "Yes",
          nextId: null,
        },
        {
          option: "No",
          nextId: null,
        },
      ],
      true
    );
    question.isRoot = true;
    return question;
  }

  printTree() {
    console.log(JSON.stringify(this.tree.questions));
  }
}
