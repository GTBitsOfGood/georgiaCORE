/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./QuestionTemplate.module.css";
import Image from "next/image";
import PropTypes from "prop-types";
import { PhoneIcon } from "@chakra-ui/icons";

const QuestionTemplate = (props) => {
  return (
    <div style={styles} id={styles.container} >
      <h2 id={styles.question}>{props.question}</h2>
      <div id={styles.optionContainer}>
        {props.options.map((option, index) => {
          return (
            <div
              key={index}
              id={styles.optionStack}
              onClick={option.triggerNext ? option.triggerNext : () => {}}
            >
              {props.options.image ? (
                <div id={styles.greenCircle}>
                  <PhoneIcon></PhoneIcon>
                </div>
              ) : (
                <div id={styles.greenCircle}>
                   <PhoneIcon height={50} width={50}></PhoneIcon>
                </div>
              )}
              <h4 id={styles.optionAnswer}>{option.answer}</h4>
              <p id={styles.optionInfo}>professional medical resources that may help</p> 
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