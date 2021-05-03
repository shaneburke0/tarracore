import { Auth } from "aws-amplify"

const signIn = async (email, password) => {
  try {
    const response = await Auth.signIn(email, password)
    return response
  } catch (error) {
    throw new Error(error.message)
  }
}

const signUp = async (username, password, subscribe) => {
  try {
    const response = await Auth.signUp({
      username,
      password,
      attributes: { email: username },
    })
    return response
  } catch (error) {
    throw error
  }
}

const confirmSignUp = async (email, code) => {
  try {
    const response = await Auth.confirmSignUp(email, code, {
      forceAliasCreation: true,
    })
    return response
  } catch (error) {
    throw error
  }
}

const signOut = async () => {
  try {
    const response = await Auth.signOut()
    return response
  } catch (error) {
    throw error
  }
}

const checkAuth = async () => {
  try {
    const response = await Auth.currentAuthenticatedUser()
    const { attributes, signInUserSession } = response
    return { attributes, jwtToken: signInUserSession.accessToken.jwtToken }
  } catch (error) {
    throw error
  }
}

export { signIn, signOut, checkAuth, signUp, confirmSignUp }
