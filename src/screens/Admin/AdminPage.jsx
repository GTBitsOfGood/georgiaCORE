import React from "react";
import { Flex, Stack, Text, Button } from "@chakra-ui/react";
import { getAuthUsers, deleteAuthUser, insertAuthUser } from "src/actions/AuthUser";
import  AuthUserTable  from "src/components/AuthUserTable/AuthUserTable";
import AuthUserModal from "src/components/AuthUserTable/AuthUserModal";

const AdminPage = () => {
    const [authUsers, setAuthUsers] = React.useState([]);
    const [numAuthUsers, setNumAuthUsers] = React.useState(0);
    const [numArray, setNumArray] = React.useState([]);
    const [authUsersDisplay, setAuthUsersDisplay] = React.useState([]);
    const [isActive, setIsActive] = React.useState(0);
    const [authUsersDisplayData, setAuthUsersDisplayData] = React.useState([]);
    const [rolesSorted, setRolesSorted] = React.useState(false);
    const [emailsSorted, setEmailsSorted] = React.useState(false);
    const [isEmailSort, setIsEmailSort] = React.useState(true);
    const [isRolesSort, setIsRolesSort] = React.useState(false);

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
        if (newAuthUsersData[0] && (isEmailSort == true)) {
            newAuthUsersData = await doEmailSort(newAuthUsersData, emailsSorted);
        }
        else if (newAuthUsersData[0] && (isRolesSort == true)) {
            newAuthUsersData = await doRoleSort(newAuthUsersData, rolesSorted);
        }
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

    async function doEmailSort(users, emailSorted) {
        if (users != undefined) {
            if (emailSorted == false) {
                let tempUsersArray = [];
                let emails = [];
                let sortedEmails = [];
                for (let i = 0; i < Object.values(users).length; i++) {
                    emails.push(users[i].email)
                }
                sortedEmails = emails.sort();
                for (let i = 0; i < sortedEmails.length; i++) {
                    for (let j = 0; j < Object.values(users).length; j++) {
                        if (users[j].email == sortedEmails[i]) {
                            tempUsersArray.push(users[j]);
                        }
                    }
                }
                //await stopEmailSort();
                return tempUsersArray;
            } else if (emailSorted == true) {
                let tempUsersArray = [];
                let emails = [];
                let sortedEmails = [];
                for (let i = 0; i < Object.values(users).length; i++) {
                    emails.push(users[i].email)
                }
                sortedEmails = emails.sort();
                sortedEmails = sortedEmails.reverse()
                for (let i = 0; i < sortedEmails.length; i++) {
                    for (let j = 0; j < Object.values(users).length; j++) {
                        if (users[j].email == sortedEmails[i]) {
                            tempUsersArray.push(users[j]);
                        }
                    }
                }
                //await stopEmailSort();
                return tempUsersArray;
            }
        } else {
           // await stopEmailSort();
            return users;
        }
    }

    async function doRoleSort(users, roleSorted) {
        if (users!= undefined) {
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
                    deleteAuthUser({email: tempUsersArray[i].email});
                }
                for (let i = 0; i < tempUsersArray.length; i++) {
                    insertAuthUser({email: tempUsersArray[i].email, role: tempUsersArray[i].role});
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
                    deleteAuthUser({email: tempUsersArray[i].email});
                }
                for (let i = 0; i < tempUsersArray.length; i++) {
                    insertAuthUser({email: tempUsersArray[i].email, role: tempUsersArray[i].role});
                }
                
                return tempUsersArray;
            }
        } else {
            return users;
        }
    }
    async function roleSort() {
        setRolesSorted(!rolesSorted);
        
        
    };

    React.useEffect(() => {
        
        async function handleRolesSort() {
            setRoleSort();
            calculateDisplay();
        }
        
        handleRolesSort().catch((e) => {
            throw new Error("Invalid token!" + e);;
        });
        
    }, [rolesSorted])

    async function setRoleSort() {
        await stopEmailSort();
        await startRolesSort();
    };

    async function emailSort() {
        setEmailsSorted(!emailsSorted);
        
    };

    React.useEffect(() => {
        async function handleEmailSort() {
            setEmailSort();
            calculateDisplay();
        }
        
        handleEmailSort().catch((e) => {
            throw new Error("Invalid token!" + e);;
        });
    }, [emailsSorted])

    /*async function setEmailSort() {
        await stopRolesSort();
        console.log("stopped")
        await startEmailSort();
        
    };*/

    React.useEffect(() => {
        async function displayEmailSort() {
            calculateDisplay();
        }
        
        displayEmailSort().catch((e) => {
            throw new Error("Invalid token!" + e);;
        });
    }, [isEmailSort])

    React.useEffect(() => {
        async function displayRoleSort() {
            calculateDisplay();
        }
        
        displayRoleSort().catch((e) => {
            throw new Error("Invalid token!" + e);;
        });
    }, [isRolesSort])

    async function setEmailSort() {
        await stopRolesSort();
        await startEmailSort();
        
    }

    async function stopEmailSort() {
        setIsEmailSort(false);
    };

    async function stopRolesSort() {
        setIsRolesSort(false);
    };

    async function startEmailSort() {
        setIsEmailSort(true);
    };

    async function startRolesSort() {
        setIsRolesSort(true);
    };

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
                    <AuthUserModal btnName="Confirm" modalTitle="Add an Employee" action="insertAuthUser" currentEmail="Email" calculate={calculateDisplay}></AuthUserModal>
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
                        
                        <AuthUserTable authUsers={authUsersDisplayData} roleSort={roleSort} emailSort={emailSort} calculate={calculateDisplay}></AuthUserTable>
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