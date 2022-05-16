import { SET_FACEBOOK_PROFILES, SET_USER_DETAILS, SET_USER_INFO, SET_USER_PROFILE } from "../types";

export const updateUserDetails = (userDetails) => (dispatch, getState) => {
  try {
    console.log(SET_USER_DETAILS);
    dispatch({
      type: SET_USER_DETAILS,
      payload: {
        userDetails,
        message: `Update Lastname ${
          getState().nameReducer.userDetails
        } to ${userDetails} `,
      },
    });
  } catch (error) {
    console.log("Error", error);
  }
};
export const updateUserProfiles = (userProfiles) => (dispatch, getState) => {
  try {
    console.log(SET_USER_PROFILE);
    console.log(userProfiles);
    dispatch({
      type: SET_USER_PROFILE,
      payload: {
        userProfiles,
        message: `Update Lastname ${
          getState().nameReducer.userProfiles
        } to ${userProfiles} `,
      },
    });
  } catch (error) {
    console.log("Error", error);
  }
};
export const updateUserInfo = (userInfo) => (dispatch, getState) => {
  try {
    console.log(SET_USER_INFO);
    dispatch({
      type: SET_USER_INFO,
      payload: {
        userInfo
      },
    });
  } catch (error) {
    console.log("Error", error);
  }
};
export const updateFaceBookProfile = (facebookProfiles) => (dispatch, getState) => {
  try {
    dispatch({
      type: SET_FACEBOOK_PROFILES,
      payload: {
        facebookProfiles,
        message: `Update User Profiles Information ${
          getState().nameReducer.facebookProfiles
        } to ${facebookProfiles} `,
      },
    });
  } catch (error) {
    console.log("Error", error);
  }
};
