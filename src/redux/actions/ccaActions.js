import axios from "axios";
import { SET_PENDING_REQUEST, SET_ERRORS } from "../types";

export const getPendingRequest = () => (dispatch) => {
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
