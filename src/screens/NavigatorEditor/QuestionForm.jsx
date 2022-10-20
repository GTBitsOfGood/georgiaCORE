import React from "react";
import {
  Box,
  FormControl,
  VStack,
  HStack,
  Select,
  Input,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

import { v4 as uuidv4 } from "uuid";

const editOptionText = ({ question, optionId, text }) => {
  return {
    ...question,
    options: question.options.map((o) => {
      if (o.id === optionId) {
        return {
          ...o,
          option: text,
        };
      }
      return o;
    }),
  };
};

const removeOption = (question, optionId) => {
  return {
    ...question,
    options: question.options.filter((o) => o.id !== optionId),
  };
};

const NewOption = ({ optionId, optionText, question, setQuestion }) => {
  const handleChange = (event) => {
    setQuestion(
      editOptionText({
        question,
        optionId,
        text: event.target.value,
      })
    );
  };

  return (
    <HStack w="100%">
      <Input variant="flushed" value={optionText} onChange={handleChange} />
      <Button onClick={() => setQuestion(removeOption(question, optionId))}>
        <SmallCloseIcon color="teal" />
      </Button>
    </HStack>
  );
};

NewOption.propTypes = {
  optionId: PropTypes.string,
  optionText: PropTypes.string,
  question: PropTypes.object,
  setQuestion: PropTypes.func,
};

const addOption = (question) => {
  return {
    ...question,
    options: [
      ...question.options,
      {
        id: uuidv4(),
        option: "Option " + (question.options.length + 1),
        nextId: null,
      },
    ],
  };
};

const QuestionForm = ({ question, setQuestion }) => {
  return (
    <Box w="container.md">
      <Box p="3">
        <FormControl>
          <VStack spacing="5">
            <HStack w="100%">
              <Select
                w="30%"
                value={question.type}
                onChange={(event) =>
                  setQuestion({
                    ...question,
                    type: event.target.value,
                  })
                }
              >
                <option value="question">Question</option>
                <option value="url">URL</option>
                <option value="text">TEXT</option>
              </Select>
              {question.type === "question" && (
                <Input
                  w="70%"
                  value={question.question}
                  onChange={(e) =>
                    setQuestion({ ...question, question: e.target.value })
                  }
                />
              )}

              {question.type === "url" && (
                <Input
                  w="70%"
                  value={question.url}
                  onChange={(e) =>
                    setQuestion({ ...question, url: e.target.value })
                  }
                />
              )}
              {question.type === "text" && (
                <Input
                  w="70%"
                  value={question.heading}
                  placeholder="Heading"
                  onChange={(e) =>
                    setQuestion({ ...question, heading: e.target.value })
                  }
                />
              )}
            </HStack>

            {question.type === "question" && (
              <>
                {question.options.map((option) => (
                  <NewOption
                    key={option.id}
                    optionId={option.id}
                    optionText={option.option}
                    question={question}
                    setQuestion={setQuestion}
                  />
                ))}
                <HStack w="100%">
                  <Button
                    variant="link"
                    color="teal"
                    onClick={() => setQuestion(addOption(question))}
                  >
                    New Option
                  </Button>
                </HStack>
              </>
            )}

            {question.type === "text" && (
              <Input
                value={question.text}
                placeholder="Text"
                onChange={(e) =>
                  setQuestion({ ...question, text: e.target.value })
                }
              />
            )}

            <Checkbox
              style={{ marginLeft: "auto" }}
              isChecked={question.type !== "question"}
              disabled
            >
              Final Node
            </Checkbox>
          </VStack>
        </FormControl>
      </Box>
    </Box>
  );
};

QuestionForm.propTypes = {
  question: PropTypes.object,
  setQuestion: PropTypes.func,
};

export default QuestionForm;
