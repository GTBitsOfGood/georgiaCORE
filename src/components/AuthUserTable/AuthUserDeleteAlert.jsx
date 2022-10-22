import React from "react";
import { 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalCloseButton, 
    ModalBody, 
    ModalFooter, 
    Button, 
    useDisclosure, 
    Text, 
    Stack 
} from "@chakra-ui/react";
import { deleteAuthUser } from "src/actions/AuthUser";
import { DeleteIcon } from "@chakra-ui/icons";

const AuthUsersDeleteAlert = ({calculate, email}) => {

    /**
     * Delete Alert
     * Delete modal appears when delete button is clicked in the AuthUserTable
     * Displays message asking if you want to delete the user in the row
     * Displays delete button which deletes user in the row on click
     */

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button w={5} h={5} bgColor="white" onClick={onOpen}><DeleteIcon w={5} h={5} color="#c41e3a"/></Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent alignSelf="center" >
                    <ModalHeader 
                        textAlign="center" 
                        fontFamily="initial" 
                        fontWeight="normal"
                    >
                        Delete an Employee
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody border="1px solid #E2E8F0" wordBreak="break-word">
                        <Stack direction="row" wrap="wrap" spacing={0} >
                            <Text 
                                letterSpacing="tight" 
                                fontWeight="semibold"
                            >
                                Are you sure you want to delete
                            </Text>
                            <Text color="white">.</Text>
                            <Text 
                                letterSpacing="tight" 
                                fontWeight="bold"
                            >
                                {email}
                            </Text>
                            <Text color="white">.</Text>
                            <Text 
                                letterSpacing="tight" 
                                fontWeight="semibold"
                            > 
                                as an employee?
                            </Text>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button 
                            bgColor="#59784D" 
                            color="#E2E8F0" 
                            variant="solid"  
                            _hover={{backgroundColor: "rgba(89, 120, 77, 0.75)"}} 
                            _active={{backgroundColor: "rgba(89, 120, 77, 0.75)"}} 
                            onClick = {() => {deleteAuthUser({email: email}); calculate()}}
                        >
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AuthUsersDeleteAlert;