import React, { useState } from "react";
import { Auth } from "aws-amplify";
import PasswordChecklist from "react-password-checklist";

const Input = ({ onChange, value, name, placeholder, type = "text" }) => (
  <input
    onChange={onChange}
    value={value}
    className="mt-2 text-sm shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
    type={type}
    placeholder={placeholder}
    name={name}
  />
);

export default function ResetPassword({ navigateSignIn }) {
  const [fields, setFields] = useState({
    code: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  const handleFieldChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  function validateCodeForm() {
    return fields.email.length > 0;
  }

  function validateResetForm() {
    return (
      fields.code.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  async function handleSendCodeClick(event) {
    event.preventDefault();
    setError(null);
    setIsSendingCode(true);

    try {
      await Auth.forgotPassword(fields.email);
      setCodeSent(true);
      setIsSendingCode(false);
    } catch (error) {
      setError(error);
      setIsSendingCode(false);
    }
  }

  async function handleConfirmClick(event) {
    event.preventDefault();
    setError(null);
    setIsConfirming(true);

    console.log("handleConfirmClick", fields);

    try {
      await Auth.forgotPasswordSubmit(
        fields.email,
        fields.code,
        fields.password
      );
      setConfirmed(true);
      setIsConfirming(false);
    } catch (error) {
      setError(error);
      setIsConfirming(false);
    }
  }

  function renderRequestCodeForm() {
    return (
      <form
        className="bg-white px-2 md:px-8 pt-2 md:pt-6 pb-2 md:pb-8 mb-1 md:mb-4"
        onSubmit={handleSendCodeClick}
      >
        <div className="mb-1 md:mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <Input
            autoFocus
            type="email"
            name="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </div>
        {error && <div className="text-red-700 mb-4">{error.message}</div>}
        <div className="text-right">
          <button
            className="bg-secondary hover:bg-black text-white font-bold py-2 px-1 md:px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={!validateCodeForm()}
          >
            Send Confirmation
          </button>
        </div>
        {isSendingCode && (
          <div className="loader-container-mask">
            <div className="loader-container--login">
              <div className="loader">Loading...</div>
            </div>
          </div>
        )}
      </form>
    );
  }

  function renderConfirmationForm() {
    return (
      <form
        className="bg-white px-2 md:px-8 pt-2 md:pt-6 pb-2 md:pb-8 mb-1 md:mb-4"
        onSubmit={handleConfirmClick}
      >
        <div className="mb-2 md:mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirmation Code
          </label>
          <Input
            autoFocus
            type="tel"
            value={fields.code}
            onChange={handleFieldChange}
            name="code"
          />
          <div className="text-xs">
            Please check your email ({fields.email}) for the confirmation code.
          </div>
        </div>
        <hr />
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex-grow">
            <div className="mb-2 md:mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                New Password
              </label>
              <Input
                type="password"
                value={fields.password}
                name="password"
                onChange={handleFieldChange}
              />
            </div>
            <div className="mb-2 md:mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <Input
                type="password"
                value={fields.confirmPassword}
                name="confirmPassword"
                onChange={handleFieldChange}
              />
            </div>
          </div>

          <div className="text-xs md:mt-8 md:ml-4">
            <PasswordChecklist
              rules={["length", "specialChar", "number", "capital", "match"]}
              minLength={8}
              value={fields.password}
              valueAgain={fields.confirmPassword}
              onChange={(isValid) => {}}
            />
          </div>
        </div>

        {error && <div className="text-red-700">{error.message}</div>}
        <div className="text-right">
          <button
            type="submit"
            className="bg-secondary hover:bg-black text-white font-bold py-2 px-1 md:px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={!validateResetForm()}
          >
            Confirm
          </button>
        </div>

        {isConfirming && (
          <div className="loader-container-mask">
            <div className="loader-container--login">
              <div className="loader">Loading...</div>
            </div>
          </div>
        )}
      </form>
    );
  }

  function renderSuccessMessage() {
    return (
      <div className="success mt-8 mb8">
        <p>Your password has been reset.</p>
        <p>
          Click{" "}
          <span
            className="text-green-700 text-sm font-bold cursor-pointer"
            onClick={navigateSignIn}
          >
            here
          </span>{" "}
          to login with your new credentials.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 justify-center">
      <div className="w-full max-w-144">
        {!codeSent
          ? renderRequestCodeForm()
          : !confirmed
          ? renderConfirmationForm()
          : renderSuccessMessage()}
      </div>
    </div>
  );
}
