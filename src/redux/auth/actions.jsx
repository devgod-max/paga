import { LOGIN, LOGOUT, SET_USER, SET_STATUS } from "./types";
import { signupUser, loginUser } from "../../services/authService"; // Correct import for authService

// Login action
export const login = (email, password, role) => async (dispatch) => {
  await dispatch(setStatus("loading"));
  try {
    const response = await loginUser(email, password, role);

    if (response) {
      localStorage.setItem("authUser", JSON.stringify(response));
      await dispatch({
        type: LOGIN,
        payload: response, // Example: user info returned from API
      });
      await dispatch(setStatus("success"));
    }
  } catch (error) {
    console.error("Login failed:", error);
    dispatch(setStatus("error"));
  }
};

// Signup action
export const signup = (email, username, role, password) => async (dispatch) => {
  try {
    const response = await signupUser(email, username, role, password); // Assuming signupUser is defined in authService

    if (response) {
      localStorage.setItem("authUser", JSON.stringify(response));
      await dispatch({
        type: SET_USER,
        payload: response, // Example: user info returned from signup API
      });
    }
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

export const setStatus = (status) => {
  return {
    type: SET_STATUS,
    payload: status,
  };
};
