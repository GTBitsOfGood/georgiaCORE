import React from "react";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalOverlay, ModalCloseButton, ModalFooter, Input, useDisclosure, Text } from "@chakra-ui/react";
import { insertAuthUser, updateAuthUser } from "src/actions/AuthUser";
import { EditIcon } from "@chakra-ui/icons";

const AddAuthUserModal = ({btnName, modalTitle, action, currentEmail}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [inputValue, setInputValue] = React.useState('')
  const handleChange = (event) => 
    setInputValue(event.target.value)
    
  

  return (
    <>
      {btnName == "Submit" && (
        <Button w={5} h={5} bgColor="white" onClick={() => {setInputValue(""); onOpen()}}><EditIcon w={5} h={5} /></Button>
      )}
      {btnName == "Add as an Assistant" && (
        <Button bgColor="#F6893C" color="white" variant="solid" _hover={{backgroundColor: "rgba(246, 137, 60, 0.50)"}} _active={{backgroundColor: "rgba(246, 137, 60, 0.50)"}} onClick={() => {setInputValue(""); onOpen()}}>Add an Assistant</Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" fontFamily="initial" fontWeight="normal">{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody border="1px solid #E2E8F0" paddingBottom={5}>
            <Text fontFamily="body" fontWeight="semibold">
              Email
            </Text>
            <Input 
                value={inputValue}
                onChange={handleChange}
                placeholder= {currentEmail}
            >
            </Input>
          </ModalBody>

          <ModalFooter>
            <Button bgColor="#F6893C" color="white" variant="solid"  _hover={{backgroundColor: "rgba(246, 137, 60, 0.50)"}} _active={{backgroundColor: "rgba(246, 137, 60, 0.50)"}} onClick={() => {
                if (action == "insertAuthUser") {
                    if (inputValue != null && inputValue != "") {
                        insertAuthUser({email: inputValue, role: "Staff"});
                    }
                } else if (action == "updateAuthUser") {
                    if (inputValue != null && inputValue != "") {
                        
                        updateAuthUser(currentEmail, {email: inputValue});
                    }
                }; 
                onClose()
            }}>
              {btnName}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
};

export default AddAuthUserModal;