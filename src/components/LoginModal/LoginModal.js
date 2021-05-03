import React from "react"
import Popup from "reactjs-popup"
// import { Auth } from "aws-amplify"
import SignUp from "../formComponents/SignUp"
// import ConfirmSignUp from "../formComponents/ConfirmSignUp"
import SignIn from "../formComponents/SignIn"

const contentStyle = { width: "90%" }

const LoginModal = ({ open, closeModal }) => {
  return (
    <Popup
      modal
      {...{ contentStyle }}
      open={open}
      closeOnDocumentClick
      onClose={closeModal}
    >
      <div
        className="flex flex-1 flex-col
      md:flex-row
      w-full p-8"
      >
        <div className="flex-1">
          <SignIn closeModal={closeModal} />
        </div>
        <div className="flex-1">
          <SignUp closeModal={closeModal} />
        </div>
      </div>
    </Popup>
  )
}

export default LoginModal
