import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from "../userConstants";
import Axios from "axios";

export const listUsers = () => async (dispatch) => {
  dispatch({
    type: USER_LIST_REQUEST,
  });
  try {
    const {
      data: { data },
    } = await Axios.get(`https://reqres.in/api/users`);
    console.log("data", data);
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LIST_FAIL, payload: error.message });
  }
};

export const userDetails = (id) => async (dispatch) => {
  dispatch({
    type: USER_DETAILS_REQUEST,
  });
  try {
    const {
      data: { data },
    } = await Axios.get(`https://reqres.in/api/users/${id}`);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    console.log("data",data)
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
