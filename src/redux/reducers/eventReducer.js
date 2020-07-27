import { SET_EVENTS, LOADING_EVENT, SET_EVENT } from "../types";

const initialState = {
  events: [],
  event: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case SET_EVENT:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case LOADING_EVENT:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}

// name: "",
//   dateTime: "",
//   duration: 0,
//   createdAt: "",
//   organiser: "",
//   cca: "",
//   listOfAttendees: [],
//   listOfAbsentees: [],
//   eventId: "",
