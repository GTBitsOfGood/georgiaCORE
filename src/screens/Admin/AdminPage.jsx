import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { getAuthUsers, insertAuthUser } from "src/actions/AuthUser";
import { deleteAuthUser } from "src/actions/AuthUser";
import { updateAuthUser } from "src/actions/AuthUser";
import  AuthUserTable  from "src/components/AuthUserTable/AuthUserTable";
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
            justifyContent="flex-start"
            alignItems="stretch"
            overflow="auto"
        >
            <Flex
                minH="600px"
                margin={50}
                padding={50}
                border="1px solid #657788"
                borderRadius={10}
                backgroundColor="white"
                flexShrink={0}
                flexGrow={1}
                justifyContent="center"
                alignItems="stretch"
            >
                <AuthUserTable authUsers={authUsers}></AuthUserTable>
            </Flex>
        </Flex>
    );
};

export default AdminPage;