import NavigationTree from "../NavigationTree.js";

const tree = new NavigationTree();

const input = {
    terminal: false,
    question: 'Do you like pizza?',
    children: [
        {answer: 'Yeah ofc', nextInput: {terminal: false, question: 'Whats your favorite color?', children: [
            {answer: 'Blue', nextInput: {terminal: true, url: 'www.blue.com'}},
            {answer: 'Red', nextInput: {terminal: true, url: 'www.red.com'}},
        ]}},
        {answer: 'No', nextInput: {terminal: true, url: 'www.google.com'}},
    ],
};

tree.setTree(input);
tree.printTree();
