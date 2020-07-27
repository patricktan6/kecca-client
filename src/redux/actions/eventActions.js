import axios from "axios";
import { LOADING_UI, SET_EVENTS, LOADING_EVENT } from "../types";

export const getParticipatedEvents = () => (dispatch) => {
  dispatch({ type: LOADING_EVENT });
  const startingHeader = localStorage.FBIdToken.split(" ")[0];
  if (startingHeader === "User") {
    axios
      .get("/event/user")
      .then((res) => {
        dispatch({
          type: SET_EVENTS,
          payload: {
            events: res.data,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_EVENTS,
          payload: {
            events: [],
          },
        });
      });
  } else {
    axios
      .get("/event/admin")
      .then((res) => {
        dispatch({
          type: SET_EVENTS,
          payload: {
            events: res.data,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_EVENTS,
          payload: {
            events: [],
          },
        });
      });
  }
};

export const getOrganisedEvents = () => (dispatch) => {
  dispatch({ type: LOADING_EVENT });
  axios
    .get("/event/cca")
    .then((res) => {
      dispatch({
        type: SET_EVENTS,
        payload: {
          events: res.data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_EVENTS,
        payload: {
          events: [],
        },
      });
    });
};

// export const createEvent = (eventData) => (dispatch) => {
//   dispatch({type: LOADING_UI});
//   axios.post("/event", eventData).then((res) => {
//     dispatch({
//       type: SET_EVENT
//     })
//   });
// };
