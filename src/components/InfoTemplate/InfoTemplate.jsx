/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./InfoTemplate.module.css";
import PropTypes from "prop-types";
import UndoRedo from "../ChatNavigator/UndoRedo";
import ProgressBar from "../ChatNavigator/ProgessBar";
import { AiOutlineGlobal } from "react-icons/ai";
import { getStackStyles } from "@chakra-ui/react";
import { BiLinkExternal } from "react-icons/bi";

const InfoTemplate = (props) => {
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
        <h2 id={styles.question}>
          {props.question.heading ? props.question.heading : "Information"}
        </h2>
      </div>
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
