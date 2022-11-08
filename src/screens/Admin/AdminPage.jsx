import React from "react";
import { Flex, Stack, Text, Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import {
  getAuthUsers,
  deleteAuthUser,
  insertAuthUser,
} from "src/actions/AuthUser";
import AuthUserTable from "src/components/AuthUserTable/AuthUserTable";
import AuthUserModal from "src/components/AuthUserTable/AuthUserModal";
import ErrorPage from "src/components/ErrorPage";

/**
 * Admin page UI displaying authUsers
 * Checks if current user has an Administrator role and displays page in that case,
 *  if they do not have the role, page displays error page with message that
 *  user cannot access page.
 * Displays blank page while page is loading
 * Displays error page if user is not logged in
 * NumberArray calculates the buttons to be able to visualize authUsers on different pages
 *  with a max of 7 users per page
 * CalculateDisplay loads the new users and handles the functions to display the data on the page:
 *  this occurs to visualize sorting the data when a sort is clicked or to visualize adding/deleting/editing a user.
 * IsActive helps to check which page is currently active in order to display the correct data
 * Sorting is available to sort by email alphabetically or reverse alphabetically or to sort with all
 *  Administrators first or all Staff first
 * Page displays an Employees title with an add button and a table of the authUsers with edit, sort, and delete functions and
 *  page also displays buttons at the bottom to switch between pages of data
 * Buttons should immediately display data changes, but will display data changes on refresh if not
 * Sort buttons sort based on the opposite of whatever the last requested sort was:
 *  Example is if you sort by alphabetical email and then sort by role where the last role sort was Staff first,
 *  the new role sort will be Administrator first. Consecutive role sorts will switch between Staff and Administrator.
 *  If you sort by email and the last email sort was alphabetical, then the email sort will be reverse. Consecutive email sorts
 *  will switch between alphabetical and reverse. This means the sorts are functional but may not be intuitive when switching
 *  between sorting by role and email.
 */

const AdminPage = () => {
  const [authUsers, setAuthUsers] = React.useState([]);
  const [numArray, setNumArray] = React.useState([]);
  const [authUsersDisplay, setAuthUsersDisplay] = React.useState([]);
  const [isActive, setIsActive] = React.useState(0);
  const [authUsersDisplayData, setAuthUsersDisplayData] = React.useState([]);
  const [rolesSorted, setRolesSorted] = React.useState(false);
  const [emailsSorted, setEmailsSorted] = React.useState(false);
  const [isEmailSort, setIsEmailSort] = React.useState(true);
  const [isRolesSort, setIsRolesSort] = React.useState(false);
  const [authUserRole, setAuthUserRole] = React.useState("");
  const { data: session, status } = useSession();

  React.useEffect(() => {
    async function setAllAuthUserEmails() {
      let newAuthUsers = [];
      let newAuthUsersData = await getAuthUsers();
      newAuthUsers.push(newAuthUsersData);

      setAuthUsers(newAuthUsers);
      if (newAuthUsers[0] && session) {
        for (let i = 0; i < Object.values(newAuthUsers[0]).length; i++) {
          if (newAuthUsers[0][i].email == session.user.email) {
            setAuthUserRole(newAuthUsers[0][i].role);
          }
        }
        calculateDisplay();
      }
    }

    setAllAuthUserEmails().catch((e) => {
      throw new Error("Invalid token!" + e);
    });
  }, [session]);

  React.useEffect(() => {
    async function setNumberArray(authUsers) {
      let tempNumArray = [];
      if (authUsers[0]) {
        for (let i = 0; i < Object.values(authUsers[0]).length / 7; i++) {
          tempNumArray.push(i);
        }
      }
      setNumArray(tempNumArray);
    }

    setNumberArray(authUsers).catch((e) => {
      throw new Error("Invalid token!" + e);
    });
  }, [authUsers]);

  async function calculateDisplay() {
    let newAuthUsers = [];
    let newAuthUsersData = await getAuthUsers();
    if (newAuthUsersData[0] && isEmailSort == true) {
      newAuthUsersData = await doEmailSort(newAuthUsersData, emailsSorted);
    } else if (newAuthUsersData[0] && isRolesSort == true) {
      newAuthUsersData = await doRoleSort(newAuthUsersData, rolesSorted);
    }
    newAuthUsers.push(newAuthUsersData);

    setAuthUsers(newAuthUsers);
    let tempCalcArray = [];
    if (newAuthUsers[0]) {
      if (Object.values(newAuthUsers[0]).length >= isActive * 7 + 7) {
        tempCalcArray = Object.values(newAuthUsers[0]).slice(
          isActive * 7,
          isActive * 7 + 7
        );
      } else if (Object.values(newAuthUsers[0]).length < isActive * 7 + 7) {
        tempCalcArray = Object.values(newAuthUsers[0]).slice(
          isActive * 7,
          Object.values(newAuthUsers[0]).length
        );
      }
      setAuthUsersDisplay(tempCalcArray);
    }
  }

  React.useEffect(() => {
    async function setDisplay() {
      setAuthUsersDisplayData(authUsersDisplay);
    }

    setDisplay(authUsersDisplay).catch((e) => {
      throw new Error("Invalid token!" + e);
    });
  }, [authUsersDisplay]);

  React.useEffect(() => {
    async function calcDisplayButtons() {
      calculateDisplay();
    }

    calcDisplayButtons().catch((e) => {
      throw new Error("Invalid token!" + e);
    });
  }, [isActive]);

  async function doEmailSort(users, emailSorted) {
    if (users != undefined) {
      if (emailSorted == false) {
        let tempUsersArray = [];
        let emails = [];
        let sortedEmails = [];
        for (let i = 0; i < Object.values(users).length; i++) {
          emails.push(users[i].email);
        }
        sortedEmails = emails.sort();
        for (let i = 0; i < sortedEmails.length; i++) {
          for (let j = 0; j < Object.values(users).length; j++) {
            if (users[j].email == sortedEmails[i]) {
              tempUsersArray.push(users[j]);
            }
          }
        }
        return tempUsersArray;
      } else if (emailSorted == true) {
        let tempUsersArray = [];
        let emails = [];
        let sortedEmails = [];
        for (let i = 0; i < Object.values(users).length; i++) {
          emails.push(users[i].email);
        }
        sortedEmails = emails.sort();
        sortedEmails = sortedEmails.reverse();
        for (let i = 0; i < sortedEmails.length; i++) {
          for (let j = 0; j < Object.values(users).length; j++) {
            if (users[j].email == sortedEmails[i]) {
              tempUsersArray.push(users[j]);
            }
          }
        }
        return tempUsersArray;
      }
    } else {
      return users;
    }
  }

  async function doRoleSort(users, roleSorted) {
    if (users != undefined) {
      if (roleSorted == false) {
        let tempUsersArray = [];
        for (let i = 0; i < Object.values(users).length; i++) {
          if (users[i].role == "Administrator") {
            tempUsersArray.push(users[i]);
          }
        }
        for (let i = 0; i < Object.values(users).length; i++) {
          if (users[i].role == "Staff") {
            tempUsersArray.push(users[i]);
          }
        }
        for (let i = 0; i < tempUsersArray.length; i++) {
          deleteAuthUser({ email: tempUsersArray[i].email });
        }
        for (let i = 0; i < tempUsersArray.length; i++) {
          insertAuthUser({
            email: tempUsersArray[i].email,
            role: tempUsersArray[i].role,
          });
        }
        return tempUsersArray;
      } else if (roleSorted == true) {
        let tempUsersArray = [];
        for (let i = 0; i < Object.values(users).length; i++) {
          if (users[i].role == "Staff") {
            tempUsersArray.push(users[i]);
          }
        }
        for (let i = 0; i < Object.values(users).length; i++) {
          if (users[i].role == "Administrator") {
            tempUsersArray.push(users[i]);
          }
        }
        for (let i = 0; i < tempUsersArray.length; i++) {
          deleteAuthUser({ email: tempUsersArray[i].email });
        }
        for (let i = 0; i < tempUsersArray.length; i++) {
          insertAuthUser({
            email: tempUsersArray[i].email,
            role: tempUsersArray[i].role,
          });
        }
        return tempUsersArray;
      }
    } else {
      return users;
    }
  }
  async function roleSort() {
    setRolesSorted(!rolesSorted);
  }

  React.useEffect(() => {
    async function handleRolesSort() {
      setRoleSort();
      calculateDisplay();
    }

    handleRolesSort().catch((e) => {
      throw new Error("Invalid token!" + e);
    });
  }, [rolesSorted]);

  async function setRoleSort() {
    await stopEmailSort();
    await startRolesSort();
  }

  async function emailSort() {
    setEmailsSorted(!emailsSorted);
  }

  React.useEffect(() => {
    async function handleEmailSort() {
      setEmailSort();
      calculateDisplay();
    }

    handleEmailSort().catch((e) => {
      throw new Error("Invalid token!" + e);
    });
  }, [emailsSorted]);

  React.useEffect(() => {
    async function displayEmailSort() {
      calculateDisplay();
    }

    displayEmailSort().catch((e) => {
      throw new Error("Invalid token!" + e);
    });
  }, [isEmailSort]);

  React.useEffect(() => {
    async function displayRoleSort() {
      calculateDisplay();
    }

    displayRoleSort().catch((e) => {
      throw new Error("Invalid token!" + e);
    });
  }, [isRolesSort]);

  async function setEmailSort() {
    await stopRolesSort();
    await startEmailSort();
  }

  async function stopEmailSort() {
    setIsEmailSort(false);
  }

  async function stopRolesSort() {
    setIsRolesSort(false);
  }

  async function startEmailSort() {
    setIsEmailSort(true);
  }

  async function startRolesSort() {
    setIsRolesSort(true);
  }

  if (status === "loading") {
    return <></>;
  }

  if (status == "unauthenticated") {
    return (
      <>
        <ErrorPage message="User is not Logged In" />
      </>
    );
  }

  if (status === "authenticated") {
    if (authUserRole == "Administrator") {
      return (
        <Flex
          height="100%"
          width="100%"
          justifyContent="center"
          bgColor="#f5f5f5"
        >
          <Stack direction="column" width="75%" margin={50}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontFamily="initial" fontSize="4xl" letterSpacing="tight">
                Employees
              </Text>
              <AuthUserModal
                btnName="Confirm"
                modalTitle="Add an Employee"
                action="insertAuthUser"
                currentEmail="Email"
                calculate={calculateDisplay}
              ></AuthUserModal>
            </Stack>
            <Flex
              minH="400px"
              marginTop={10}
              padding={5}
              border="1px solid #E2E8F0"
              borderRadius={10}
              backgroundColor="white"
              flexShrink={0}
              flexGrow={1}
              justifyContent="center"
              alignItems="stretch"
            >
              <Stack
                direction="column"
                width="100%"
                justifyContent="space-between"
              >
                <AuthUserTable
                  authUsers={authUsersDisplayData}
                  roleSort={roleSort}
                  emailSort={emailSort}
                  calculate={calculateDisplay}
                ></AuthUserTable>
                {authUsers != null &&
                  authUsers[0] != null &&
                  Object.values(authUsers[0]).length > 0 && (
                    <Stack direction="row" justifyContent="center">
                      <Stack direction="row" wrap="wrap">
                        <Button
                          bgColor="white"
                          fontFamily="serif"
                          fontWeight="normal"
                          fontSize={20}
                          onClick={() => {
                            if (isActive > 0) {
                              setIsActive(isActive - 1);
                            }
                          }}
                        >
                          Previous
                        </Button>
                        {numArray.map((idx, num) => (
                          <Button
                            key={idx}
                            bgColor="white"
                            fontFamily="body"
                            fontWeight={isActive == num ? "bold" : "normal"}
                            onClick={() => {
                              setIsActive(num);
                            }}
                          >
                            {num + 1}
                          </Button>
                        ))}
                        <Button
                          bgColor="white"
                          fontFamily="serif"
                          fontWeight="normal"
                          fontSize={20}
                          onClick={() => {
                            if (isActive < numArray.length - 1) {
                              setIsActive(isActive + 1);
                            }
                          }}
                        >
                          Next
                        </Button>
                      </Stack>
                    </Stack>
                  )}
              </Stack>
            </Flex>
          </Stack>
        </Flex>
      );
    } else if (authUserRole == "Staff") {
      return (
        <>
          <ErrorPage message="User Cannot Access this Page" />
        </>
      );
    }
  }
  return <></>;
};

export default AdminPage;
