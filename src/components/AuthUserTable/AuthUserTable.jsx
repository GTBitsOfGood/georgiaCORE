import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteAuthUser } from "src/actions/AuthUser";
import AuthUserModal from "./AuthUserModal";

const AuthUserTable = ({authUsers}) => {

  return (
    <Table variant="unstyled" size="lg">
      <Thead color="#59784D" borderBottom="1px solid #E2E8F0">
        <Tr height="5px">
          <Th fontFamily="initial" textTransform="capitalize" fontSize="2xl" fontWeight="normal" letterSpacing="tight" paddingInlineStart={5} paddingInlineEnd={200}>
            Email Address
          </Th>
          <Th fontFamily="initial" textTransform="capitalize" fontSize="2xl" fontWeight="normal" letterSpacing="tight" paddingInlineStart={5} paddingInlineEnd={50}>
            Role
          </Th>
        </Tr>
      </Thead>
      <Tbody overflowY="auto">
        {authUsers[0] && (Object.values(authUsers[0]).map((authUser) => (
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
                <AuthUserModal btnName="Edit" modalTitle="Edit User" action="updateAuthUser" currentEmail={authUser.email}></AuthUserModal>
                <Button
                    bgColor="white"
                    onClick = {() => deleteAuthUser({email: authUser.email})}
                    w={5}
                    h={5}
                >
                    <DeleteIcon w={5} h={5} color="#c41e3a" />
                </Button>
            </Td>
          </Tr>
        )))}
      </Tbody>
    </Table>
  );
};

export default AuthUserTable;