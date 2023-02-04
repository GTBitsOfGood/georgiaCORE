import React from "react";
import ProgressBar from "./ProgessBar";
import UndoRedo from "./UndoRedo";
import styles from "./NavigatorHeader.module.css";

const NavigatorHeader = (props) => {
  let title;
  switch (props.question.type) {
    case "question":
      title = props.question.question;
      break;
    case "url":
      title = "Result";
      break;
    case "error":
      title = "Sorry...";
      break;
    case "text":
      title = props.question.heading ? props.question.heading : "Information";
      break;
  }

  return (
    <div id={styles.flexRow}>
      <div id={styles.progress}>
        <ProgressBar
          bgcolor={"#F6893C"}
          completed={props.progress * 100}
          width="100"
        />
      </div>
      <div id={styles.redo}>
        <UndoRedo
          question={props.question.question}
          setCurrentQuestionIndex={props.setCurrentQuestionIndex}
          undoStack={props.undoStack}
          setUndoStack={props.setUndoStack}
        />
      </div>
      <h2 id={styles.question}>{title}</h2>
    </div>
  );
};

export default NavigatorHeader;
