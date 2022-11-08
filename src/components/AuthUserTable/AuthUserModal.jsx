import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalFooter,
  Input,
  useDisclosure,
  Text,
  Stack,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { insertAuthUser, updateAuthUser } from "src/actions/AuthUser";
import { EditIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

/**
 * Modal for adding and editing authUsers
 * Creates an add button and an edit icon for adding and editing authUsers on click
 * Includes a field to enter the email for the new authUser or the changed email
 * Includes buttons to choose the role for the new authUser or the changed role
 * Includes button to add a new authUser on click or to edit authUser in the row
 */

const AuthUserModal = ({
  btnName,
  modalTitle,
  action,
  currentEmail,
  calculate,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputValue, setInputValue] = React.useState("");
  const [buttonRole, setButtonRole] = React.useState("1");
  const handleChange = (event) => setInputValue(event.target.value);

  return (
    <>
      {btnName == "Save Changes" && (
        <Button
          w={5}
          h={5}
          bgColor="white"
          onClick={() => {
            setInputValue("");
            onOpen();
          }}
        >
          <EditIcon w={5} h={5} />
        </Button>
      )}
      {btnName == "Confirm" && (
        <Button
          bgColor="#59784D"
          color="white"
          variant="solid"
          _hover={{ backgroundColor: "rgba(89, 120, 77, 0.50)" }}
          _active={{ backgroundColor: "rgba(89, 120, 77, 0.50)" }}
          onClick={() => {
            setInputValue("");
            onOpen();
          }}
        >
          Add an Employee
        </Button>
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setButtonRole("1");
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent boxShadow="none" alignSelf="center" minWidth={600}>
          <ModalHeader
            textAlign="center"
            fontFamily="initial"
            fontWeight="normal"
          >
            {modalTitle}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody border="1px solid #E2E8F0" paddingBottom={5}>
            <Text
              fontFamily="body"
              fontWeight="semibold"
              paddingBottom={2}
              paddingLeft={1}
            >
              Email
            </Text>
            <Input
              value={inputValue}
              onChange={handleChange}
              placeholder={currentEmail}
              marginBottom={5}
            ></Input>
            <Text
              fontFamily="body"
              fontWeight="semibold"
              paddingBottom={2}
              paddingLeft={1}
            >
              Role:
            </Text>
            <RadioGroup
              onChange={setButtonRole}
              value={buttonRole}
              paddingLeft={1}
            >
              <Stack direction="row">
                <Radio
                  value="1"
                  _checked={{ bgColor: "#59784D", padding: "2px" }}
                  _focus={{ boxShadow: "none" }}
                >
                  Administrator
                </Radio>
                <Radio
                  value="2"
                  _checked={{ bgColor: "#59784D", padding: "2px" }}
                  _focus={{ boxShadow: "none" }}
                >
                  Staff
                </Radio>
              </Stack>
            </RadioGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              bgColor="#59784D"
              color="#E2E8F0"
              variant="solid"
              _hover={{ backgroundColor: "rgba(89, 120, 77, 0.75)" }}
              _active={{ backgroundColor: "rgba(89, 120, 77, 0.75)" }}
              onClick={() => {
                if (action == "insertAuthUser") {
                  if (inputValue != null && inputValue != "") {
                    if (buttonRole == "1") {
                      insertAuthUser({
                        email: inputValue,
                        role: "Administrator",
                      });
                      calculate();
                    } else if (buttonRole == "2") {
                      insertAuthUser({ email: inputValue, role: "Staff" });
                      calculate();
                    }
                  }
                } else if (action == "updateAuthUser") {
                  if (inputValue != null && inputValue != "") {
                    if (buttonRole == "1") {
                      updateAuthUser(currentEmail, {
                        email: inputValue,
                        role: "Administrator",
                      });
                      calculate();
                    } else if (buttonRole == "2") {
                      updateAuthUser(currentEmail, {
                        email: inputValue,
                        role: "Staff",
                      });
                      calculate();
                    }
                  } else if (inputValue == "") {
                    if (buttonRole == "1") {
                      updateAuthUser(currentEmail, {
                        email: currentEmail,
                        role: "Administrator",
                      });
                      calculate();
                    } else if (buttonRole == "2") {
                      updateAuthUser(currentEmail, {
                        email: currentEmail,
                        role: "Staff",
                      });
                      calculate();
                    }
                  }
                }
                onClose();
                setButtonRole("1");
              }}
            >
              {btnName}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

AuthUserModal.propTypes = {
  btnName: PropTypes.any,
  modalTitle: PropTypes.any,
  action: PropTypes.any,
  currentEmail: PropTypes.any,
  calculate: PropTypes.any,
};

export default AuthUserModal;
