/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  Box,
  VStack,
  Divider,
  Button,
  Input,
  HStack,
  Heading,
  Image,
  Text,
  Flex,
  Switch,
  Center,
  ButtonGroup,
  AspectRatio,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { CopyIcon, EditIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const TreeThumbnailCard = (props) => {
  let router = useRouter();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenActive,
    onOpen: onOpenActive,
    onClose: onCloseActive,
  } = useDisclosure();
  const {
    isOpen: isOpenClone,
    onOpen: onOpenClone,
    onClose: onCloseClone,
  } = useDisclosure();
  const {
    isOpen: isOpenTitle,
    onOpen: onOpenTitle,
    onClose: onCloseTitle,
  } = useDisclosure();

  const [futureActive, setFutureActive] = useState(props.tree.active);
  const [title, setTitle] = useState(props.tree.title);

  const editedOnString = props.tree.editedOn
    ? `${props.tree.editedOn.toLocaleTimeString()}, ${props.tree.editedOn
        .toLocaleDateString()
        .replaceAll("/", "-")}`
    : "N/A";
  const lastActiveDateString = props.tree.active
    ? "Currently"
    : props.tree.lastActive?.toLocaleDateString().replaceAll("/", "-") ?? "N/A";
  return (
    <Box
      boxShadow="xs"
      border="1px"
      borderColor="gray"
      w={372}
      h={405}
      padding="29.5"
      rounded="2xl"
      bg="#E0E2DA"
    >
      <VStack>
        {/* Thumbnail */}
        <Image
          src={props.tree.thumbnailImage ? 
            `data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(props.tree.thumbnailImage.data)))}` :
            "/static/images/georgiacore_navbar_logo.png"
          }
          alt={"tree-preview"}
          borderRadius="20px"
          overflow='hidden'
          w='60%'
        />
        {/* </View> */}

        {/* Info */}
        <VStack w="100%">
          {/* Header */}
          <Flex flexDirection="row" w="100%" justifyContent="space-between">
            {/* Title */}
            <ButtonGroup w='70%'>
              {/* <Flex w='100%'> */}
                <Heading
                  noOfLines={2}
                  as="h4"
                  size="lg"
                  onClick={() =>
                    router.push("/navigation-editor?id=" + props.tree._id)
                  }
                  cursor="pointer"
                >
                  <Text>{props.tree.title ?? "N/A"}</Text>
                </Heading>
              {/* </Flex> */}
              <IconButton
                colorScheme="georgia-core-green"
                aria-label="edit-title"
                size="md"
                variant="link"
                onClick={onOpenTitle}
                icon={<EditIcon />}
              />
            </ButtonGroup>
            {/* Active */}
            <HStack spacing="5px" p="5px" h="100%">
              <Text>Active</Text>
              <Switch
                onChange={(e) => {
                  setFutureActive(e.target.checked);
                  onOpenActive();
                }}
                isChecked={props.tree.active}
                id="active-button"
                colorScheme="georgia-core-green"
              />
            </HStack>
          </Flex>
          <>
            <Modal isOpen={isOpenTitle} onClose={onCloseTitle} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Change Title</ModalHeader>
                <ModalCloseButton />

                <Divider />
                <ModalBody>
                  <FormControl isRequired>
                    <FormLabel>Question List Title</FormLabel>
                    <Input
                      placeholder="Title"
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </FormControl>
                </ModalBody>
                <Divider />

                <ModalFooter>
                  <Button
                    colorScheme="georgia-core-green"
                    variant="ghost"
                    mr={3}
                    onClick={onCloseTitle}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={(e) => props.handleTitleEdit(title)}
                    colorScheme="georgia-core-green"
                    variant="solid"
                  >
                    Create
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
          <>
            <Modal isOpen={isOpenActive} onClose={onCloseActive} isCentered>
              <ModalOverlay />
              <ModalContent>
                <Center>
                  <ModalHeader>
                    <Text fontSize="2xl" as="b">
                      Warning!
                    </Text>
                  </ModalHeader>
                </Center>
                <ModalCloseButton />

                <Divider />
                <ModalBody>
                  {futureActive ? (
                    <>
                      This tree will replace the one that is currently active.
                      Are you sure you want to continue?
                    </>
                  ) : (
                    <>
                      This tree will be deactivated, causing there to be no
                      active tree. It is recommended to set an inactive tree to
                      active first. Are you sure you want to continue?
                    </>
                  )}
                </ModalBody>

                <Divider />

                <ModalFooter>
                  <Button
                    colorScheme="georgia-core-green"
                    variant="ghost"
                    mr={3}
                    onClick={(e) => {
                      setFutureActive(props.tree.active);
                      onCloseActive();
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={(e) => props.handeActiveSwitch(futureActive)}
                    colorScheme="georgia-core-green"
                    variant="solid"
                  >
                    Continue
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
          {/* Details */}
          <Text w="100%" lineHeight={"100%"} justifyContent="left">
            <Text noOfLines={1}>Edited on: {editedOnString}</Text>
            <Text noOfLines={1}>Last active on: {lastActiveDateString}</Text>
            <Text noOfLines={1}>Author: {props.tree.author ?? "N/A"}</Text>
          </Text>
          {/* Buttons */}
          <Flex w="100%" justifyContent="flex-end">
            {/* <ButtonGroup > */}
            <IconButton
              colorScheme="gray"
              aria-label="copy"
              size="lg"
              variant="ghost"
              onClick={onOpenClone}
              icon={<CopyIcon />}
            />
            <IconButton
              colorScheme="red"
              aria-label="delete"
              size="lg"
              variant={"ghost"}
              onClick={onOpenDelete}
              icon={<FaTrash />}
            />
            {/* </ButtonGroup> */}
          </Flex>
        </VStack>
        <>
          <Modal isOpen={isOpenClone} onClose={onCloseClone} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Center>
                  <Text fontSize="2xl" as="b">
                    Create a Copy
                  </Text>
                </Center>
              </ModalHeader>
              <ModalCloseButton />

              <Divider />
              <ModalBody>Do you want to create a copy of this tree?</ModalBody>

              <Divider />

              <ModalFooter>
                <Button
                  colorScheme="georgia-core-green"
                  variant="ghost"
                  mr={3}
                  onClick={onCloseClone}
                >
                  Close
                </Button>
                <Button
                  onClick={(e) => {
                    onCloseClone();
                    props.handleCloneClick(e);
                  }}
                  colorScheme="georgia-core-green"
                  variant="solid"
                >
                  Continue
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
        <>
          <Modal isOpen={isOpenDelete} onClose={onCloseDelete} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Center>
                  <Text fontSize="2xl" as="b">
                    Warning!
                  </Text>
                </Center>
              </ModalHeader>
              <ModalCloseButton />

              <Divider />
              <ModalBody>
                {props.tree.active ? (
                  <>
                    The active tree cant be deleted. Please make the tree
                    inactive before deleting.
                  </>
                ) : (
                  <>
                    Are you sure you want to <Text as="b">delete</Text> this
                    tree?
                  </>
                )}
              </ModalBody>

              <Divider />

              {!props.tree.active && (
                <ModalFooter>
                  <Button
                    colorScheme="georgia-core-green"
                    variant="ghost"
                    mr={3}
                    onClick={onCloseDelete}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={(e) => {
                      if (!props.tree.active) {
                        props.handleDeleteClick(e);
                      }
                    }}
                    colorScheme="georgia-core-green"
                    variant="solid"
                  >
                    Continue
                  </Button>
                </ModalFooter>
              )}
            </ModalContent>
          </Modal>
        </>
      </VStack>
    </Box>
  );
};

TreeThumbnailCard.propTypes = {
  tree: PropTypes.any,
  handleTitleEdit: PropTypes.any,
  handleCloneClick: PropTypes.any,
  handleDeleteClick: PropTypes.any,
  handeActiveSwitch: PropTypes.any,
};

export default TreeThumbnailCard;
