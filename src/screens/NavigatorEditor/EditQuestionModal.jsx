import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

import QuestionForm from "./QuestionForm";

const EditQuestionModal = ({ isOpen, dispatch, question: q }) => {
  const [question, setQuestion] = React.useState(q);

  useEffect(() => {
    setQuestion(q);
  }, [q]);

  if (!question) {
    return null;
  }

  const onClose = () => {
    dispatch({ type: "close_edit_modal" });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minWidth={"min-content"}>
          <ModalHeader>Edit Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <QuestionForm question={question} setQuestion={setQuestion} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={() => {
                dispatch({ type: "update_question", question });
                onClose();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

EditQuestionModal.propTypes = {
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  dispatch: PropTypes.func,
  question: PropTypes.object,
};

export default EditQuestionModal;
