import mongoose from "mongoose";

export default class NavigationTree {
  constructor(questions) {
    this.questions = questions;
    /*
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

  getQuestions() {
    return this.questions;
  }

  setQuestions(questions) {
    this.questions = questions;
  }

  getQuestion(id) {
    return this.questions.find((q) => q.id === id);
  };

  addQuestion(question) {
    this.questions.push(question);
  }

  updateQuestion(question) {
    const index = this.getQuestion(question.id);
    this.questions[index] = question;
  };

  deleteQuestion(id) {
    const index = this.getQuestion(id);
    questions.splice(index, 1);
  };

  createQuestion(questionContent, type, options) {
    const id = new mongoose.mongo.ObjectId();

    const question = {
      id,
      question: questionContent,
      type,
      options: options.map(o => {
        return {
          id: mongoose.mongo.ObjectId(),
          option: o.option,
          nextId: o.nextId, 
        };
      }),
    };

    return question;
  }

  createUntitledQuestion() {
    return this.createQuestion("Untitled Question", "question", [
      { option: "Option 1", nextId: null }
    ]);
  };

  printTree() {
    console.log(JSON.stringify(this.questions));
  }
}
