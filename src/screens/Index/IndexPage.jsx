import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "@chakra-ui/react";
import { helloWorld } from "../../actions/General";
import classes from "./IndexPage.module.css";
import ErrorPage from "src/components/ErrorPage";

const IndexPage = () => {
  const [payload, setPayload] = React.useState("");
  const { data: session, status } = useSession();

  React.useEffect(() => {
    // Example how to create page without ssr
    helloWorld().then((resp) => {
      setPayload(resp);
    });
  }, []);
  
  //Displays page if user is logged in
  if (status === "authenticated") {
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

  //Displays a blank page if session is being checked
  if (status === "loading") {
    return (
      <>
      </>
    );
  }

  //User is not logged in, so it displays the error page to protect /
  return (
    <>
      <ErrorPage message="User is not Logged In"/>
    </>
  );
};

export default IndexPage;
