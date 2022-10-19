import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { deleteAuthUser } from "src/actions/AuthUser";
import AuthUserModal from "./AuthUserModal";

const AuthUserTable = ({authUsers}) => {

  return (
    <Table variant="unstyled" size="lg">
      <Thead color="#999999" borderBottom="1px solid #E2E8F0">
        <Tr height="100px">
          <Th paddingInlineStart={4} paddingInlineEnd={800}>
            E-mail
          </Th>
          <Th>
            <AuthUserModal btnName="Add" modalTitle="Add New User" action="insertAuthUser" currentEmail="Email"></AuthUserModal>
          </Th>
        </Tr>
      </Thead>
      <Tbody overflowY="auto">
        {authUsers[0] && (Object.values(authUsers[0]).map((authUser) => (
          <Tr
            key={authUser._id}
            height="100px"
            cursor="pointer"
            _hover={{ backgroundColor: "rgba(0, 105, 202, 0.05)" }}
          >
            <Td paddingInlineStart={5} paddingInlineEnd={800} fontWeight={600}>
              {authUser.email}
            </Td>
            <Td>
                {/*<Button
                    onClick = {() => updateAuthUser(authUser.email, {email: "bits.org"})}
                >
                    Edit
                </Button>*/}
                <AuthUserModal btnName="Edit" modalTitle="Edit User" action="updateAuthUser" currentEmail={authUser.email}></AuthUserModal>
                <Button
                    onClick = {() => deleteAuthUser({email: authUser.email})}
                >
                    Delete
                </Button>
            </Td>
          </Tr>
        )))}
      </Tbody>
    </Table>
  );
};

export default AuthUserTable;