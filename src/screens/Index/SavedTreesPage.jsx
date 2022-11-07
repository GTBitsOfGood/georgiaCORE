import React, { useState, useRef, useReducer, useEffect } from "react";
import { useSession } from "next-auth/react";

import { getAllQuestionTrees, updateQuestionTree, addQuestionTree, removeQuestionTreeById } from "src/actions/Tree";
import NavigationTree from "src/navigation/NavigationTree";
import { Text, Button, Divider, VStack, HStack, Box, Center, Heading, SimpleGrid, Flex, Wrap, WrapItem, InputLeftElement, Input, InputGroup, Spacer, extendTheme, ChakraProvider } from "@chakra-ui/react";
import TreeThumbnailCard from "src/components/TreeThumbnailCard/TreeThumbnailCard";
import { FaSearch, FaPlus } from "react-icons/fa";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { testTree } from "../NavigatorEditor/testQuestions";
import ErrorPage from "src/components/ErrorPage";
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

const theme = extendTheme({
  colors: {
    'georgia-core-green': {
      50: '#edf7e8',
      100: '#d3e2cd',
      200: '#b8cdb0',
      300: '#9db992',
      400: '#82a574',
      500: '#698c5b',
      600: '#516d46',
      700: '#394e31',
      800: '#212f1c',
      900: '#071201',
    }
  }
});

const SavedTreesPage = () => {
  const [trees, setTrees] = useState([]);

  const { data: session, status } = useSession();

  const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure();

  const [title, setTitle] = useState('');

  async function initializeTrees() {
    var initTrees = await getAllQuestionTrees();
    if (initTrees.length == 0) {
      // temporary initial tree for debugging
      if (session && session.user && session.user.name) {
        await addQuestionTree(testTree, session.user?.name);
      }
      else {
        await addQuestionTree(testTree, "Anonymous");
      }

      initTrees = await getAllQuestionTrees();
    }
    setTrees(initTrees);
  }

  useEffect(() => {
    initializeTrees();
  }, []);

  const activeTrees = trees.filter(tree => tree.active);
  const inactiveTrees = trees.filter(tree => !tree.active);

  const handeActiveSwitch = async (newActive, id) => {
    if (newActive) {
      // set cur active to inactive
      if (activeTrees.length > 0) {
        const curActiveId = activeTrees[0]._id;
        const curActiveTreeInd = trees.findIndex(tree => tree._id == curActiveId);
        const newCurActiveTree = {...trees[curActiveTreeInd]};
        newCurActiveTree.active = false;
        trees[curActiveTreeInd] = newCurActiveTree;
        await updateQuestionTree(newCurActiveTree, session.user?.name);
      }
    }
    const curTreeInd = trees.findIndex(tree => tree._id == id);
    const newCurTree = {...trees[curTreeInd]};
    newCurTree.active = newActive;
    trees[curTreeInd] = newCurTree;
    await updateQuestionTree(newCurTree, session.user?.name)
    await initializeTrees();
  };

  const handleDeleteClick = async (e, id) => {
    const curTreeInd = trees.findIndex(tree => tree._id == id);
    const curTree = trees[curTreeInd];
    if (curTree.active) {
      return;
    }
    
    await removeQuestionTreeById(id);
    await initializeTrees();
  };

  if (status === "loading") {
    return <></>;
  } 

  if (status == "unauthenticated") {
    return (
      <>
        <ErrorPage message="User is not logged in." />
      </>
    );
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onTitleClick = async () => {
    if (title.trim() == '') {
      return;
    }

    const basicTree = {
      active: false,
      title: title,
      thumbnailImage: null,
      questions: [
        NavigationTree.createInitialQuestion()
      ],
    };

    await addQuestionTree(basicTree, session.user?.name);
    await initializeTrees();
    onCloseCreate();
    setTitle('');
  };

  return (
    <ChakraProvider theme={theme}>
      {/* <Center> */}
      <Box boxShadow='xs' w='100%' padding='46.5' bg='#F8F8FA' >
        <VStack spacing='40px'>
          <VStack w='100%'>
            <Heading w='100%' as='h4' size='lg' justifyContent='left'>
              Currently Active:
            </Heading>
            <Box boxShadow='xs' w='100%' padding='30' rounded='2xl' bg='white'>
              <Wrap spacing='20px'>
                {activeTrees.map(tree => 
                  <WrapItem key={tree._id}>
                    <TreeThumbnailCard 
                      handeActiveSwitch={e => handeActiveSwitch(e, tree._id)} 
                      tree={tree}
                      onClick={() => router.push('/about')}
                      handleDeleteClick={e => handleDeleteClick(e, tree._id)}
                    />
                  </WrapItem>
                )}
              </Wrap>
            </Box>
          </VStack>

          <Divider borderColor='black' />

          <VStack w='100%'>
            <Heading w='100%' as='h4' size='lg' justifyContent='left'>
              Inactive Trees:
            </Heading>
            <Flex w='100%'>
              <HStack w='50%'>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray' />}
                  />
                  <Input rounded='2xl' type='text' focusBorderColor='georgia-core-green.500' />
                </InputGroup>
                <Button colorScheme='georgia-core-green' variant='solid'>
                  Search
                </Button>
              </HStack>
              <Spacer />
              <Button onClick={onOpenCreate} leftIcon={<AddIcon />} colorScheme='georgia-core-green' variant='solid'>
                Create New Question List
              </Button>
              <>
                <Modal isOpen={isOpenCreate} onClose={onCloseCreate} isCentered>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Create New Question List</ModalHeader>
                    <ModalCloseButton />

                    <Divider />
                    <ModalBody>
                    <FormControl isRequired>
                      <FormLabel>Question List Title</FormLabel>
                      <Input placeholder='Title' type='text' onChange={handleTitleChange} />
                    </FormControl>
                    </ModalBody>
                    <Divider />

                    <ModalFooter>
                      <Button colorScheme='georgia-core-green' variant='ghost' mr={3} onClick={onCloseCreate}>
                        Close
                      </Button>
                      <Button onClick={onTitleClick} colorScheme='georgia-core-green' variant='solid'>Create</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </>
            </Flex>
            <Flex w='100%'>
              <Flex w='35%' justifyContent='space-between'>
                <Text>Sort by:</Text>
                <Button colorScheme='black' variant='link' textDecoration='underline' >Name</Button>
                <Button colorScheme='black' variant='link' textDecoration='underline' >Date Created</Button>
                <Button colorScheme='black' variant='link' textDecoration='underline' >Date Last Active</Button>
                <Button colorScheme='black' variant='link' textDecoration='underline' >Author</Button>
              </Flex>
            </Flex>
            <Box boxShadow='xs' w='100%' padding='30' rounded='2xl' bg='white'>
              <Wrap spacing='20px'>
                {inactiveTrees.map(tree => 
                  <WrapItem key={tree._id}>
                    <TreeThumbnailCard
                      handeActiveSwitch={e => handeActiveSwitch(e, tree._id)}
                      tree={tree}
                      handleDeleteClick={e => handleDeleteClick(e, tree._id)}
                    />
                  </WrapItem>
                )}
              </Wrap>
            </Box>
          </VStack>
        </VStack>
      </Box>
      {/* </Center> */}
    </ChakraProvider>
  );
};

export default SavedTreesPage;
