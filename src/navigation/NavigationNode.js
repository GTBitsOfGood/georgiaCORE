export default class NavigationNode {

    constructor(question) {
      this.question = question; // string
      // TOOD: make this.children an array instead of map, we ideally want to be able to have a defined ordering of answers since we display them in order
      this.children = new Map(); // Map<answer: string, next: Node>
    }
  
    // Getters/Setters
  
    /**
     * @returns {void}
     */
    getQuestion() {
      return this.question;
    }
  
    /**
     * @param {string} question
     * @returns {void}
     */
    setQuestion(question) {
      this.question = question;
    }
  
    /**
     * @returns {Array<string>}
     */
    getAnswers() {
      return [...this.children.keys()];
    }

    getChildNode(answer) {
      return this.children.get(answer);
    }
  
    /**
     * also acts as a replaceAnswer method
     * @param {string} answer
     * @returns {void}
     */
    addAnswer(answer) {
      this.addAnswer(answer, null);
    }
  
    /**
     * also acts as a replaceAnswer method
     * @param {string} answer
     * @param {NavigationNode} node
     * @returns {void}
     */
    addAnswer(answer, node) {
      this.children.set(answer, node);
    }
  
    /**
     * @param {string} answer
     * @returns {boolean} whether the answer existed
     */
    removeAnswer(answer) {
      return this.children.delete(answer);
    }

    /**
     * @param {string} answer
     * @returns {NavigationNode} the unlinked node
     */
    unlinkChildQuestion(answer) {
        const unlinkedNode = this.getChildNode(answer);
        this.children.set(answer, null);
        return unlinkedNode;
    }
  
    /**
     * @param {string} answer
     * @returns {boolean}
     */
    hasAnswer(answer) {
      return this.children.has(answer);
    }
  
  
  
  }
  