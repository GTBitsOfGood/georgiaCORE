import React, { useState, useRef, useReducer, useEffect } from "react";
import { useSession } from "next-auth/react";

import { getAllQuestionTrees, updateQuestionTree, addQuestionTree } from "src/actions/Tree";
import NavigationTree from "src/navigation/NavigationTree";
import { Text, Button, Divider, VStack, HStack, Box, Center, Heading, SimpleGrid, Flex, Wrap, WrapItem, InputLeftElement, Input, InputGroup, Spacer, extendTheme, ChakraProvider } from "@chakra-ui/react";
import TreeThumbnailCard from "src/components/TreeThumbnailCard/TreeThumbnailCard";
import { FaSearch, FaPlus } from "react-icons/fa";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { testTree } from "../NavigatorEditor/testQuestions";
import ErrorPage from "src/components/ErrorPage";

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


  useEffect(() => {
    async function initializeTrees() {
      var initTrees = await getAllQuestionTrees();
      if (initTrees.length == 0) {
        // temporary initial tree for debugging
        await addQuestionTree(testTree, session.user?.name);
        initTrees = await getAllQuestionTrees();
      }
      setTrees(initTrees);
    }
    initializeTrees();
  }, []);

  const activeTrees = trees.filter(tree => tree.active);
  const inactiveTrees = trees.filter(tree => !tree.active);

  const handeActiveSwitch = (e, id) => {
    const newActive = e.target.checked;
  
    if (newActive) {
      // set cur active to inactive
      if (activeTrees.length > 0) {
        const curActiveId = activeTrees[0]._id;
        const curActiveTreeInd = trees.findIndex(tree => tree._id == curActiveId);
        const newCurActiveTree = {...trees[curActiveTreeInd]};
        newCurActiveTree.active = false;
        trees[curActiveTreeInd] = newCurActiveTree;
        updateQuestionTree(newCurActiveTree, session.user?.name);
      }
    }
    const curTreeInd = trees.findIndex(tree => tree._id == id);
    const newCurTree = {...trees[curTreeInd]};
    newCurTree.active = newActive;
    trees[curTreeInd] = newCurTree;
    updateQuestionTree(newCurTree, session.user?.name);
    setTrees([...trees]);
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


  return (
    <ChakraProvider theme={theme}>
      {/* <Center> */}
      <Box boxShadow='xs' w='100%' padding='46.5' bg='#F8F8FA'>
        <VStack spacing='40px'>
          <VStack w='100%'>
            <Heading w='100%' as='h4' size='lg' justifyContent='left'>
              Currently Active:
            </Heading>
            <Box boxShadow='xs' w='100%' padding='30' rounded='2xl' bg='white'>
              <Wrap spacing='20px'>
                {activeTrees.map(tree => 
                  <WrapItem key={tree._id}><TreeThumbnailCard handeActiveSwitch={e => handeActiveSwitch(e, tree._id)} tree={tree}/></WrapItem>
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
              <Button leftIcon={<AddIcon />} colorScheme='georgia-core-green' variant='solid'>
                Create New Question List
              </Button>
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
                  <WrapItem key={tree._id}><TreeThumbnailCard handeActiveSwitch={e => handeActiveSwitch(e, tree._id)} tree={tree}/></WrapItem>
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
