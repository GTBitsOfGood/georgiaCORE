import React from "react";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { getAuthUsers } from "src/actions/AuthUser";
import  AuthUserTable  from "src/components/AuthUserTable/AuthUserTable";
import AuthUserModal from "src/components/AuthUserTable/AuthUserModal";
const AdminPage = () => {
    const [authUsers, setAuthUsers] = React.useState([]);

    React.useEffect(() => {
        async function loadAuthUsers() {
          const newAuthUsers = [];
          const newAuthUsersData = await getAuthUsers();
          newAuthUsers.push(newAuthUsersData);

          setAuthUsers(newAuthUsers);
        }
    
        loadAuthUsers().catch((e) => {
          const error = e;
          showError(error.message);
        });
    }, []);
    /*const authUsers = [
        {
            id: "1",
            email: "bog.org",
        },
        {
            id: "2",
            email: "bits.org",
        },
        {
            id: "3",
            email: "borg.org",
        },
        {
            id: "4",
            email: "birg.org",
        }
    ];*/

    return (
        <Flex
            height="100%"
            width="100%"
            justifyContent="center"
            bgColor="#f5f5f5"
        >
            <Stack
                direction="column"
                width="75%"
                margin={50}
                overflow="auto"
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Text fontFamily="initial" fontSize="4xl" letterSpacing="tight">Employees</Text>
                    <AuthUserModal btnName="Add" modalTitle="Add New User" action="insertAuthUser" currentEmail="Email"></AuthUserModal>
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
                    overflow="auto"
                >
                    <AuthUserTable authUsers={authUsers}></AuthUserTable>
                </Flex>
            </Stack>
        </Flex>
    );
};

export default AdminPage;