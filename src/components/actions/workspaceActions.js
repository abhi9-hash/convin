import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  ANALYTICS_REQUEST,
  ANALYTICS_SUCCESS,
  ANALYTICS_FAIL,
  ACTIVITY_SUCCESS,
  SIGNUP_SUCCESS,
} from "../userConstants";
import Axios from "axios";

export const listWorkspaces = (criteria, search) => async (dispatch) => {
  dispatch({
    type: USER_LIST_REQUEST,
  });
  try {
    const {
      data: { data },
    } = await Axios.get(
      `${process.env.REACT_APP_BASE_URL}/searchworkspace/extractworkspaceid?criteria=${criteria}&search_string=${search}`
    );

    // const data = {
    //   Workspaces: [
    //     {
    //       id: 76,
    //       name: "IIITM",
    //       "creator email": "img_2019002@iiitm.ac.in",
    //       "# Active Users": "1",
    //       "# Total Users": "1",
    //     },
    //     {
    //       id: 89,
    //       name: "Groww",
    //       "creator email": "img_2019009@iiitm.ac.in",
    //       "# Active Users": "3",
    //       "# Total Users": "3",
    //     },
    //     {
    //       id: 114,
    //       name: "IIITM",
    //       "creator email": "img_2019006@iiitm.ac.in",
    //       "# Active Users": "1",
    //       "# Total Users": "1",
    //     },
    //   ],
    // };

    dispatch({ type: USER_LIST_SUCCESS, payload: data.Workspaces });
  } catch (error) {
    dispatch({ type: USER_LIST_FAIL, payload: error.message });
  }
};

export const workspacesAnalytics = (type) => async (dispatch) => {
  dispatch({
    type: ANALYTICS_REQUEST,
  });
  try {
    const {
      data: { data },
    } = await Axios.get(`${process.env.REACT_APP_BASE_URL}/${type}`);

    console.log(data);

    dispatch({
      type:
        type === "workspacesactivity"
          ? ACTIVITY_SUCCESS
          : type === "weeklysignups"
          ? SIGNUP_SUCCESS
          : ANALYTICS_SUCCESS,
      payload: type === "workspacesactivity" ? data.workspace_activity : data,
    });
  } catch (error) {
    dispatch({ type: ANALYTICS_FAIL, payload: error.message });
  }
};

export const workspaceDetails = (id) => async (dispatch) => {
  dispatch({
    type: USER_DETAILS_REQUEST,
  });
  try {
    const {
      data: { data },
    } = await Axios.get(
      `${process.env.REACT_APP_BASE_URL}/searchworkspace/workspacedetail?id=${id}`
    );
    console.log({ data });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    console.log("data", data);
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
