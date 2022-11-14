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
  useDisclosure,
} from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
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
   *  The Problem Tree link routes to the nav editor, the Realtime link routes to the navigator, the Admin link
   *  routes to the admin page for authenticated users, and the Home link
   *  routes to home. Each link reveals an orange bar above it if it is currently active.
   *  The user's profile menu contains a link to sign out which signs the user out and redirects to the
   *  login page. The profile menu reveals an orange bar above it when it is hovered over.
   * If not authenticated, shows the following contents:
   *  Logo and Login button. Login button routes to login page.
   */
  const { data: session, status } = useSession();

  const [active1, setActive1] = React.useState(false);
  const [active2, setActive2] = React.useState(false);
  const [active3, setActive3] = React.useState(false);
  const [active4, setActive4] = React.useState(false);

  const router = useRouter();

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
      setActive4(true);
    }

    if (i == 5) {
      setActiveProfile(true);
    }
  };

  const killAllHovers = () => {
    setActive1(false);
    setActive2(false);
    setActive3(false);
    setActive4(false);
    setActiveProfile(false);
  };

  const { onOpen } = useDisclosure();
  const [activeProfile, setActiveProfile] = React.useState(false);
  if (status === "authenticated") {
    return (
      <Flex bgColor="#59784D" zIndex={100}>
        <Stack direction="row" width="100%" justifyContent="space-between">
          <Stack direction="row" justifyContent="space-between">
            <div style={styles} id={styles.logo} >
              <Flex bgColor="gray" margin="10px">
                <Image
                  src="/static/images/georgiacore_navbar_logo.png/"
                  alt="Logo"
                  backgroundColor="lightgreen"
                  height="60px"
                  
                  padding="0px"
                  marginTop="-5px"
                />
              </Flex>
            </div>
            <div style={styles} id={styles.container} >
              <Stack direction="row" justifyContent="space-evenly" width="50%">
                <NavLink href="/saved-trees">
                  <Stack>
                    {(router.pathname == "/saved-trees" || active1) && (
                      <Flex bgColor="#F6893C" padding="2px"></Flex>
                    )}
                    {!(router.pathname == "/saved-trees" || active1) && (
                      <Flex bgColor="#59784D" padding="2px"></Flex>
                    )}
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
                      <NavLink backgroundColor="red" color="red" href="/">
                        Home
                      </NavLink>
                    </Text>
                  </Stack>
                </NavLink>
                <Stack>
                  {(router.pathname == "/admin" || active4) && (
                    <Flex bgColor="#F6893C" padding="2px"></Flex>
                  )}
                  {!(router.pathname == "/admin" || active4) && (
                    <Flex bgColor="#59784D" padding="2px"></Flex>
                  )}
                  <Text
                    color="white"
                    fontFamily="sans-serif"
                    fontSize="20px"
                    paddingRight="20px"
                    paddingLeft="20px"
                    paddingTop="10px"
                    onClick={() => {
                      createHoverEffect(4);
                    }}
                    onMouseEnter={() => {
                      createHoverEffect(4);
                    }}
                    onMouseLeave={killAllHovers}
                  >
                    <NavLink href="/admin">Employees</NavLink>
                  </Text>
                </Stack>
              </Stack>
            </div>
          </Stack>
          <Stack width="15%">
            <Flex direction="row-reverse" width="100%">
              {activeProfile && (
                <Flex bgColor="#F6893C" padding="2px" width="220px"></Flex>
              )}
              {!activeProfile && (
                <Flex bgColor="#59784D" padding="2px" width="220px"></Flex>
              )}
            </Flex>
            <Flex
              flexDirection="row-reverse"
              width="100%"
              justifyContent="flex-start"
              alignItems="center"
              paddingTop="10px"
            >
              <Menu>
                <MenuButton
                  color="white"
                  paddingRight="54px"
                  whiteSpace="nowrap"
                  onClick={() => {
                    createHoverEffect(5);
                  }}
                  onMouseEnter={() => createHoverEffect(5)}
                  onMouseLeave={killAllHovers}
                >
                  <Flex
                    direction="row"
                    justifyContent={"center"}
                    alignItems="center"
                  >
                    <Image
                      src={session.user.image}
                      fallbackSrc="https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg"
                      boxSize="32px"
                      rounded="100%"
                      marginRight="15px"
                      alt="Logo"
                    />
                    
                    {session.user.name}
                  </Flex>
                </MenuButton>
                <MenuList
                >
                  <div style={styles} id={styles.menu} >
                    <NavLink href="/saved-trees">
                      <MenuItem
                        bgColor="#59784D"
                        color="white"
                        paddingRight="100px"
                        paddingLeft="100px"
                        paddingTop="10px"
                        paddingBottom="10px"
                      >
                        Home
                      </MenuItem>
                    </NavLink>
                  </div>
                  <div>
                    <NavLink href="/admin">
                      <MenuItem
                        bgColor="#59784D"
                        color="white"
                        paddingRight="100px"
                        paddingLeft="100px"
                        paddingTop="10px"
                        paddingBottom="10px"
                      >
                        Employees
                      </MenuItem>
                    </NavLink>
                  </div>
                  <MenuItem
                    onClick={() =>
                      signOut({
                        callbackUrl: `${window.location.origin}/login`,
                      })
                    }
                    bgColor="#59784D"
                    color="white"
                    paddingRight="100px"
                    paddingLeft="100px"
                    paddingTop="10px"
                    paddingBottom="10px"
                  >
                    Log out
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
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
              src="/static/images/georgiacore_navbar_logo.png/"
              alt="Logo"
              marginTop="-5px"
              height="60px"
            />
          </Flex>
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
            textDecoration="underline"
            onClick={() => {
              setActive1(true);
              setActive2(false);
              setActive3(false);
              setActive4(false);
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
