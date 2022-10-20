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

const H1 = ({ children }) => {
  return (
    <Heading size="md" mt="4">
      {children}
    </Heading>
  );
};
H1.propTypes = {
  children: PropTypes.node.isRequired,
};

const H2 = ({ children }) => {
  return (
    <Heading size="sm" mt="2">
      {children}
    </Heading>
  );
};
H2.propTypes = {
  children: PropTypes.node.isRequired,
};

const InstructionsModal = ({ onClose, isOpen }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minWidth={"80%"}>
          <ModalHeader>Instructions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <H1>Adding New Nodes</H1>
            Drag the handle (dot) on the right side of an option to a blank
            canvas to create a new node.
            <H1>Deleting Nodes</H1>
            Click a question once to select it and then press backspace.
            <H1>Editing Nodes</H1>
            Double click a question to edit it.
            <H1>Node Types</H1>
            To switch between types, double click a node and select from the
            dropdown menu.
            <H2>Question</H2>A question and a set of options that the user can
            select from to direct them to the next node.
            <H2>URL</H2>A URL for the user to be directed to.
            <H2>Text</H2>
            Text that should be displayed to the user
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
