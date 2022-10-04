import React from "react";
import {
  Flex,
  Stack,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import NavLink from "../NavLink";

const Header = () => {
  /**
   * Header UI
   * Creates a green navigation bar with with link contents based on authentication status
   * If authenticated, shows the following contents:
   *  Full width stack holding a stack of contents on the left and a stack of contents on the right
   *  Left stack contains logo image and stack of links
   *  Right stack contains user's profile image and profile menu
   *  Every link in the stack of links is a link to a page, and the Problem Tree holds a menu
   *  of other links that currently route to "/" (home).
   *  The Problem Tree link routes to the nav editor, the Realtime link routes to SSR and the Home link
   *  routes to home. Each link attempts to reveal an orange bar above it if it is currently active,
   *  but there are some bugs where clicking out of the link does not turn off the orange bar.
   *  The user's profile menu contains a link to sign out which signs the user out and redirects to the
   *  login page. The profile menu also attempts to reveal an orange bar above it when it is active,
   *  but there is the same bug here.
   * If not authenticated, shows the following contents:
   *  Logo, Home button, and Login button. Login button routes to login page
   * Currently, Logo is not the correct picture
   */ 
  const { data: session, status } = useSession();
  console.log(session);
  const [active1, setActive1] = React.useState(false);
  const [active2, setActive2] = React.useState(false);
  const [active3, setActive3] = React.useState(false);

  const createHoverEffect = (i) => {
    killAllHovers();

    if (i == 1) {
      setActive1(true);
    }

    if (i == 2) {
      setActive2(true);
    }
    
    if (i == 3) {
      setActive3(true);
    }

    if (i == 4) {
      setActiveProfile(true);
    }
  }

  const killAllHovers = () => {
    setActive1(false);
    setActive2(false);
    setActive3(false);
    setActiveProfile(false);
  }


  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeProfile, setActiveProfile] = React.useState(false);
  if (status === "authenticated") {
    return (
      <Flex  boxShadow='xl' bgColor="#59784D">
        <Stack direction="row" width="100%" justifyContent="space-between">
          <Stack direction="row"  justifyContent="space-between">
            <Flex bgColor="gray" margin="10px">
            <Image
                src="https://d15yi9gnq6oxdl.cloudfront.net/assets/images/GaCORE_Horizontal_RGB_White_NoOutline.png"
                alt="Logo"
                backgroundColor="lightgreen"
              />
            </Flex>
            <Stack direction="row" justifyContent="space-evenly" width="50%">
              <Stack>
                {active1 && <Flex bgColor="#F6893C" padding="2px"></Flex>}
                {!active1 && <Flex bgColor="#59784D" padding="2px"></Flex>}
                <Text
                  color="white"
                  fontFamily="sans-serif"
                  fontSize="20px"
                  paddingLeft="20px"
                  paddingRight="20px"
                  paddingTop="10px"
                  onClick={() => {
                    createHoverEffect(1);
                  }}
                  onMouseEnter={() => {
                    createHoverEffect(1);
                  }}
                  onMouseLeave={() => {
                    killAllHovers();
                  }}
                >
                  <NavLink backgroundColor="red" color="red" href="/">Home</NavLink>
                </Text>
              </Stack>
              <NavLink href="/navigation-editor">
                <Stack>
                  {active2 && <Flex bgColor="#F6893C" padding="2px"></Flex>}
                  {!active2 && <Flex bgColor="#59784D" padding="2px"></Flex>}
                  <Menu>
                    <MenuButton
                      as={Button}
                      color="white"
                      fontFamily="sans-serif"
                      fontSize="20px"
                      paddingLeft="20px"
                      paddingRight="20px"
                      paddingTop="10px"
                      onClick={() => {
                        createHoverEffect(2);
                      }}
                      onMouseEnter={() => {
                        createHoverEffect(2);
                        onOpen();
                      }}
                      onMouseLeave={() => {
                        killAllHovers
                      }}
                      _expanded={{ fontWeight: "bold" }}
                    >
                      Problem Tree
                    </MenuButton>
                    <MenuList>
                      <MenuItem color="white" fontFamily="sans-serif">
                        <Flex
                          bgColor="#59784D"
                          paddingLeft="55px"
                          paddingRight="55px"
                          paddingTop="30px"
                          width="100%"
                          justifyContent="center"
                        >
                          <NavLink href="/">Preview</NavLink>
                        </Flex>
                      </MenuItem>
                      <MenuItem color="white" fontFamily="sans-serif">
                        <Flex
                          bgColor="#59784D"
                          paddingTop="20px"
                          width="100%"
                          justifyContent="center"
                        >
                          <NavLink href="/">Edit</NavLink>
                        </Flex>
                      </MenuItem>
                      <MenuItem color="white" fontFamily="sans-serif">
                        <Flex
                          bgColor="#59784D"
                          paddingTop="20px"
                          paddingBottom="10px"
                          width="100%"
                          justifyContent="center"
                        >
                          <NavLink href="/">Instruction</NavLink>
                        </Flex>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Stack>
              </NavLink>
              <Stack>
                {active3 && <Flex bgColor="#F6893C" padding="2px"></Flex>}
                {!active3 && <Flex bgColor="#59784D" padding="2px"></Flex>}
                <Text
                  color="white"
                  fontFamily="sans-serif"
                  fontSize="20px"
                  paddingRight="20px"
                  paddingLeft="20px"
                  paddingTop="10px"
                  onClick={() => {
                    createHoverEffect(3);
                  }}
                  onMouseEnter={() => {
                    createHoverEffect(3);
                  }}
                  onMouseLeave={killAllHovers}

                >
                  <NavLink href="/ssr">Realtime</NavLink>
                </Text>
              </Stack>
            </Stack>
          </Stack>
          <Stack width="15%">
            {activeProfile && <Flex bgColor="#F6893C" padding="2px"></Flex>}
            {!activeProfile && <Flex bgColor="#59784D" padding="2px"></Flex>}
            <Stack
              direction="row"
              width="100%"
              justifyContent="flex-start"
              alignItems="center"
              paddingLeft="30px"
              paddingTop="10px"
            >
              <Image
                src={session.user.image}
                boxSize="32px"
                rounded="100%"
                alt="Logo"
              />
              <Menu>
                <MenuButton
                  color="white"
                  paddingRight="54px"
                  whiteSpace="nowrap"
                  onClick={() => {
                    createHoverEffect(4);
                  }}
                  onMouseEnter={() => createHoverEffect(4)}
                  onMouseLeave={killAllHovers}
                >
                  {session.user.name}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() =>
                      signOut({
                        callbackUrl: `${window.location.origin}/login`,
                      })
                    }
                  >
                    <Flex
                      bgColor="#59784D"
                      color="white"
                      paddingRight="100px"
                      paddingLeft="100px"
                      paddingTop="10px"
                      paddingBottom="10px"
                    >
                      Log out
                    </Flex>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    );
  }
  return (
    <Flex bgColor="#59784D">
      <Stack direction="row" width="100%" justifyContent="space-between">
        <Stack direction="row" width="40%" justifyContent="flex-start">
          <Flex bgColor="gray" margin="10px">
            <Image
              src="https://d15yi9gnq6oxdl.cloudfront.net/assets/images/GaCORE_Horizontal_RGB_White_NoOutline.png"
              alt="Logo"
            />
          </Flex>
          <Stack>
            {active1 && <Flex bgColor="#F6893C" padding="2px"></Flex>}
            {!active1 && <Flex bgColor="#59784D" padding="2px"></Flex>}
            <Text
              color="white"
              fontFamily="sans-serif"
              fontSize="20px"
              paddingLeft="20px"
              paddingRight="20px"
              paddingTop="10px"
              onClick={() => {
                setActive1(true);
                setActive2(false);
                setActive3(false);
                setActiveProfile(false);
              }}
            >
              <NavLink href="/">Home</NavLink>
            </Text>
          </Stack>
        </Stack>
        <Stack
          width="15%"
          alignItems="flex-end"
          paddingRight="30px"
          justifyContent="center"
        >
          <Text
            color="white"
            fontFamily="sans-serif"
            fontSize="20px"
            paddingLeft="20px"
            paddingRight="20px"
            paddingTop="10px"
            onClick={() => {
              setActive1(true);
              setActive2(false);
              setActive3(false);
              setActiveProfile(false);
            }}
          >
            <NavLink href="/login">Login</NavLink>
          </Text>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Header;
