import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const InstructionsModal = ({ onClose, isOpen }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minWidth={"min-content"}>
          <ModalHeader>Instructions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size="sm">Adding New Nodes</Heading>
            Drag the handle (dot) on the right side of an option to a blank
            canvas to create a new node.
            <Heading size="sm">Deleting Nodes</Heading>
            Click a question once to select it and then press backspace.
            <Heading size="sm">Editing Nodes</Heading>
            Double click a question to edit it.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

InstructionsModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default InstructionsModal;
