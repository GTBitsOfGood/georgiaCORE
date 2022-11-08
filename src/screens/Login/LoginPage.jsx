import React from "react";
import {
  Box,
  Flex,
  Stack,
  Text,
  Image,
  Button,
  Center,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import PropTypes from "prop-types";

const LoginPage = ({ providers }) => {
  const [resSuccess, setResSuccess] = React.useState(true);
  const [isLoading, setLoading] = React.useState(false);
  /**
   * Login page UI
   * Creates a main green background with a white box in the middle
   * Then creates a stack to hold "Sign In", login button stack, and logo
   * Login button stack holds login button and authentication success/error message
   * Login button is a blue box with button contents inside as a stack: Google icon and login message
   * Authentication message appears as an error in red if login success fails and does not appear otherwise
   * Success/failure is determined by resSuccess state which is currently set to false (success failed)
   * ResSuccess will be updated later with login functionality
   * Logo is at the bottom of the stack for the white box
   * Authentication button has hover and button loader which activates on click, but has a bug where it is
   * transparent on hover after click
   */
  return (
    <Flex
      bg="#5b794e"
      w="100%"
      h="100%"
      justifyContent="center"
      alignItems="center"
      margin="auto"
      padding="0px"
    >
      <Box bgColor="#ffffff" width="50%" height="60%" rounded="3xl">
        <Stack direction="column" alignItems="center" padding={28} spacing={4}>
          <Box fontWeight="bold" fontSize="3xl" fontFamily="sans-serif">
            Sign In
          </Box>
          <Stack direction="column">
            <>
              {Object.values(providers).map((provider) => (
                <Box
                  as={Button}
                  bgColor="#4285F4"
                  color="white"
                  fontFamily="sans-serif"
                  padding={1.5}
                  width="100%"
                  rounded="md"
                  onClick={() => {
                    signIn(provider.id, {
                      callbackUrl: `${window.location.origin}`,
                    });
                    setLoading(true);
                  }}
                  cursor="pointer"
                  key={provider.id}
                  isLoading={isLoading}
                  _hover={{ bgColor: "#8fafe3" }}
                >
                  <Stack
                    direction="row"
                    spacing={4}
                    paddingLeft={4}
                    paddingRight={4}
                  >
                    <Box bgColor="#ffffff" rounded="100%" width="%">
                      <Flex justifyContent="center" padding={0.5}>
                        <Image
                          src="https://freesvg.org/img/1534129544.png"
                          alt="Google Image"
                          borderRadius="100%"
                          height="20px"
                        />
                      </Flex>
                    </Box>
                    <Center> Continue with {provider.name}</Center>
                  </Stack>
                </Box>
              ))}
            </>
            {!resSuccess && (
              <Text fontFamily="sans-serif" color="red">
                *Authentication failed. Please try again.
              </Text>
            )}
          </Stack>
          <Flex justifyContent="center" padding={20}>
            <Image
              boxSize="40%"
              src="https://d15yi9gnq6oxdl.cloudfront.net/assets/images/gacore-logo-2020-md.png"
              alt="Logo"
            />
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
};

LoginPage.propTypes = {
  providers: PropTypes.any,
};

export default LoginPage;
