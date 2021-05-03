import React, { useState } from "react"
import { signIn } from "../../services/authService"
import { useAuthDispatch } from "../../context/authContext"

const SignIn = ({ closeModal }) => {
  const [isSignInLoading, setSignInLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useAuthDispatch()

  const signInUser = async () => {
    setSignInLoading(true)
    signIn(username, password)
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
        setSignInLoading(false)
      })
  }

  return (
    <div>
      <h3 className="pl-2 md:pl-8">Login</h3>
      <div className="flex flex-1 justify-center">
        <div className="w-full max-w-144">
          <form className="bg-white px-2 md:px-8 pt-2 md:pt-6 pb-2 md:pb-8 mb-1 md:mb-4">
            <div className="mb-1 md:mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username or Email
              </label>
              <input
                onChange={e => setUsername(e.target.value)}
                name="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="mb-2 md:mb-6">
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
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={signInUser}
                className="bg-secondary hover:bg-black text-white font-bold py-2 px-1 md:px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                disabled={isSignInLoading}
              >
                Login
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm"
                href="#/"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn