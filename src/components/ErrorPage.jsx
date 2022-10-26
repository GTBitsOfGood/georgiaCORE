import React from "react";
import { Flex, Text } from "@chakra-ui/react";

/**
 * Simple error page to display the given message
 * Currently used to display that a user is not logged in or does not have access to a page
 */

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
    );
};

export default ErrorPage;