import { Auth } from "aws-amplify";

const signIn = async (email, password) => {
  try {
    const response = await Auth.signIn(email, password);

    if (window.gtag) {
      window.gtag("event", "login", {
        method: "Email",
      });
    }

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const signUp = async (username, password, subscribe) => {
  try {
    const response = await Auth.signUp({
      username,
      password,
      attributes: { email: username },
    });

    if (window.gtag) {
      window.gtag("event", "sign_up", {
        method: "Email",
      });
    }

    return response;
  } catch (error) {
    throw error;
  }
};

const confirmSignUp = async (email, code) => {
  try {
    const response = await Auth.confirmSignUp(email, code, {
      forceAliasCreation: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const signOut = async () => {
  try {
    const response = await Auth.signOut();
    return response;
  } catch (error) {
    throw error;
  }
};

const checkAuth = async () => {
  try {
    const response = await Auth.currentAuthenticatedUser();
    const { attributes, signInUserSession } = response;
    return { attributes, jwtToken: signInUserSession.accessToken.jwtToken };
  } catch (error) {
    throw error;
  }
};

export { signIn, signOut, checkAuth, signUp, confirmSignUp };
