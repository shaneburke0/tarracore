import React, { useState } from "react";
import Popup from "reactjs-popup";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
// import { Auth } from "aws-amplify"
import SignUp from "../formComponents/SignUp";
// import ConfirmSignUp from "../formComponents/ConfirmSignUp"
import SignIn from "../formComponents/SignIn";
import ResetPassword from "../formComponents/ResetPassword";

const contentStyle = { width: "800px", maxWidth: "90%", minheight: "500px" };

const LoginModal = ({ open, closeModal }) => {
  const [selectedTab, setSelectedTab] = useState("one");
  const navigateToSignUp = () => {
    setSelectedTab("two");
  };

  const navigateToForgot = () => {
    setSelectedTab("three");
  };

  const navigateSignIn = () => {
    setSelectedTab("one");
  };

  return (
    <Popup
      modal
      {...{ contentStyle }}
      open={open}
      closeOnDocumentClick
      onClose={closeModal}
    >
      <Tabs defaultTab={selectedTab}>
        <TabList>
          <Tab tabFor="one">Login</Tab>
          <Tab tabFor="two">Sign up</Tab>
          <Tab tabFor="three">&nbsp;</Tab>
        </TabList>
        <TabPanel tabId="one">
          <SignIn
            closeModal={closeModal}
            navigateToSignUp={navigateToSignUp}
            navigateToForgot={navigateToForgot}
          />
        </TabPanel>
        <TabPanel tabId="two">
          <SignUp closeModal={closeModal} />
        </TabPanel>
        <TabPanel tabId="three">
          <ResetPassword navigateSignIn={navigateSignIn} />
        </TabPanel>
      </Tabs>
    </Popup>
  );
};

export default LoginModal;
