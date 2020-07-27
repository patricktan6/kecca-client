import { SET_PENDING_REQUEST, SET_ERRORS, LOADING_CCA } from "../types";

const initialState = {
  pendingRequest: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PENDING_REQUEST:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case LOADING_CCA:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
