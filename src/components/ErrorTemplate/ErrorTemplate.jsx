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
