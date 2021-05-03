import React, { useState } from "react"
import { signUp, confirmSignUp, signIn } from "../../services/authService"
import { useAuthDispatch } from "../../context/authContext"

const Checkbox = ({ onChange, name, checked }) => (
  <input
    type="checkbox"
    onChange={onChange}
    id={name}
    name={name}
    checked={checked}
  />
)

const SignUp = ({ closeModal }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [subscribe, setSubscribe] = useState(false)
  const [code, setCode] = useState("")
  const [requiresConfirmation, setRequiresConfirmation] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const dispatch = useAuthDispatch()

  const handleSignUp = async () => {
    setError()
    try {
      const response = await signUp(email, password, subscribe)

      if (response && response.userSub && response.userConfirmed === false) {
        setRequiresConfirmation(true)
      }
    } catch (ex) {
      setError(ex.message)
      setLoading(false)
    }
  }

  const handleConfirmation = async () => {
    setError()
    try {
      const response = await confirmSignUp(email, code)

      if (response && response === "SUCCESS") {
        signIn(email, password)
          .then(r => {
            console.log(r)
            dispatch({
              type: "SIGN_IN",
              token: r.signInUserSession.accessToken.jwtToken,
            })
            closeModal()
          })
          .catch(e => {
            console.log(e)
          })
          .finally(() => {
            setLoading(false)
          })
        closeModal()
      }
    } catch (ex) {
      setError(ex.message)
      setLoading(false)
    }
  }

  return (
    <div>
      <h3 className="pl-8">Register</h3>
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
                    onChange={e => setEmail(e.target.value)}
                    name="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    placeholder="Email address"
                    value={email}
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    onChange={e => setPassword(e.target.value)}
                    name="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    value={password}
                  />
                </div>
                <div className="mb-6">
                  <Checkbox
                    name="newsletter"
                    onChange={e => setSubscribe(e.target.checked)}
                    checked={subscribe}
                  />
                  <label htmlFor="newsletter">
                    Subscribe to our newsletter
                  </label>
                </div>
                {error && <div className="text-red-700 mb-4">{error}</div>}
                <div className="flex items-center justify-between">
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
                    onChange={e => setCode(e.target.value)}
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
    </div>
  )
}

export default SignUp
