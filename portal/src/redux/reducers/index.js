import { SET_FIRST_NAME, SET_LAST_NAME,SET_USER_DETAILS, SET_USER_PROFILE  } from "../types";

const INITIAL_STATE = {
  firstName: "John",
  lastName: "Doe",
  message: "",
  userDetails:[],
  userProfiles:[]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        ...action.payload,
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return INITIAL_STATE;
  }
};
