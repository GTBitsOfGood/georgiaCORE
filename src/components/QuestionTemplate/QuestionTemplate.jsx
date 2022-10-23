/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./QuestionTemplate.module.css";
import Image from "next/image";
import PropTypes from "prop-types";

const QuestionTemplate = (props) => {
  return (
    <div style={styles} id={styles.container}>
      <h2 id={styles.question}>{props.question}</h2>
      <div id={styles.optionContainer}>
        {props.options.map((option, index) => {
          return (
            <div
              key={index}
              className={styles.option}
              onClick={option.triggerNext ? option.triggerNext : () => {}}
            >
              {props.options.image ? (
                <Image
                  layout="fixed"
                  src={option.image}
                  width={100}
                  height={100}
                  alt={option.answer}
                />
              ) : (
                <></>
              )}

              <h4>{option.answer}</h4>
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
