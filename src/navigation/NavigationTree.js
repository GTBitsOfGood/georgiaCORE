import NavigationNode from "./NavigationNode.js";
import NavigationTerminalNode from "./NavigationTerminalNode.js";

// TODO:
// allow adding/removing/moving answers at specific indices

export default class NavigationTree {
  constructor() {
    this.root = null; // Node
    this.questions = new Map(); // Map<question: string, next: Node>
  }

  // Getters/Setters

  getRoot() {
    return this.root;
  }

  getQuestions() {
    return this.questions;
  }

  /**
   * @param {string} question
   * @returns {NavigationNode}
   */
  getNode(question) {
    return this.questions.get(question);
  }

  /**
   * @param {string} question
   * @returns {Array<string>}
   */
  getAnswers(question) {
    return this.getNode(question).getAnswers();
  }

  addQuestion(parentQuestion, parentAnswer, question) {
    return this.addQuestion(parentQuestion, parentAnswer, question, null);
  }

  /**
   * @param {string} parentQuestion
   * @param {string} parentAnswer
   * @param {string} question
   * @param {Array<string>} answers
   * @returns {void}
   */
  addQuestion(parentQuestion, parentAnswer, question, answers) {
    const node = this.getNode(parentQuestion);

    const newNode = new NavigationNode(question);
    if (answers != null) {
      answers.forEach((answer) => newNode.addAnswer(answer));
    }

    node.addAnswer(parentAnswer, newNode);
    this.questions.set(question, newNode);
  }

  /**
   * @param {string} parentQuestion
   * @param {string} parentAnswer
   * @param {string} question
   * @returns {NavigationNode} the removed node
   */
  removeQuestion(parentQuestion, parentAnswer, question) {
    const node = this.getNode(parentQuestion);

    const removedNode = node.unlinkChildQuestion(parentAnswer);
    this.questions.delete(question);
    return removedNode;
  }

  /**
   * @param {{<question: string, children: Array<{answer: string, nextInput: input}>}} input
   * @returns {void}
   */
  setTree(input) {
    if (input == null) {
      this.root = null;
      this.questions = new Map();
    }

    const questionMap = new Map();
    this.root = this.createTree(input, questionMap);
    this.questions = questionMap;
  }

  /**
   * Updates questionMap to contain mapping to each node
   * @param {{<question: string, children: Array<{answer: string, nextInput: curInput}>}} curInput
   * @param {Map<question: string, next: NavigationNode>} questionMap
   * @returns {NavigationNode} the created tree
   */
  createTree(curInput, questionMap) {
    const { terminal, question, children, url } = curInput;
    var newNode;
    if (terminal) {
      newNode = new NavigationTerminalNode(url);
    } else {
      newNode = new NavigationNode(question);
      questionMap.set(question, newNode);

      children.forEach(({ answer, nextInput }) => {
        newNode.addAnswer(answer, this.createTree(nextInput, questionMap));
      });
    }

    return newNode;
  }

  printTree() {
    console.log(JSON.stringify(this.objectRepresentation(this.root), null, 4));
  }

  /**
   * @param {NavigationNode} curNode
   * @returns {{}}} pretty object representation of tree
   */
  objectRepresentation(curNode) {
    if (curNode == null) {
      return null;
    }

    var ret;
    if (curNode instanceof NavigationTerminalNode) {
      ret = curNode.getUrl();
    } else {
      const question = curNode.getQuestion();
      ret = { [question]: {} };

      curNode.children.forEach((nextNode, answer) => {
        ret[question][answer] = this.objectRepresentation(nextNode);
      });
    }

    return ret;
  }
}
