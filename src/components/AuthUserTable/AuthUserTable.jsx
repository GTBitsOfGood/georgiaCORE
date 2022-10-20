import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { ArrowUpDownIcon, DeleteIcon } from "@chakra-ui/icons";
import { deleteAuthUser } from "src/actions/AuthUser";
import AuthUserModal from "./AuthUserModal";

const AuthUserTable = ({authUsers, roleSort, emailSort, calculate}) => {

  return (
    <Table variant="unstyled" size="lg">
      <Thead color="#59784D" borderBottom="1px solid #E2E8F0">
        <Tr height="5px">
          <Th fontFamily="initial" textTransform="capitalize" fontSize="2xl" fontWeight="normal" letterSpacing="tight" paddingInlineStart={5} paddingInlineEnd={200}>
            Email Address
            <Button bgColor="white" _hover={{bgColor: "white"}} _active={{bgColor: "white"}} paddingLeft={1} onClick={() => {emailSort()}}><ArrowUpDownIcon  w={4} h={4}/></Button>
          </Th>
          <Th fontFamily="initial" textTransform="capitalize" fontSize="2xl" fontWeight="normal" letterSpacing="tight" paddingInlineStart={5} paddingInlineEnd={50}>
            Role
            <Button bgColor="white" _hover={{bgColor: "white"}} _active={{bgColor: "white"}} paddingLeft={1} onClick={() => {roleSort()}}><ArrowUpDownIcon  w={4} h={4}/></Button>
          </Th>
        </Tr>
      </Thead>
      {authUsers && authUsers.length > 0 && (
      <Tbody overflowY="auto">
        {authUsers && authUsers.map((authUser) => (
          <Tr
            key={authUser._id}
            height="5px"
            borderBottom="1px solid #E2E8F0"
          >
            <Td paddingInlineStart={5} paddingInlineEnd={200} fontFamily="sans-serif" fontWeight={600}>
              {authUser.email}
            </Td>
            <Td paddingInlineStart={5} paddingInlineEnd={50} fontFamily="sans-serif" fontWeight={600}>{authUser.role}</Td>
            <Td>
                <AuthUserModal btnName="Submit" modalTitle="Edit Assistant" action="updateAuthUser" currentEmail={authUser.email} calculate={calculate}></AuthUserModal>
                {authUser.role != "Administrator" && (
                  <Button
                      bgColor="white"
                      onClick = {() => {deleteAuthUser({email: authUser.email}); calculate()}}
                      w={5}
                      h={5}
                  >
                      <DeleteIcon w={5} h={5} color="#c41e3a" />
                  </Button>
                )}
            </Td>
          </Tr>
        ))}
      </Tbody>
      )}
    </Table>
  );
};

export default AuthUserTable;