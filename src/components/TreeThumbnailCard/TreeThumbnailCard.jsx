/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styles from "./TreeThumbnailCard.module.css";
import PropTypes from "prop-types";
import { IconButton, Box, VStack, Divider, Button, InputLeftElement, Input, InputGroup, HStack, Heading, Image, Text, Flex, Switch, extendTheme, ChakraProvider, Center, Spacer, ButtonGroup } from "@chakra-ui/react";
import { FaTrash, FaRegClone } from "react-icons/fa";
import { CopyIcon } from "@chakra-ui/icons";
import { useRouter } from 'next/router'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useModalContext,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'

const TreeThumbnailCard = (props) => {
  let router = useRouter();

  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const { isOpen: isOpenActive, onOpen: onOpenActive, onClose: onCloseActive } = useDisclosure();

  const [ futureActive, setFutureActive ] = useState(props.tree.active);

  const editedOnString = props.tree.editedOn ? 
    `${props.tree.editedOn.toLocaleTimeString()}, ${props.tree.editedOn.toLocaleDateString().replaceAll('/', '-')}` :
    'N/A';
  const lastActiveDateString = props.tree.active ? 
    'Currently' :
    (props.tree.lastActive?.toLocaleDateString().replaceAll('/', '-') ?? 'N/A');
  return (
    <Box 
      boxShadow='xs' 
      border='1px' 
      borderColor='gray' 
      w={372} 
      h={405} 
      padding='29.5' 
      rounded='2xl' 
      bg='#E0E2DA'
    >
      <VStack>
        {/* Thumbnail */}
        <Image
          src={'/static/images/georgiacore_navbar_logo.png'}
          alt={'tree-preview'}
          borderRadius='20px'
        />

        {/* Info */}
        <VStack w='100%'>
          {/* Header */}
          <Flex flexDirection='row' w='100%' justifyContent='space-between'>
            {/* Title */}
            <Heading 
              as='h4' 
              size='lg' 
              onClick={() => router.push('/navigation-editor?id=' + props.tree._id)} 
              cursor="pointer"
              >
              {props.tree.title ?? 'N/A'}
            </Heading>
            
            {/* Active */}
            <HStack spacing='5px' p='5px' h='100%'>
              <Text>
                Active
              </Text>
              <Switch
                onChange={(e) => {
                  setFutureActive(e.target.checked);
                  onOpenActive();
                }}
                isChecked={props.tree.active}
                id='active-button'
                colorScheme='georgia-core-green'
              />
            </HStack>
          </Flex>
          <>
          <Modal isOpen={isOpenActive} onClose={onCloseActive} isCentered>
            <ModalOverlay />
            <ModalContent>
              <Center><ModalHeader><Text fontSize='2xl' as='b'>Warning!</Text></ModalHeader></Center>
              <ModalCloseButton />

              <Divider />
              <ModalBody>
                {futureActive ? (
                  <>This tree will replace the one that is currently active. Are you sure you want to continue?</>
                ) : (
                  <>This tree will be deactivated, causing there to be no active tree. Are you sure you want to continue?</>
                )}
              </ModalBody>

              <Divider />
              
              <ModalFooter>
                <Button
                  colorScheme='georgia-core-green'
                  variant='ghost' mr={3}
                  onClick={(e) => {
                    setFutureActive(props.tree.active);
                    onCloseActive();
                  }}
                >
                  Close
                </Button>
                <Button
                  onClick={(e) => props.handeActiveSwitch(futureActive)}
                  colorScheme='georgia-core-green'
                  variant='solid'
                >
                  Continue
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
          {/* Details */}
          <Text w='100%' lineHeight={'100%'} justifyContent='left'>
            Edited on: {editedOnString}<br />
            Last active on: {lastActiveDateString}<br />
            Author: {props.tree.author ?? 'N/A'}
          </Text>
          {/* Buttons */}
          <Flex w='100%' justifyContent='flex-end'>
            <ButtonGroup >
              <IconButton
                colorScheme='blue'
                aria-label='copy'
                size='sm'
                icon={<CopyIcon />}
              />
              <IconButton
                colorScheme='red'
                aria-label='delete'
                size='sm'
                onClick={onOpenDelete}
                icon={<FaTrash />}
              />
            </ButtonGroup>
          </Flex>
        </VStack>
        <>
          <Modal isOpen={isOpenDelete} onClose={onCloseDelete} isCentered>
            <ModalOverlay />
            <ModalContent>
              <Center><ModalHeader><Text fontSize='2xl' as='b'>Warning!</Text></ModalHeader></Center>
              <ModalCloseButton />

              <Divider />
              <ModalBody>
                {props.tree.active ? (
                  <>The active tree cant be deleted. Please make the tree inactive before deleting.</>
                ) : (
                  <>Are you sure you want to <Text as='b'>delete</Text> this tree?</>
                )}
              </ModalBody>

              <Divider />
              
              {!props.tree.active && (
              <ModalFooter>
                <Button colorScheme='georgia-core-green' variant='ghost' mr={3} onClick={onCloseDelete}>
                  Close
                </Button>
                <Button onClick={(e) => {
                  if (!props.tree.active) {
                    props.handleDeleteClick(e);
                  }
                  }}
                  colorScheme='georgia-core-green'
                  variant='solid'
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

export default TreeThumbnailCard;
