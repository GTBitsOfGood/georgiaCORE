/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./LeafTemplate.module.css";
import PropTypes from "prop-types";
import UndoRedo from "../ChatNavigator/UndoRedo";
import ProgressBar from "../ChatNavigator/ProgessBar";
import { AiOutlineGlobal } from "react-icons/ai";
import { getStackStyles } from "@chakra-ui/react";
import { BiLinkExternal } from "react-icons/bi";

const LeafTemplate = (props) => {
  return (
    <div style={styles} id={styles.container}>
      <div id={styles.flexRow}>
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
        <h2 id={styles.question}>Result</h2>
      </div>
      <div id={styles.result}>
        <AiOutlineGlobal id={styles.internet} font-size={70} />
        <h2 id={styles.text}>Others found this page useful:</h2>
        <a
          target={props.question.openNewTab ? "_blank" : "_self"}
          href={props.question.url}
          id={styles.url}
          rel="noreferrer"
        >
          {props.question.linkName ? props.question.linkName : "Resource"}
          {props.question.openNewTab && <BiLinkExternal font-size={25} />}
        </a>
        {props.question.openNewTab && (
          <p id={styles.warning}>(Resource opens in new tab)</p>
        )}
      </div>
    </div>
  );
};

LeafTemplate.propTypes = {
  setUndoStack: PropTypes.any,
  question: PropTypes.any,
  setCurrentQuestionIndex: PropTypes.any,
  undoStack: PropTypes.any,
  progess: PropTypes.any,
};

export default LeafTemplate;
