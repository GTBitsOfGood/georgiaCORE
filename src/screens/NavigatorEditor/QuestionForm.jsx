import React, { useState } from "react";
import {
  Box,
  FormControl,
  VStack,
  HStack,
  Select,
  Input,
  Button,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import { SmallCloseIcon, DragHandleIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

import { v4 as uuidv4 } from "uuid";
import icons from "src/utils/icons";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const editOption = ({ question, optionId, text, icon, supportingText }) => {
  return {
    ...question,
    options: question.options.map((o) => {
      if (o.id === optionId) {
        return {
          ...o,
          option: text || o.option,
          icon: icon || o.icon,
          supportingText: supportingText || o.supportingText,
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

const EditOption = ({
  optionIndex,
  optionId,
  optionText,
  optionSupportingText,
  optionIcon,
  question,
  setQuestion,
}) => {
  const handleTextChange = (event) => {
    setQuestion(
      editOption({
        question,
        optionId,
        text: event.target.value,
      })
    );
  };

  const handleIconChange = (event) => {
    setQuestion(
      editOption({
        question,
        optionId,
        icon: event.target.value,
      })
    );
  };

  const handleSupportingTextChange = (event) => {
    setQuestion(
      editOption({
        question,
        optionId,
        supportingText: event.target.value,
      })
    );
  };

  return (
    <Draggable key={optionId} draggableId={optionId} index={optionIndex}>
      {(provided, snapshot) => (
        <Flex
          ref={provided.innerRef}
          {...provided.draggableProps}
          bgColor="white"
          rounded="md"
        >
          <HStack w="100%">
            <Select
              variant="filled"
              w="21%"
              size="sm"
              value={optionIcon || "QuestionMark"}
              onChange={handleIconChange}
              icon={icons[optionIcon] || icons["QuestionMark"]}
            >
              {Object.keys(icons).map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
              <option key={-1} value="None">
                None (No Icon)
              </option>
            </Select>
            <VStack w="90%">
              <Input
                variant="flushed"
                placeholder="Name"
                value={optionText}
                onChange={handleTextChange}
              />
              <Input
                variant="flushed"
                placeholder="Supporting Text"
                value={optionSupportingText}
                onChange={handleSupportingTextChange}
              />
            </VStack>
            <Button
              onClick={() => setQuestion(removeOption(question, optionId))}
            >
              <SmallCloseIcon color="teal" />
            </Button>
            <Box {...provided.dragHandleProps}>
              <DragHandleIcon />
            </Box>
          </HStack>
        </Flex>
      )}
    </Draggable>
  );
};

EditOption.propTypes = {
  optionIndex: PropTypes.number,
  optionId: PropTypes.string,
  optionText: PropTypes.string,
  optionIcon: PropTypes.string,
  question: PropTypes.object,
  setQuestion: PropTypes.func,
  optionSupportingText: PropTypes.any,
};

const addOption = (question) => {
  return {
    ...question,
    options: [
      ...question.options,
      {
        id: uuidv4(),
        option: "Option " + (question.options.length + 1),
        icon: "QuestionMark",
        nextId: null,
        supportingText: null,
      },
    ],
  };
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const QuestionForm = ({ question, setQuestion }) => {
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      question.options,
      result.source.index,
      result.destination.index
    );

    setQuestion({
      ...question,
      options: [...items],
    });
  };

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
                <option value="error">ERROR</option>
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
                  value={question.linkName}
                  placeholder="Link Name"
                  onChange={(e) =>
                    setQuestion({ ...question, linkName: e.target.value })
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
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <Flex
                      direction="column"
                      w="full"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      // style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {question.options.map((option, index) => (
                        <EditOption
                          optionIndex={index}
                          key={option.id}
                          optionId={option.id}
                          optionText={option.option}
                          optionSupportingText={option.supportingText}
                          optionIcon={option.icon}
                          question={question}
                          setQuestion={setQuestion}
                        />
                      ))}
                      {provided.placeholder}
                      <HStack w="100%">
                        <Button
                          variant="link"
                          color="teal"
                          onClick={() => setQuestion(addOption(question))}
                        >
                          New Option
                        </Button>
                      </HStack>
                    </Flex>
                  )}
                </Droppable>
              </DragDropContext>
            )}

            {question.type === "url" && (
              <Input
                value={question.url}
                placeholder="URL"
                onChange={(e) =>
                  setQuestion({ ...question, url: e.target.value })
                }
              />
            )}

            {question.type === "text" && (
              <Input
                value={question.bodyText}
                placeholder="Body Text"
                onChange={(e) =>
                  setQuestion({ ...question, bodyText: e.target.value })
                }
              />
            )}

            {question.type === "url" && (
              <Checkbox
                style={{ marginLeft: "auto" }}
                isChecked={question.openNewTab}
                onChange={(e) =>
                  setQuestion({ ...question, openNewTab: e.target.checked })
                }
              >
                Open in New Tab
              </Checkbox>
            )}

            <Checkbox
              style={{ marginLeft: "auto" }}
              isChecked={question.type !== "question"}
              disabled
            >
              Leaf Node
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
