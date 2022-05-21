import { SET_FACEBOOK_PROFILES, SET_USER_DETAILS, SET_USER_INFO, SET_USER_PROFILE } from "../types";

const INITIAL_STATE = {
  message: "",
  userDetails:[],
  userProfiles:[],
  userInfo:[],
  facebookProfiles:[]
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
    case SET_USER_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case SET_FACEBOOK_PROFILES:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return INITIAL_STATE;
  }
};
