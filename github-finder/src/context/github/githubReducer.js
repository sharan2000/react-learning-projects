import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        is_loading: false,
        users: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        is_loading: true,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        is_loading: false,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        is_loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        is_loading: false,
      };

    default:
      return state;
  }
};
