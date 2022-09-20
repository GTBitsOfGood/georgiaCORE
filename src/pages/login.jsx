import LoginPage from "src/screens/Login";
import { getProviders } from "next-auth/react";
import React from "react";

const Login = (props) => <LoginPage {...props} />;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default Login;
