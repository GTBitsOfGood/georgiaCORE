/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styles from "./ChatNavigator.module.css";
import { getActiveQuestionTree, getQuestionTreeById } from "../../actions/Tree";
import Image from "next/image";
import PropTypes from "prop-types";
import QuestionTemplate from "../QuestionTemplate/QuestionTemplate";
import { useRouter } from "next/router";
import ErrorPage from "../ErrorPage";

const ChatNavigator = (props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [allQuestions, setAllQuestions] = useState({});
  const [invalidID, setInvalidId] = useState(false);

  const router = useRouter()
  const { query } = router;

  useEffect(() => {
    const setup = async () => {
      try {
        const questionsTree = await getQuestionTreeById(query.id);
        const questions = questionsTree.questions;
        const questionMap = {};
        for (const question of questions) {
          const id = parseInt(question.id);
          questionMap[id] = question;
        }
        setAllQuestions(questionMap);
        setInvalidId(false);
      } catch {
        setInvalidId(true);
        console.log("Unable to get questions at this time.");
      }
    };
    setup();
  }, [router.isReady]);

  const numQs = Object.keys(allQuestions).length;

  if (invalidID) {
    return (
      <>
        <ErrorPage message="This tree does not exist." />
      </>
    );
  }

  if (numQs > 0) {
    const currentQuestion = allQuestions[currentQuestionIndex];
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
