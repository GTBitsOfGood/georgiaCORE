import { v4 as uuidv4 } from "uuid";

export default class NavigationTree {
  constructor(tree) {
    this.tree = tree;
    /*
    active: Boolean,
    title: String,
    thumbnailImage: Buffer,
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

  static createQuestion(questionContent, type, options) {
    const id = uuidv4();

    const question = {
      isRoot: false,
      id,
      question: questionContent,
      type,
      options: options.map((o) => {
        return {
          id: uuidv4(),
          option: o.option,
          nextId: o.nextId,
        };
      }),
    };

    return question;
  }

  static copyQuestion(question) {
    const id = uuidv4();

    const newQuestion = {
      ...question,
      isRoot: false,
      id,
    };

    delete newQuestion._id;
    delete newQuestion.__v;

    newQuestion.options = newQuestion.options.map((o) => {
      return {
        ...o,
        id: uuidv4(),
      };
    });
    return newQuestion;
  }

  static createUntitledQuestion() {
    return this.createQuestion("Untitled Question", "question", [
      { option: "Option 1", nextId: null },
    ]);
  }

  static createInitialQuestion() {
    return this.createQuestion("Do you want to continue?", "question", [
      {
        option: "Yes",
        nextId: null,
      },
      {
        option: "No",
        nextId: null,
      },
    ]);
  }

  printTree() {
    console.log(JSON.stringify(this.tree.questions));
  }
}
