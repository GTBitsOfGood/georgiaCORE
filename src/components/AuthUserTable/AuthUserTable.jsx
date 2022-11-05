/* eslint-disable react/prop-types */
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { ArrowUpDownIcon } from "@chakra-ui/icons";
import AuthUserModal from "./AuthUserModal";
import AuthUsersDeleteAlert from "./AuthUserDeleteAlert";
import React, { useEffect } from "react";
import { useState } from "react";

/**
 * AuthUser table
 * Table containing and displaying all authUsers in database
 * Table header contains Email Address and Role with sort buttons
 * Table row contains email, role, edit button, and delete button
 * Table body of authUsers is only displayed if there are any authUsers
 */

export const NUM_ENTRIES_PER_PAGE = 7;

const emailSort = (forwards, authUsers) => {
  const forwardsFunc = (user1, user2) => (user1.email > user2.email ? 1 : -1);
  const backwardsFunc = (user1, user2) => (user1.email < user2.email ? 1 : -1);
  authUsers.sort(forwards ? forwardsFunc : backwardsFunc);
  return authUsers;
};

const roleSort = (forwards, authUsers) => {
  const forwardsFunc = (user1, user2) =>
    user1.role === "Administrator" ? 1 : -1;
  const backwardsFunc = (user1, user2) => (user1.role === "Staff" ? 1 : -1);
  authUsers.sort(forwards ? forwardsFunc : backwardsFunc);
  return authUsers;
};

const AuthUserTable = ({ authUsers, activePage, calculate }) => {
  const [sortedAuthUsers, setSortedAuthUsers] = useState(authUsers);
  const [currentSortStrategy, setCurrentSortStrategy] = useState({
    method: "unsorted", // "role" , "email",
    direction: "forwards", // "backwards"
  });
  const [authUsersToShow, setAuthUsersToShow] = useState();

  const updateSortStrategy = (method) => {
    const newSortStrategy = {
      method: "unsorted",
      direction: "forwards",
    };

    if (method === "role") {
      newSortStrategy.method = "role";
      if (currentSortStrategy.method === "role") {
        newSortStrategy.direction =
          currentSortStrategy.direction === "forwards"
            ? "backwards"
            : "forwards";
      } else {
        newSortStrategy.direction = "forwards";
      }
    } else if (method === "email") {
      newSortStrategy.method = "email";
      if (currentSortStrategy.method === "email") {
        newSortStrategy.direction =
          currentSortStrategy.direction === "forwards"
            ? "backwards"
            : "forwards";
      } else {
        newSortStrategy.direction = "forwards";
      }
    }

    setCurrentSortStrategy(newSortStrategy);
  };

  useEffect(() => {
    let currentPageIndexToStopAt = activePage * NUM_ENTRIES_PER_PAGE - 1;
    let currentPageIndexToStartAt =
      currentPageIndexToStopAt - NUM_ENTRIES_PER_PAGE;

    if (
      currentPageIndexToStartAt >=
      sortedAuthUsers.length - NUM_ENTRIES_PER_PAGE
    ) {
      console.error("ERROR: PAGE IS INVALID");
      currentPageIndexToStartAt = 0;
      currentPageIndexToStopAt = NUM_ENTRIES_PER_PAGE - 1;
    }

    const calculatedAuthUsersToShow = [];
    for (
      let i = currentPageIndexToStartAt;
      i <= currentPageIndexToStopAt;
      i++
    ) {
      if (i > sortedAuthUsers.length) break;
      calculatedAuthUsersToShow.push(sortedAuthUsers[i]);
    }
    setAuthUsersToShow(calculatedAuthUsersToShow);
  }, [sortedAuthUsers, activePage]);

  useEffect(() => {
    if (currentSortStrategy.method === "role") {
      setSortedAuthUsers(
        roleSort(currentSortStrategy.method === true, authUsers)
      );
    } else if (currentSortStrategy.method === "email") {
      setSortedAuthUsers(
        emailSort(currentSortStrategy.method === true, authUsers)
      );
    }
  }, [currentSortStrategy, authUsers]);

  return (
    <Table variant="unstyled" size="lg">
      <Thead color="#59784D" borderBottom="1px solid #E2E8F0">
        <Tr height="5px">
          <Th
            fontFamily="initial"
            textTransform="capitalize"
            fontSize="2xl"
            fontWeight="normal"
            letterSpacing="tight"
            paddingInlineStart={5}
            paddingInlineEnd={200}
          >
            Email Address
            <Button
              bgColor="white"
              _hover={{ bgColor: "white" }}
              _active={{ bgColor: "white" }}
              paddingLeft={1}
              onClick={() => {
                updateSortStrategy("email");
              }}
            >
              <ArrowUpDownIcon w={4} h={4} />
            </Button>
          </Th>
          <Th
            fontFamily="initial"
            textTransform="capitalize"
            fontSize="2xl"
            fontWeight="normal"
            letterSpacing="tight"
            paddingInlineStart={5}
            paddingInlineEnd={50}
          >
            Role
            <Button
              bgColor="white"
              _hover={{ bgColor: "white" }}
              _active={{ bgColor: "white" }}
              paddingLeft={1}
              onClick={() => {
                updateSortStrategy("role");
              }}
            >
              <ArrowUpDownIcon w={4} h={4} />
            </Button>
          </Th>
        </Tr>
      </Thead>
      {authUsers && authUsers.length > 0 && (
        <Tbody overflowY="auto">
          {authUsers &&
            authUsersToShow.map((authUser) => (
              <Tr
                key={authUser._id}
                height="5px"
                borderBottom="1px solid #E2E8F0"
              >
                <Td
                  wordBreak="break-word"
                  paddingInlineStart={5}
                  paddingInlineEnd={200}
                  fontFamily="sans-serif"
                  fontWeight={600}
                >
                  {authUser.email}
                </Td>
                <Td
                  paddingInlineStart={5}
                  paddingInlineEnd={50}
                  fontFamily="sans-serif"
                  fontWeight={600}
                >
                  {authUser.role}
                </Td>
                <Td>
                  <AuthUserModal
                    btnName="Save Changes"
                    modalTitle="Edit an Employee"
                    action="updateAuthUser"
                    currentEmail={authUser.email}
                    calculate={calculate}
                  ></AuthUserModal>
                  <AuthUsersDeleteAlert
                    calculate={calculate}
                    email={authUser.email}
                  ></AuthUsersDeleteAlert>
                </Td>
              </Tr>
            ))}
        </Tbody>
      )}
    </Table>
  );
};

export default AuthUserTable;
