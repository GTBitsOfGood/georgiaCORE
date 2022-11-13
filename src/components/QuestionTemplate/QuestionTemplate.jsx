/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./QuestionTemplate.module.css";
import PropTypes from "prop-types";
import icons from "src/utils/icons";
import UndoRedo from "../ChatNavigator/UndoRedo";
import ProgressBar from "../ChatNavigator/ProgessBar";

const QuestionTemplate = (props) => {
  return (
    <div style={styles} id={styles.container}>
      <div id={styles.flexRow}>
        <div id={styles.progress}>
          <ProgressBar
            bgcolor={"#F6893C"}
            completed={props.progess * 100}
            width="150"
          />
        </div>
        <div id={styles.redo}>
          <UndoRedo
            question={props.question}
            setCurrentQuestionIndex={props.setCurrentQuestionIndex}
            undoStack={props.undoStack}
            setUndoStack={props.setUndoStack}
          />
        </div>
        <h2 id={styles.question}>{props.question}</h2>
      </div>
      <div id={styles.optionContainer}>
        {props.options.map((option, index) => {
          const Icon = icons[option.icon];
          return (
            <div
              itemID={index}
              key={index}
              id={styles.optionStack}
              onClick={option.triggerNext ? option.triggerNext : () => {}}
            >
              <div id={styles.greenCircle}>
                <Icon size={80} />
              </div>
              <h4 id={styles.optionAnswer}>{option.answer}</h4>
              <p id={styles.optionInfo}>
                professional medical resources that may help
              </p>
              <div />
            </div>
          );
        })}
      </div>
    </div>
  );
};

QuestionTemplate.propTypes = {
  question: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.any, // string but optional
      answer: PropTypes.string,
      next: PropTypes.number,
      triggerNext: PropTypes.func,
    })
  ),
};

export default QuestionTemplate;
