import { SET_PENDING_REQUEST, LOADING_CCA, SET_DETAIL } from "../types";

const initialState = {
  pendingRequest: null,
  loading: false,
  name: "",
  listOfMembers: null,
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
    case SET_DETAIL:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
