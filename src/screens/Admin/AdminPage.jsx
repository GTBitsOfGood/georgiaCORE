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
    const [authUsersDisplayData, setAuthUsersDisplayData] = React.useState([]);

    React.useEffect(() => {
        async function loadAuthUsers() {
          
          calculateDisplay();
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
    }, [authUsers]);


    async function calculateDisplay() {
        const newAuthUsers = [];
        const newAuthUsersData = await getAuthUsers();
        newAuthUsers.push(newAuthUsersData);

        setAuthUsers(newAuthUsers);
        let tempCalcArray = [];
        if (newAuthUsers[0]) {
            if (Object.values(newAuthUsers[0]).length >= isActive * 7 + 7) {
                tempCalcArray = Object.values(newAuthUsers[0]).slice(isActive * 7, isActive * 7 + 7);
            } else if (Object.values(newAuthUsers[0]).length < isActive * 7 + 7){
                tempCalcArray = Object.values(newAuthUsers[0]).slice(isActive * 7, Object.values(newAuthUsers[0]).length);
            }
            setAuthUsersDisplay(tempCalcArray);
        }
    };

    React.useEffect(() => {
        async function setDisplay() {
            setAuthUsersDisplayData(authUsersDisplay);
        }

        setDisplay(authUsersDisplay).catch((e) => {
            throw new Error("Invalid token!" + e);;
        });
    }, [authUsersDisplay]);

    React.useEffect(() => {
        async function calcDisplayButtons() {
            calculateDisplay();
        }

        calcDisplayButtons().catch((e) => {
            throw new Error("Invalid token!" + e);;
        });
    }, [isActive])

    /*const emailSort = () => {
        if (authUsers[0]) {
            const tempAuthUsersArray = [];
            console.log(Object.values(authUsers[0])[0].email);
            const tempAuthUsers = Object.values(authUsers[0]).sort((a, b) =>
                (a.email.localeCompare(b.email))
            );
            console.log(tempAuthUsers);
            tempAuthUsersArray.push(tempAuthUsers);
            console.log(tempAuthUsersArray);
            setAuthUsers([{email: "m2", role: "Berg"}, {email: "m7", role: "Borg"}]);
            console.log(authUsers);
            console.log(authUsers[0]);
        }
    }*/
    const roleSort = () => {
        let tempUsersArray = [];
        for (let i = 0; i < Object.values(authUsers[0]).length; i++) {
            if (authUsers[0][i].role == "Administrator") {
                tempUsersArray.push(authUsers[0][i]);
            }
        }
        for (let i = 0; i < Object.values(authUsers[0]).length; i++) {
            if (authUsers[0][i].role == "Staff") {
                tempUsersArray.push(authUsers[0][i]);
            }
        }
        setAuthUsers(tempUsersArray);
        setAuthUsersDisplay(tempUsersArray);
    }
    /*React.useEffect(() => {
        console.log(authUsers);
    }, [authUsers]);
    React.useEffect(() => {
        console.log(authUsersDisplay);
    }, [authUsersDisplay]);*/
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
                    <AuthUserModal btnName="Add as an Assistant" modalTitle="Add Assistant" action="insertAuthUser" currentEmail="Email" calculate={calculateDisplay}></AuthUserModal>
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
                        
                        <AuthUserTable authUsers={authUsersDisplayData} roleSort={roleSort} calculate={calculateDisplay}></AuthUserTable>
                        {authUsers != null && authUsers[0] != null && Object.values(authUsers[0]).length > 0 && (
                            <Stack
                                direction="row"
                                justifyContent="center"
                                
                            >
                                <Stack
                                    direction="row"
                                    
                                >
                                    <Button bgColor="white" fontFamily="serif" fontWeight="normal"  fontSize={20} onClick={() => {
                                        if (isActive > 0) {
                                            setIsActive(isActive - 1);
                                        }
                                        
                                    }}>
                                        Previous
                                    </Button>
                                    {numArray.map(num => (
                                        <Button bgColor="white" fontFamily="body" fontWeight={isActive == num ? "bold" : "normal"} onClick={() => {
                                            setIsActive(num);
                                            
                                            
                                        }}>
                                            {num + 1}
                                        </Button>
                                    ))}
                                    <Button bgColor="white" fontFamily="serif" fontWeight="normal" fontSize={20} onClick={() => {
                                        if (isActive < numArray.length - 1) {
                                            setIsActive(isActive + 1);
                                        }
                                    }}>
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
};

export default AdminPage;