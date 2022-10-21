import React from "react";
import { Flex,Text } from "@chakra-ui/react";

const ErrorPage = ({message}) => {
    return (
        <>
            <Flex
                width="100%"
                height="100%"
                justifyContent="center"
                alignItems="center"
            >
                <Text color="black">{message}</Text>
                
            </Flex>
        </>
        
    )
};

export default ErrorPage;