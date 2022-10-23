/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styles from "./ChatNavigator.module.css";
import { getAllQuestions } from "../../actions/Question";
import Image from "next/image";
import PropTypes from "prop-types";
import QuestionTemplate from "../QuestionTemplate/QuestionTemplate";

const ChatNavigator = (props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [allQuestions, setAllQuestions] = useState({});
  useEffect(() => {
    const setup = async () => {
      try {
        const questions = await getAllQuestions();
        const questionMap = {};
        for (const question of questions) {
          const id = parseInt(question.id);
          questionMap[id] = question;
        }
        setAllQuestions(questionMap);
        console.log(questionMap);
      } catch {
        console.log("Unable to get questions at this time.");
      }
    };
    setup();
  }, []);

  const numQs = Object.keys(allQuestions).length;

  if (numQs > 0) {
    const currentQuestion = allQuestions[currentQuestionIndex];
    console.log(currentQuestion);
    return (
      <div style={styles} id={styles.main}>
        <div
          id={styles.progressBar}
          style={{ width: ((currentQuestionIndex - 1) / numQs) * 100 + "%" }}
        ></div>
        <QuestionTemplate
          question={currentQuestion.question}
          options={currentQuestion.options.map((option) => {
            return {
              answer: option.option,
              triggerNext: () => {
                if (option.nextId) {
                  setCurrentQuestionIndex(parseInt(option.nextId));
                }
              },
            };
          })}
        ></QuestionTemplate>
      </div>
    );
  }

  return (
    <div style={styles} id={styles.main}>
      <div id={styles.progressBar}></div>
    </div>
  );
};

ChatNavigator.propTypes = {};

export default ChatNavigator;
