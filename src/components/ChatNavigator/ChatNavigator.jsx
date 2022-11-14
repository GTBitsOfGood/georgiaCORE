import React, { useEffect, useState } from "react";
import styles from "./ChatNavigator.module.css";
import { getActiveQuestionTree, getQuestionTreeById } from "../../actions/Tree";
import Image from "next/image";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import ErrorPage from "../ErrorPage";
import { useSession } from "next-auth/react";

/* IMPORT TEMPLATES */
import QuestionTemplate from "../QuestionTemplate/QuestionTemplate";
import LeafTemplate from "../LeafTemplate/LeafTemplate";
import InfoTemplate from "../InfoTemplate/InfoTemplate";
import ErrorTemplate from "../ErrorTemplate/ErrorTemplate";

const ChatNavigator = (props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState("1");
  const [allQuestions, setAllQuestions] = useState({});
  const [invalidID, setInvalidId] = useState(false);
  const { data: session, status } = useSession();
  const [undoStack, setUndoStack] = useState([]);
  const [progessMap, setProgressMap] = useState({});

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    const setup = async () => {
      let tempProgressMap = {};

      const buildProgressMap = (questionMap, curr = "1", count = 0) => {  
        if (!curr) { return 0; }
        let depth = 0;

        for (const index in questionMap[curr].options) {
          const nextId = questionMap[curr].options[index].nextId;
          depth = Math.max(depth, buildProgressMap(questionMap, nextId, count + 1));
        }

        tempProgressMap[curr] = depth;        
        return depth + 1;
      };

  
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
        setAllQuestions(questionMap);
        setInvalidId(false);
        buildProgressMap(questionMap);

        let mDepth = tempProgressMap['1'];
        for (let key in tempProgressMap) {
          tempProgressMap[key] = (mDepth - tempProgressMap[key]) / mDepth;
        }
        setProgressMap(tempProgressMap);

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

    return (
      <div style={styles} id={styles.main}>

        {/* QUESTION TEMPLATE */}
        {currentQuestion.type == "question" && 
          <QuestionTemplate
            question={currentQuestion.question}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            progess={progessMap[currentQuestion.id]}
            undoStack={undoStack}
            setUndoStack={setUndoStack}
            options={currentQuestion.options.map((option) => {
              return {
                answer: option.option,
                icon: option.icon,
                supportingText: option.supportingText,
                triggerNext: () => {
                  if (option.nextId) {
                    setCurrentQuestionIndex(option.nextId);
                    setUndoStack(undoStack => [...undoStack, currentQuestion.id]);
                  }
                },
              };
            })}
          />
        }

        {/* URL TEMPLATE */}
        {currentQuestion.type == "url" && 
          <LeafTemplate
            question={currentQuestion}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            progess={progessMap[currentQuestion.id]}
            undoStack={undoStack}
            setUndoStack={setUndoStack}
          />
        }

        {currentQuestion.type == "text" && 
            <InfoTemplate
              question={currentQuestion}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              progess={progessMap[currentQuestion.id]}
              undoStack={undoStack}
              setUndoStack={setUndoStack}
            />
        }

        {currentQuestion.type == "error" &&
          <ErrorTemplate
            question={currentQuestion}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            progess={progessMap[currentQuestion.id]}
            undoStack={undoStack}
            setUndoStack={setUndoStack}
          />
        }



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

