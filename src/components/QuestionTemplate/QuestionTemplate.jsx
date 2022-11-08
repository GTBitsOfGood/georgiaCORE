/* eslint-disable no-unused-vars */
import React from "react";
import { Flex, Text, Stack, Link } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { PhoneIcon } from "@chakra-ui/icons";
import { FaUserNurse } from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";
import { RiComputerFill } from "react-icons/ri";
import { MdOutlineClose, MdOutlineCheck } from "react-icons/md";

/**
 * Row stack of question options with icons.
 * Displays up to 5 options at a time.
 * Default icon is phone.
 * Does not display if node is error node or text node.
 * Displays url if node is a url node.
 */

const QuestionTemplate = (props) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      paddingBottom={50}
    >
      {props.type == "question" &&
        props.options
          .slice(props.questionStart, props.questionEnd)
          .map((option, index) => {
            return (
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                key={index}
                onClick={option.triggerNext ? option.triggerNext : () => {}}
                padding="10px"
                width="250px"
                height="250px"
                marginRight="20px"
                marginLeft="20px"
                cursor="pointer"
              >
                {props.options.image ? (
                  <Flex
                    backgroundColor="#5B794E"
                    width="120px"
                    height="120px"
                    borderRadius="100%"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                    marginBottom="20px"
                  >
                    {props.options.image == "doctor" && (
                      <FaUserNurse size={50}></FaUserNurse>
                    )}
                    {props.options.image == "resources" && (
                      <RiComputerFill size={50}></RiComputerFill>
                    )}
                    {props.options.image == "health" && (
                      <GiHealthNormal size={50}></GiHealthNormal>
                    )}
                    {props.options.image == "x" && (
                      <MdOutlineClose size={50}></MdOutlineClose>
                    )}
                    {props.options.image == "check" && (
                      <MdOutlineCheck size={50}></MdOutlineCheck>
                    )}
                    {props.options.image == "phone" && (
                      <PhoneIcon width={50} height={50}></PhoneIcon>
                    )}
                  </Flex>
                ) : (
                  <Flex
                    backgroundColor="#5B794E"
                    width="120px"
                    height="120px"
                    borderRadius="100%"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                  >
                    <PhoneIcon width={50} height={50}></PhoneIcon>
                  </Flex>
                )}
                <Flex
                  width="100%"
                  backgroundColor="#F9F8FA"
                  justifyContent="center"
                >
                  <Text
                    color="#343A40"
                    fontSize="24px"
                    fontWeight={700}
                    fontFamily="sans-serif"
                  >
                    {option.answer}
                  </Text>
                </Flex>
                <Flex
                  width="100%"
                  backgroundColor="#F9F8FA"
                  justifyContent="center"
                >
                  <Text
                    color="#343A40"
                    opacity={0.7}
                    fontSize="16px"
                    lineHeight={1.3}
                    fontWeight={600}
                    fontFamily="sans-serif"
                  >
                    professional medical resources that may help
                  </Text>
                </Flex>
              </Stack>
            );
          })}
      {props.type == "url" && (
        <Flex width="100%" backgroundColor="#F9F8FA" justifyContent="center">
          <Link>
            <Text
              color="#343A40"
              opacity={0.7}
              fontSize="20px"
              lineHeight={1.3}
              fontWeight={600}
              fontFamily="sans-serif"
            >
              {props.url}
            </Text>
          </Link>
        </Flex>
      )}
    </Stack>
  );
};

QuestionTemplate.propTypes = {
  question: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  questionStart: PropTypes.number,
  questionEnd: PropTypes.number,
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
