import React from "react";
import { useSession } from "next-auth/react";
import { getAuthUsers } from "src/actions/AuthUser";
import { helloWorld } from "../../actions/General";
import classes from "./IndexPage.module.css";
import ErrorPage from "src/components/ErrorPage";

const IndexPage = () => {
  const [payload, setPayload] = React.useState("");
  const { data: session, status } = useSession();
  const [authUser, setAuthUser] = React.useState("");
  

  React.useEffect(() => {
    // Example how to create page without ssr
    helloWorld().then((resp) => {
      setPayload(resp);
    });
  }, []);

  //Checks user email if it is in authorized list
  React.useEffect(() => {
    async function setAllAuthUserEmails() {
      const newAuthUsers = [];
      const newAuthUsersData = await getAuthUsers();
      newAuthUsers.push(newAuthUsersData);
      if (newAuthUsers[0] && session) {
        let emailsArray = [];
        for (let i = 0; i < Object.values(newAuthUsers[0]).length; i++) {
          emailsArray.push(newAuthUsers[0][i].email);
        }
        if (emailsArray.includes(session.user.email)) {
          setAuthUser("allowed");
        } else if (!emailsArray.includes(session.user.email)) {
          setAuthUser("not allowed");
        }
      }
    }

    setAllAuthUserEmails().catch((e) => {
        throw new Error("Invalid token!" + e);;
    });
}, [session]);
  
  //Displays blank page if session is being checked
  if (status === "loading") {
    return (
      <>
      </>
    );
  }
  //Displays page if user is logged in
  if (status === "authenticated") {
    if (authUser == "allowed") {
      return (
        <>
          <h2 className={classes.centerText}>Welcome to Next.js!</h2>
          <h3>
            This page is static rendered, because all API calls are made in
            useEffect
          </h3>
          <h4>{payload}</h4>
          <p>You can tell because the text above flashes on page refresh</p>
        </>
      );
    }
    //User is not in the authorized user list
    else if (authUser == "not allowed") {
      return (
        <>
          <ErrorPage message="User Cannot Access this Page"/>
        </>
      );
    }
  //User is not logged in, so it displays the error page to protect /
  } else if (status === "unauthenticated") {
    return (
      <>
        <ErrorPage message="User is not Logged In"/>
      </>
    );
  }

  return (
    <>
    </>
  );
};

export default IndexPage;
