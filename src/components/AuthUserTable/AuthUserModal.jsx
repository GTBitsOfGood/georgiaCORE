import React from "react";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalOverlay, ModalCloseButton, ModalFooter, Input, useDisclosure } from "@chakra-ui/react";
import { insertAuthUser, updateAuthUser } from "src/actions/AuthUser";

const AddAuthUserModal = ({btnName, modalTitle, action, currentEmail}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [inputValue, setInputValue] = React.useState('')
  const handleChange = (event) => setInputValue(event.target.value)
  
  return (
    <>
      <Button onClick={onOpen}>{btnName}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input 
                value={inputValue}
                onChange={handleChange}
                placeholder= {currentEmail}
            >
            </Input>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => {
                if (action == "insertAuthUser") {
                    if (inputValue != null && inputValue != "") {
                        insertAuthUser({email: inputValue});
                    }
                } else if (action == "updateAuthUser") {
                    if (inputValue != null && inputValue != "") {
                        
                        updateAuthUser(currentEmail, {email: inputValue});
                    }
                }; 
                onClose()
            }}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
};

export default AddAuthUserModal;