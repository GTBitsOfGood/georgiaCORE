/* eslint-disable no-unused-vars */
import React from "react";
import { Flex, Text, Stack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { PhoneIcon } from "@chakra-ui/icons";

const QuestionTemplate = (props) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      paddingBottom={50}
    >
      {props.options.map((option, index) => {
        return (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            key={index}
            onClick={option.triggerNext ? option.triggerNext : () => {}}
            padding="10px"
            width= "250px"
            height="250px"
            marginRight="20px"
            marginLeft="20px"
            
            cursor="pointer"
          >
            {props.options.image ? (
              <Flex
                backgroundColor= "#5B794E"
                width="120px"
                height="120px"
                borderRadius="100%"
                alignItems="center"
                justifyContent="center"
                color="white"
                marginBottom="20px"
              >
                <PhoneIcon></PhoneIcon>
              </Flex>
            ) : (
              <Flex
                backgroundColor= "#5B794E"
                width="120px"
                height="120px"
                borderRadius="100%"
                alignItems="center"
                justifyContent="center"
                color="white"
              >
                <PhoneIcon height={50} width={50}></PhoneIcon>
              </Flex>
            )}
            <Flex width="100%" backgroundColor="#F9F8FA" justifyContent="center">
              <Text
                color="#343A40"
                fontSize="24px"
                fontWeight={700}
                fontFamily="sans-serif"
              >
                {option.answer}
              </Text>
            </Flex>
            <Flex width="100%" backgroundColor="#F9F8FA" justifyContent="center">
              <Text
                color= "#343A40"
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
    </Stack>
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
