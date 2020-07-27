import axios from "axios";
import {
  SET_PENDING_REQUEST,
  SET_ERRORS,
  LOADING_CCA,
  LOADING_UI,
  CLEAR_ERRORS,
} from "../types";

export const getPendingRequest = () => (dispatch) => {
  dispatch({ type: LOADING_CCA });
  axios
    .get("/request")
    .then((res) => {
      const pendingRequest = res.data;
      dispatch({
        type: SET_PENDING_REQUEST,
        payload: {
          pendingRequest,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_PENDING_REQUEST,
        payload: {
          pendingRequest: [],
        },
      });
    });
};

export const acceptRequest = (studentCard) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/cca/accept", { studentCard })
    .then((res) => {
      dispatch(getPendingRequest());
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => console.log(err));
};

export const declineRequest = (studentCard) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/cca/decline", { studentCard })
    .then((res) => {
      dispatch(getPendingRequest());
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => console.log(err));
};
