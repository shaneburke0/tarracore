import React, { useState } from "react";
import Popup from "reactjs-popup";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import { isMobileOnly } from "react-device-detect";
import SignUp from "../formComponents/SignUp";
// import ConfirmSignUp from "../formComponents/ConfirmSignUp"
import SignIn from "../formComponents/SignIn";
import ResetPassword from "../formComponents/ResetPassword";
import "./LoginModal.css";

const contentStyle = {
  width: "800px",
  maxWidth: "90%",
  minheight: "500px",
  overflow: "auto",
  margin: `${isMobileOnly ? "20px auto" : "auto"}`,
};

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
      modal={true}
      {...{ contentStyle }}
      open={open}
      closeOnDocumentClick={false}
      onClose={closeModal}
      lockScroll={false}
    >
      <>
        <a className="close cursor-pointer" onClick={closeModal}>
          &times;
        </a>
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
      </>
    </Popup>
  );
};

export default LoginModal;
