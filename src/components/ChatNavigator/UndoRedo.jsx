import React, { useEffect, useState } from "react";
import styles from "./UndoRedo.module.css";
import { getActiveQuestionTree, getQuestionTreeById } from "../../actions/Tree";
import Image from "next/image";
import PropTypes from "prop-types";
import QuestionTemplate from "../QuestionTemplate/QuestionTemplate";
import { useRouter } from "next/router";
import ErrorPage from "../ErrorPage";
import { useSession } from "next-auth/react";
import { IoChevronBackOutline } from "react-icons/io5";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { RiArrowGoBackLine } from "react-icons/ri";

const UndoRedo = (props) => {
  const handler = props.setCurrentQuestionIndex;
  const undoStack = props.undoStack;
  const setUndoStack = props.setUndoStack; // can destructure for future reference

  const goHome = () => {
    handler(1);
    setUndoStack((undoStack) => []);
  };

  const goBack = () => {
    if (undoStack.length == 0) {
      return;
    }
    handler(undoStack[undoStack.length - 1]);
    setUndoStack((undoStack) => undoStack.slice(0, -1)); // pop
  };

  const getRestartColor = () => {
    if (undoStack.length == 0) return "#A0A0A0";
    return "black";
  };

  return (
    <div id={styles.container}>
      <div id={styles.box} onClick={goHome}>
        <RiArrowGoBackLine size={15} color="white" />
      </div>
      {undoStack.length != 0 && (
        <div id={styles.box} onClick={goBack}>
          <BsChevronLeft size={15} color="white" />
        </div>
      )}
      {undoStack.length == 0 && (
        <div id={styles.disabled}>
          <BsChevronLeft size={15} color="white" />
        </div>
      )}
    </div>
  );
};

UndoRedo.propTypes = {
  undoStack: PropTypes.any,
  setUndoStack: PropTypes.any,
  setCurrentQuestionIndex: PropTypes.any,
};

export default UndoRedo;
