import React from "react";
import { Flex, Stack, Text, Button } from "@chakra-ui/react";
import { getAuthUsers } from "src/actions/AuthUser";
import  AuthUserTable  from "src/components/AuthUserTable/AuthUserTable";
import AuthUserModal from "src/components/AuthUserTable/AuthUserModal";
const AdminPage = () => {
    const [authUsers, setAuthUsers] = React.useState([]);
    const [numAuthUsers, setNumAuthUsers] = React.useState(0);
    const [numArray, setNumArray] = React.useState([]);
    const [authUsersDisplay, setAuthUsersDisplay] = React.useState([]);
    const [isActive, setIsActive] = React.useState(0);

    React.useEffect(() => {
        async function loadAuthUsers() {
          const newAuthUsers = [];
          const newAuthUsersData = await getAuthUsers();
          newAuthUsers.push(newAuthUsersData);

          setAuthUsers(newAuthUsers);
          if (Object.values(newAuthUsers[0]).length >= 7) {
            setAuthUsersDisplay(Object.values(newAuthUsers[0]).slice(0, 7));
          } else if (Object.values(newAuthUsers[0]).length < 7) {
            setAuthUsersDisplay(Object.values(newAuthUsers[0]).slice(0, Object.values(newAuthUsers[0]).length));
          }
        }
    
        loadAuthUsers().catch((e) => {
          throw new Error("Invalid token!" + e);;
        });
    }, []);

    React.useEffect(() => {
        async function setNumberArray(authUsers) {
            let tempNumArray = [];
            if (authUsers[0]) {
                for (let i = 0; i < Object.values(authUsers[0]).length / 7; i++) {
                    tempNumArray.push(i);
                }
            }
            setNumArray(tempNumArray);
        };

        setNumberArray(authUsers).catch((e) => {
            throw new Error("Invalid token!" + e);;
          });
    }, [authUsers])

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
                
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Text fontFamily="initial" fontSize="4xl" letterSpacing="tight">Employees</Text>
                    <AuthUserModal btnName="Add as an Assistant" modalTitle="Add Assistant" action="insertAuthUser" currentEmail="Email"></AuthUserModal>
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
                    {authUsers != null && authUsers[0] != null && Object.values(authUsers[0]).length > 0 && (
                        <Stack
                            direction="column"
                            width="100%"
                            justifyContent="space-between"
                        >
                            <AuthUserTable authUsers={authUsersDisplay}></AuthUserTable>
                            <Stack
                                direction="row"
                                justifyContent="center"
                                
                            >
                                <Stack
                                    direction="row"
                                    
                                >
                                    <Button bgColor="white" fontFamily="serif" fontWeight="normal"  fontSize={20} onClick={() => {
                                        if (isActive > 0) {
                                            setAuthUsersDisplay(Object.values(authUsers[0]).slice((isActive - 1) * 7, (isActive - 1) * 7 + 7));
                                            setIsActive(isActive - 1);
                                        }
                                        
                                    }}>
                                        Previous
                                    </Button>
                                    {numArray.map(num => (
                                        <Button bgColor="white" fontFamily="body" fontWeight={isActive == num ? "bold" : "normal"} onClick={() => {
                                            if (Object.values(authUsers[0]).length >= num * 7 + 7) {
                                                setAuthUsersDisplay(Object.values(authUsers[0]).slice(num * 7, num * 7 + 7));
                                            } else if (Object.values(authUsers[0]).length < num * 7 + 7){
                                                setAuthUsersDisplay(Object.values(authUsers[0]).slice(num * 7, Object.values(authUsers[0]).length));
                                            }
                                            setIsActive(num);
                                        }}>
                                            {num + 1}
                                        </Button>
                                    ))}
                                    <Button bgColor="white" fontFamily="serif" fontWeight="normal" fontSize={20} onClick={() => {
                                        if (isActive < numArray.length - 1) {
                                            setAuthUsersDisplay(Object.values(authUsers[0]).slice((isActive + 1) * 7, (isActive + 1) * 7 + 7));
                                            setIsActive(isActive + 1);
                                        }
                                    }}>
                                        Next
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    )}
                </Flex>
            </Stack>
        </Flex>
    );
};

export default AdminPage;