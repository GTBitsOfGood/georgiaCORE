import React from "react";
import { Button } from "@chakra-ui/react";
import { insertAuthUser } from "src/actions/AuthUser";
import { deleteAuthUser } from "src/actions/AuthUser";
import { updateAuthUser } from "src/actions/AuthUser";
const AdminPage = () => {
    return (
        <>
            <Button
                onClick = {() => insertAuthUser({email: "birg.org"})}
            >
                Add
            </Button>
            <Button
                onClick = {() => deleteAuthUser({email: "bits.org"})}
            >
                Delete
            </Button>
            <Button
                onClick = {() => updateAuthUser("birg.org", {email: "bits.org"})}
            >
                Edit
            </Button>
        </>
    );
};

export default AdminPage;