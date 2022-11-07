import React, { useState, useRef, useReducer, useEffect } from "react";
import { useSession } from "next-auth/react";

import { getAllQuestionTrees, updateQuestionTree, addQuestionTree, removeQuestionTreeById } from "src/actions/Tree";
import NavigationTree from "src/navigation/NavigationTree";
import { Text, Button, Divider, VStack, HStack, Box, Center, Heading, SimpleGrid, Flex, Wrap, WrapItem, InputLeftElement, Input, InputGroup, Spacer, extendTheme, ChakraProvider, filter } from "@chakra-ui/react";
import TreeThumbnailCard from "src/components/TreeThumbnailCard/TreeThumbnailCard";
import { FaSearch, FaPlus } from "react-icons/fa";
import { AddIcon, SearchIcon, EditIcon } from "@chakra-ui/icons";
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
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ sortByName, setSortByName ] = useState(0);
  const [ sortByDateCreated, setSortByDateCreated ] = useState(0);
  const [ sortByLastActive, setSortByLastActive ] = useState(0);
  const [ sortByAuthor, setSortByAuthor ] = useState(0);

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

  const handleCloneClick = async (e, id) => {
    const curTreeInd = trees.findIndex(tree => tree._id == id);
    const curTree = trees[curTreeInd];

    const newTree = {
      ...curTree,
      questions: curTree.questions.map(q => NavigationTree.copyQuestionSameEverything(q))
    };
    newTree.title += ' Copy';
    newTree.active = false;
    delete newTree._id;
    delete newTree.__v;

    await addQuestionTree(newTree, session.user?.name);
    await initializeTrees();
  };

  const handleTitleEdit = async (title, id) => {
    const curTreeInd = trees.findIndex(tree => tree._id == id);
    const curTree = trees[curTreeInd];

    const newTree = {
      ...curTree,
      title,
    };

    await updateQuestionTree(newTree, session.user?.name);
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

  const filteredInactiveTrees = inactiveTrees.filter(t => t.title.match(new RegExp(searchQuery, "i")));

  var sortedFilteredInactiveTrees;
  if (sortByName) {
    sortedFilteredInactiveTrees = [...filteredInactiveTrees].sort((a, b) => sortByName * ('' + a.title).localeCompare(b.title));
  } else if (sortByDateCreated) {
    sortedFilteredInactiveTrees = [...filteredInactiveTrees].sort((a, b) => sortByDateCreated * (a.editedOn - b.editedOn));
  } else if (sortByLastActive) {
    sortedFilteredInactiveTrees = [...filteredInactiveTrees].sort((a, b) => sortByLastActive * (a.lastActive - b.lastActive));
  } else if (sortByAuthor) {
    sortedFilteredInactiveTrees = [...filteredInactiveTrees].sort((a, b) => sortByAuthor * ('' + a.author).localeCompare(b.author));
  } else {
    sortedFilteredInactiveTrees = [...filteredInactiveTrees];
  }

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
                      handleCloneClick={e => handleCloneClick(e, tree._id)}
                      handleTitleEdit={title => handleTitleEdit(title, tree._id)}
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
                  <Input rounded='2xl' type='text' focusBorderColor='georgia-core-green.500' onChange={e => setSearchQuery(e.target.value)} />
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
              <Wrap spacing='20px'>
                <Text>Sort by:</Text>
                <Button onClick={e => {
                  setSortByName(sortByName == 0 ? 1 : -sortByName);
                  setSortByDateCreated(0);
                  setSortByLastActive(0);
                  setSortByAuthor(0);
                }} colorScheme='black' variant='link' textDecoration='underline' >Name</Button>
                <Button onClick={e => {
                  setSortByName(0);
                  setSortByDateCreated(sortByDateCreated == 0 ? 1 : -sortByDateCreated);
                  setSortByLastActive(0);
                  setSortByAuthor(0);
                }} colorScheme='black' variant='link' textDecoration='underline' >Date Created</Button>
                <Button onClick={e => {
                  setSortByName(0);
                  setSortByDateCreated(0);
                  setSortByLastActive(sortByLastActive == 0 ? 1 : -sortByLastActive);
                  setSortByAuthor(0);
                }} colorScheme='black' variant='link' textDecoration='underline' >Date Last Active</Button>
                <Button onClick={e => {
                  setSortByName(0);
                  setSortByDateCreated(0);
                  setSortByLastActive(0);
                  setSortByAuthor(sortByAuthor == 0 ? 1 : -sortByAuthor);
                }} colorScheme='black' variant='link' textDecoration='underline' >Author</Button>
              </Wrap>
            </Flex>
            <Box boxShadow='xs' w='100%' padding='30' rounded='2xl' bg='white'>
              <Wrap spacing='20px'>
                {sortedFilteredInactiveTrees.map(tree => 
                  <WrapItem key={tree._id}>
                    <TreeThumbnailCard
                      handeActiveSwitch={e => handeActiveSwitch(e, tree._id)}
                      tree={tree}
                      handleDeleteClick={e => handleDeleteClick(e, tree._id)}
                      handleCloneClick={e => handleCloneClick(e, tree._id)}
                      handleTitleEdit={title => handleTitleEdit(title, tree._id)}
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
