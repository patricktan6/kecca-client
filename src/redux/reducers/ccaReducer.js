import { SET_PENDING_REQUEST, SET_ERRORS } from "../types";

const initialState = {
  pendingRequest: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PENDING_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
