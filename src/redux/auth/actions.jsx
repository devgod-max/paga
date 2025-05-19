import { LOGIN, LOGOUT, SET_USER } from "./types";
import { signupUser, loginUser } from "../../services/authService"; // Correct import for authService

// Login action
export const login = (email, password) => async (dispatch) => {
  try {
    const response = await loginUser(email, password);

    if (response) {
      localStorage.setItem("authUser", JSON.stringify(response));
    }

    dispatch({
      type: LOGIN,
      payload: response, // Example: user info returned from API
    });
  } catch (error) {
    console.error("Login failed:", error);
  }
};

// Signup action
export const signup = (email, username, role, password) => async (dispatch) => {
  try {
    const response = await signupUser(email, username, role, password); // Assuming signupUser is defined in authService

    if (response) {
      localStorage.setItem("authUser", JSON.stringify(response));
    }

    dispatch({
      type: SET_USER,
      payload: response.data, // Example: user info returned from signup API
    });
  } catch (error) {
    console.error("Signup failed:", error);
  }
};

// Logout action
export const logout = () => {
  localStorage.removeItem("authUser");
  return {
    type: LOGOUT,
  };
};

// Set user information after successful login/signup
export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
