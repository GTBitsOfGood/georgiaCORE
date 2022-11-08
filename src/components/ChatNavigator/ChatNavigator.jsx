/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styles from "./ChatNavigator.module.css";
import { getActiveQuestionTree, getQuestionTreeById } from "../../actions/Tree";
import Image from "next/image";
import PropTypes from "prop-types";
import { IoChevronBackOutline } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import QuestionTemplate from "../QuestionTemplate/QuestionTemplate";
import { useRouter } from "next/router";
import ErrorPage from "../ErrorPage";
import { useSession } from "next-auth/react";
import { Text, Flex, Stack } from "@chakra-ui/react";

/**
 * Displays home and back buttons, as well as progress bar and question name or error/success message.
 * Progress bar displays current level of node in tree out of the deepest leaf node path.
 * Home button goes to root node.
 * Back button goes to previously visited question.
 * Arrows are also displayed when a question has more than 5 options to enable scrolling which shifts options by 1.
 */

const ChatNavigator = (props) => {
  let [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  let [allQuestions, setAllQuestions] = useState({});
  let [questionStack, setQuestionStack] = useState([]);
  let [visibleOptionsStart, setVisibleOptionsStart] = useState(0);
  let [visibleOptionsEnd, setVisibleOptionsEnd] = useState(5);
  let [invalidID, setInvalidId] = useState(false);
  let { data: session, status } = useSession();
  let [allDistances, setAllDistances] = useState({});

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

        const distanceMap = {};
        const finalDistanceMap = {};
        for (const question of questions) {
          for (const tempQuestion of questions) {
            distanceMap[tempQuestion.id] = 1000;
          }
          let maxDist = 0;
          const queue = [];
          distanceMap[question.id] = 0;
          queue.push(question);
          while (queue.length != 0) {
            const ejectQuestion = queue.shift();
            for (const opt of ejectQuestion.options) {
              if (opt.nextId) {
                if (distanceMap[opt.nextId] == 1000) {
                  queue.push(questionMap[opt.nextId]);
                  distanceMap[opt.nextId] = distanceMap[ejectQuestion.id] + 1;
                  if (distanceMap[opt.nextId] > maxDist) {
                    maxDist = distanceMap[opt.nextId];
                  }
                }
              }
            }
          }
          finalDistanceMap[question.id] = maxDist;
        }
        setAllQuestions(questionMap);
        setAllDistances(finalDistanceMap);
        setInvalidId(false);
      } catch {
        setInvalidId(true);
        console.log("Unable to get questions at this time.");
      }
    };
    setup();
  }, [router.isReady]);

  const numQs = Object.keys(allQuestions).length;
  let tempQuestionStack = [];

  const progressBars = [];
  for (let i = 0; i < Object.values(allDistances)[0] + 1; i++) {
    progressBars.push(i);
  }

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
      <Flex width="100%" height="100%" backgroundColor="#F9F8FA">
        <Stack direction="column" width="100%">
          <Stack
            direction="row"
            width="100%"
            backgroundColor="#F9F8FA"
            justifyContent="center"
            alignItems="center"
            paddingTop={5}
            paddingBottom={5}
          >
            <Stack direction="row" width="33%" paddingLeft={20}>
              <Flex
                backgroundColor="#343A40"
                alignItems="center"
                justifyContent="center"
                borderRadius={2}
                height={26}
                width={26}
                onClick={() => {
                  setCurrentQuestionIndex(1);
                  setQuestionStack([]);
                  setVisibleOptionsStart(0);
                  setVisibleOptionsEnd(5);
                }}
                cursor="pointer"
              >
                <MdHome size={15} color="white" />
              </Flex>
              <Flex
                backgroundColor="#343A40"
                alignItems="center"
                justifyContent="center"
                borderRadius={2}
                height={26}
                width={26}
                onClick={() => {
                  tempQuestionStack = questionStack;
                  setCurrentQuestionIndex(tempQuestionStack.pop());
                  setQuestionStack(tempQuestionStack);
                  setQuestionStack(questionStack);
                  setVisibleOptionsStart(0);
                  setVisibleOptionsEnd(5);
                }}
                cursor="pointer"
              >
                <IoChevronBackOutline size={15} color="white" />
              </Flex>
            </Stack>
            <Flex width="33%" justifyContent="center">
              <Text
                textAlign="center"
                marginBottom={0}
                color="#343A40"
                fontSize="28px"
                fontWeight={600}
                fontFamily="sans-serif"
              >
                {currentQuestion.type == "question" && currentQuestion.question}
                {currentQuestion.type == "url" &&
                  "We have found a resource for you!"}
                {currentQuestion.type == "error" &&
                  "Unfortunately, we cannot find a resource for you!"}
              </Text>
            </Flex>
            <Flex width="33%" justifyContent="flex-end" paddingRight={20}>
              <Stack direction="row" width="25%">
                {progressBars.map((index) => {
                  return (
                    <Flex
                      key={index}
                      backgroundColor={
                        Object.values(allDistances)[0] -
                          allDistances[currentQuestion.id] >=
                        index
                          ? "#58794E"
                          : "#343A40"
                      }
                      opacity={
                        Object.values(allDistances)[0] -
                          allDistances[currentQuestion.id] >=
                        index
                          ? 1
                          : 0.25
                      }
                      width="25px"
                      height="6px"
                    ></Flex>
                  );
                })}
              </Stack>
            </Flex>
          </Stack>
          <Stack direction="row" justifyContent="center" alignItems="center">
            {visibleOptionsStart > 0 ? (
              <Flex
                cursor="pointer"
                paddingTop={10}
                width="50px"
                height="250px"
                onClick={() => {
                  setVisibleOptionsEnd((visibleOptionsEnd -= 1));
                  setVisibleOptionsStart((visibleOptionsStart -= 1));
                }}
              >
                <BsChevronLeft color="#343A40" size={50} />
              </Flex>
            ) : (
              <Flex>
                <BsChevronLeft color="#F8F9FA" size={50} />
              </Flex>
            )}
            <Flex>
              <QuestionTemplate
                question={currentQuestion.question}
                url={currentQuestion.url}
                type={currentQuestion.type}
                questionStart={visibleOptionsStart}
                questionEnd={visibleOptionsEnd}
                options={currentQuestion.options.map((option) => {
                  return {
                    answer: option.option,
                    triggerNext: () => {
                      if (option.nextId) {
                        setCurrentQuestionIndex(option.nextId);
                        setVisibleOptionsStart(0);
                        setVisibleOptionsEnd(5);
                      }
                      tempQuestionStack = questionStack;
                      tempQuestionStack.push(currentQuestion.id);
                      setQuestionStack(tempQuestionStack);
                    },
                  };
                })}
              ></QuestionTemplate>
            </Flex>
            {visibleOptionsEnd <
            Object.values(currentQuestion.options).length ? (
              <Flex
                cursor="pointer"
                paddingTop={10}
                width="50px"
                height="250px"
                onClick={() => {
                  setVisibleOptionsEnd((visibleOptionsEnd += 1));
                  setVisibleOptionsStart((visibleOptionsStart += 1));
                }}
              >
                <BsChevronRight color="#343A40" size={50} />
              </Flex>
            ) : (
              <Flex>
                <BsChevronRight color="#F8F9FA" size={50} />
              </Flex>
            )}
          </Stack>
        </Stack>
      </Flex>
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
