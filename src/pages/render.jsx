import ChatNavigator from "../components/ChatNavigator/ChatNavigator";
import React from "react";
import { useSession, getSession } from "next-auth/react";

const RenderPage = () => {
  return <ChatNavigator isActive={true}></ChatNavigator>;
};

export default RenderPage;
