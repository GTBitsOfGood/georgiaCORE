/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./InfoTemplate.module.css";
import PropTypes from "prop-types";

const InfoTemplate = (props) => {
  return (
    <div style={styles} id={styles.container}>
      <div id={styles.result}>
        <p id={styles.bodyText}>
          {props.question.bodyText ? props.question.bodyText : ""}
        </p>
      </div>
    </div>
  );
};

InfoTemplate.propTypes = {
  setUndoStack: PropTypes.any,
  question: PropTypes.any,
  setCurrentQuestionIndex: PropTypes.any,
  undoStack: PropTypes.any,
  progess: PropTypes.any,
};

export default InfoTemplate;
