import React, { useEffect } from "react"
import { authReducer } from "./authReducer"
import { checkAuth } from "../services/authService"

const AuthStateContext = React.createContext()
const AuthDispatchContext = React.createContext()

function AuthProvider({ children }) {
  const [state, dispatch] = React.useReducer(authReducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  })

  const handleCheckToken = async () => {
    let token = null
    try {
      const user = await checkAuth()
      const { jwtToken } = user
      token = jwtToken
    } catch (e) {
      // user not signed in
      // console.log("error", e)
    }
    dispatch({ type: "RESTORE_TOKEN", token })
  }

  useEffect(() => {
    handleCheckToken()
  }, [])

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}

function useAuthState() {
  const context = React.useContext(AuthStateContext)
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider")
  }
  return context
}
function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext)
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider")
  }
  return context
}

export { AuthProvider, useAuthState, useAuthDispatch }
