import React from "react";
import { useSession } from "next-auth/react";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { ArrowUpDownIcon } from "@chakra-ui/icons";
import AuthUserModal from "./AuthUserModal";
import AuthUsersDeleteAlert from "./AuthUserDeleteAlert";
import PropTypes from "prop-types";

/**
 * AuthUser table
 * Table containing and displaying all authUsers in database
 * Table header contains Email Address and Role with sort buttons
 * Table row contains email, role, edit button, and delete button
 * Table body of authUsers is only displayed if there are any authUsers
 */

const AuthUserTable = ({ authUsers, roleSort, emailSort, calculate }) => {
  const { data: session } = useSession();

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
                emailSort();
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
                roleSort();
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
            authUsers.map((authUser) => (
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
                  {session.user.email != authUser.email && (
                    <AuthUsersDeleteAlert
                      calculate={calculate}
                      email={authUser.email}
                    ></AuthUsersDeleteAlert>
                  )}
                </Td>
              </Tr>
            ))}
        </Tbody>
      )}
    </Table>
  );
};

AuthUserTable.propTypes = {
  authUsers: PropTypes.any,
  roleSort: PropTypes.any,
  emailSort: PropTypes.any,
  calculate: PropTypes.any,
};

export default AuthUserTable;
