/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styles from "./ChatNavigator.module.css";
import { getActiveQuestionTree, getQuestionTreeById } from "../../actions/Tree";
import Image from "next/image";
import PropTypes from "prop-types";
import { IoChevronBackOutline } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import QuestionTemplate from "../QuestionTemplate/QuestionTemplate";
import { useRouter } from "next/router";
import ErrorPage from "../ErrorPage";
import { useSession } from "next-auth/react";
import { Text, Flex, Stack } from "@chakra-ui/react";

const ChatNavigator = (props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [allQuestions, setAllQuestions] = useState({});
  const [invalidID, setInvalidId] = useState(false);
  const { data: session, status } = useSession();

  
  const router = useRouter()
  const { query } = router;

  useEffect(() => {
    const setup = async () => {
      try {
        const questionsTree = await getQuestionTreeById(query.id);
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
  
  const progressBars = []
  for (let i = 0; i < numQs; i++){
    progressBars.push(i)
  }

  if (status === "loading") {
    return <></>;
  } 

  if (status == "unauthenticated") {
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
      <Flex
        width="100%"
        height="100%"
        backgroundColor="#F9F8FA"
      >
        <Stack
          direction="column"
          width="100%"
        >
          <Stack
            direction="row" 
            width="100%"
            backgroundColor="#F9F8FA" 
            justifyContent="center"
            alignItems="center"
            paddingTop={5}
            paddingBottom={5}
          >
            <Stack  direction="row" width="33%" paddingLeft={20}>
              <Flex 
                backgroundColor="#343A40"
                alignItems="center"
                justifyContent="center"
                borderRadius={2}
                height={26}
                width={26}
                onClick={() => setCurrentQuestionIndex(1)}
                cursor="pointer"
              >
                <MdHome size={15} color="white"/>
              </Flex>
              <Flex 
                backgroundColor="#343A40"
                alignItems="center"
                justifyContent="center"
                borderRadius={2}
                height={26}
                width={26}
                onClick={() => currentQuestionIndex > 1 ? setCurrentQuestionIndex(currentQuestionIndex - 1): setCurrentQuestionIndex(1)}
                cursor="pointer"
              >
                <IoChevronBackOutline size={15} color="white"/>
              </Flex>
            </Stack>
            <Flex width="33%" justifyContent="center">
              <Text
                textAlign= "center"
                marginBottom={0}
                color= "#343A40"
                fontSize= "28px"
                fontWeight= {600}
                fontFamily="sans-serif"
              >
                {currentQuestion.question}
              </Text>
            </Flex>
            <Flex width="33%" justifyContent="flex-end" paddingRight={20}>
              <Stack direction="row" width="25%">
                {progressBars.map((index) => {
                  return (
                    <Flex 
                      key={index} 
                      backgroundColor={currentQuestionIndex - 1 >= index ? "#58794E" : "#343A40"} 
                      opacity={currentQuestionIndex - 1 >= index ? 1 : .25} 
                      width="25px" 
                      height="6px"
                    >
                    </Flex>
                  );
                })}
              </Stack>
            </Flex>
          </Stack>
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
