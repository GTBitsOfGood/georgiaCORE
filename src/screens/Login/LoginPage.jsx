import React from "react";
import {Box, Flex, Stack, Text, Image} from "@chakra-ui/react"

const LoginPage = () => {
  const [resSuccess, setResSuccess] = React.useState(false)
  return (
    <Flex 
      bg='#5b794e' 
      w='100%' 
      h='100%' 
      justifyContent="center" 
      alignItems="center" 
      margin="auto" 
      padding="0px"
    >
      
        <Box 
          bgColor="#ffffff" 
          width="50%" 
          height="60%"
          rounded="3xl"
        >
          <Stack 
            direction="column" 
            alignItems="center" 
            padding={28} 
            spacing={4}
          >
            <Box 
              fontWeight="bold" 
              fontSize="2xl" 
              fontFamily="sans-serif"
            >
              Sign In
            </Box>
            <Stack direction="column">
              <Box
                bgColor="#4285F4"
                color="white"
                fontFamily="sans-serif"
                padding={1.5}
                width="100%"
                rounded="md"
              >
                <Stack direction="row" spacing={4} paddingLeft={4}>
                  <Box
                    bgColor="#ffffff"
                    rounded="100%"
                    width="10%"
                  >
                    <Flex justifyContent="center" paddingTop={.5}>
                      <Image
                        boxSize="20px"
                        src="https://freesvg.org/img/1534129544.png"
                        alt="Google Image"
                      />
                    </Flex>
                  </Box>
                  <Text>
                    Continue with Google
                  </Text>
                </Stack>
              </Box>
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
  )
}

export default LoginPage;
