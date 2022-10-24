/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./TreeThumbnailCard.module.css";
import PropTypes from "prop-types";
import { IconButton, Box, VStack, HStack, Heading, Image, Text, Flex, Switch, extendTheme, ChakraProvider, Center, Spacer, ButtonGroup } from "@chakra-ui/react";
import { FaTrash, FaRegClone } from "react-icons/fa";
import { CopyIcon } from "@chakra-ui/icons";

const TreeThumbnailCard = (props) => {
  return (
      <Center> {/*Temp*/}
      <Box boxShadow='xs' border='1px' borderColor='gray' w={372} h={405} padding='29.5' rounded='2xl' bg='#E0E2DA'>
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
              <Heading as='h4' size='lg'>
                Trees are not fun at all todo
              </Heading>
              
              {/* Active */}
              <HStack spacing='5px' p='5px' h='100%'>
                <Text>
                  Active
                </Text>
                <Switch id='active-button' colorScheme='georgia-core-green' />
              </HStack>
            </Flex>
            {/* Details */}
            <Text w='100%' lineHeight={'100%'} justifyContent='left'>
              Edited on: {'todo'}<br />
              Last active on: {'todo'}<br />
              Author: {'todo'}
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
                  icon={<FaTrash />}
                />
              </ButtonGroup>
            </Flex>
          </VStack>
        </VStack>
      </Box>
      </Center>
  );
};

export default TreeThumbnailCard;
