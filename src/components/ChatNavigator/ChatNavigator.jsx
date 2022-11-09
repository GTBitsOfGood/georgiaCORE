import React, { useEffect, useState } from "react";
import styles from "./ChatNavigator.module.css";
import { getActiveQuestionTree, getQuestionTreeById } from "../../actions/Tree";
import Image from "next/image";
import PropTypes from "prop-types";
import QuestionTemplate from "../QuestionTemplate/QuestionTemplate";
import { useRouter } from "next/router";
import ErrorPage from "../ErrorPage";
import { useSession } from "next-auth/react";

const ChatNavigator = (props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [allQuestions, setAllQuestions] = useState({});
  const [invalidID, setInvalidId] = useState(false);
  const { data: session, status } = useSession();

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    const setup = async () => {
      try {
        const questionsTree =
          props.isActive === true
            ? await getActiveQuestionTree()
            : await getQuestionTreeById(query.id);
        const questions = questionsTree.questions;
        const questionMap = {};
        for (const question of questions) {
          questionMap[question.id] = question;
        }
        console.log(questionMap);
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

  if (status === "loading") {
    return <></>;
  }

  if (status == "unauthenticated" && props.isActive !== true) {
    return (
      <>
        <ErrorPage message="User is not logged in." />
      </>
    );
  }

  if (invalidID) {
    return (
      <>
        <ErrorPage message="This tree does not exist." />
      </>
    );
  }

  if (numQs > 0) {
    const currentQuestion = allQuestions[currentQuestionIndex];
    console.log(currentQuestion.question)

    return (
      <div style={styles} id={styles.main}>
        <QuestionTemplate
          question={currentQuestion.question}
          options={currentQuestion.options.map((option) => {
            return {
              answer: option.option,
              triggerNext: () => {
                if (option.nextId) {
                  setCurrentQuestionIndex(option.nextId);
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

