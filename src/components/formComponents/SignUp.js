import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import { signUp, confirmSignUp, signIn } from "../../services/authService";
import { useAuthDispatch } from "../../context/authContext";

const Checkbox = ({ onChange, name, checked }) => (
  <input
    type="checkbox"
    onChange={onChange}
    id={name}
    name={name}
    checked={checked}
  />
);

const SignUp = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [code, setCode] = useState("");
  const [requiresConfirmation, setRequiresConfirmation] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const dispatch = useAuthDispatch();

  const handleSignUp = async () => {
    setError();

    if (!email) {
      setError("Please enter your email address");
      return;
    } else if (!password) {
      setError("Please enter your password");
      return;
    } else if (!confirmPassword) {
      setError("Please confirm your password");
      return;
    } else if (password !== confirmPassword) {
      setError("Passwords must match");
      return;
    }

    setLoading(true);

    try {
      const response = await signUp(email, password, subscribe);

      if (response && response.userSub && response.userConfirmed === false) {
        setRequiresConfirmation(true);
      }
    } catch (ex) {
      setError(ex.message);
    }
    setLoading(false);
  };

  const handleConfirmation = async () => {
    setLoading(true);
    setError();
    try {
      const response = await confirmSignUp(email, code);

      if (response && response === "SUCCESS") {
        signIn(email, password)
          .then((r) => {
            console.log(r);
            dispatch({
              type: "SIGN_IN",
              token: r.signInUserSession.accessToken.jwtToken,
            });
            closeModal();
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            setLoading(false);
          });
        closeModal();
      }
    } catch (ex) {
      setError(ex.message);
    }
    setLoading(false);
  };

  return (
    <div>
      {/* <h3 className="pl-8">Register</h3> */}
      <div className="flex flex-1 justify-center">
        <div className="w-full max-w-144">
          <>
            {!requiresConfirmation && (
              <form className="bg-white px-8 pt-6 pb-8 mb-4">
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    placeholder="Email address"
                    value={email}
                  />
                </div>

                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex-grow">
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                      />
                    </div>
                    <div className="mb-6 mt-6">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="confirmPassword"
                      >
                        Confirm Password
                      </label>
                      <input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        name="confirmPassword"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="confirmPassword"
                        type="password"
                        placeholder="******************"
                        value={confirmPassword}
                      />
                    </div>
                  </div>
                  <div className="text-xs md:mt-8 md:ml-4">
                    <PasswordChecklist
                      rules={[
                        "length",
                        "specialChar",
                        "number",
                        "capital",
                        "match",
                      ]}
                      minLength={8}
                      value={password}
                      valueAgain={confirmPassword}
                      onChange={(isValid) => {}}
                    />
                  </div>
                </div>

                {error && <div className="text-red-700 mb-4">{error}</div>}
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-6">
                    <Checkbox
                      name="newsletter"
                      onChange={(e) => setSubscribe(e.target.checked)}
                      checked={subscribe}
                    />
                    <label htmlFor="newsletter">
                      Subscribe to our newsletter
                    </label>
                  </div>

                  <button
                    onClick={handleSignUp}
                    className="bg-secondary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    disabled={isLoading}
                  >
                    Register
                  </button>
                </div>
              </form>
            )}
            {requiresConfirmation && (
              <form className="bg-white px-8 pt-6 pb-8 mb-4">
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Verification Code
                  </label>
                  <input
                    onChange={(e) => setCode(e.target.value)}
                    name="verificationCode"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="verificationCode"
                    placeholder="Verification Code"
                    value={code}
                  />
                </div>
                {error && <div className="text-red-700 mb-4">{error}</div>}
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleConfirmation}
                    className="bg-secondary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    disabled={isLoading}
                  >
                    Confirm
                  </button>
                </div>
              </form>
            )}
          </>
        </div>
      </div>
      {isLoading && (
        <div className="loader-container-mask">
          <div className="loader-container--login">
            <div className="loader">Loading...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
