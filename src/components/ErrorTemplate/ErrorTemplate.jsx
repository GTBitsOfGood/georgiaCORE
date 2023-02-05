/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./ErrorTemplate.module.css";
import PropTypes from "prop-types";
import UndoRedo from "../ChatNavigator/UndoRedo";
import ProgressBar from "../ChatNavigator/ProgessBar";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const ErrorTemplate = (props) => {
  const goHome = () => {
    props.setCurrentQuestionIndex(1);
    props.setUndoStack((undoStack) => []);
  };

  return (
    <div style={styles} id={styles.container}>
      <div id={styles.utilsRow}>
        <div id={styles.progress}>
          <ProgressBar
            bgcolor={"#F6893C"}
            completed={props.progess * 100}
            width="100"
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
      </div>
      <div id={styles.flexRow}>
        <h2 id={styles.question}>Sorry...</h2>
      </div>
      <div id={styles.result}>
        <AiOutlineQuestionCircle id={styles.internet} font-size={70} />
        <h2 id={styles.text}>We don&apos;t think we can help you right now</h2>
        <div onClick={goHome} id={styles.url}>
          Back
        </div>
      </div>
    </div>
  );
};

ErrorTemplate.propTypes = {
  setUndoStack: PropTypes.any,
  question: PropTypes.any,
  setCurrentQuestionIndex: PropTypes.any,
  undoStack: PropTypes.any,
  progess: PropTypes.any,
};

export default ErrorTemplate;
