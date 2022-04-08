import { SET_USER_DETAILS,SET_USER_PROFILE } from "../types";

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

