import * as actionNames from '../actionTypes.js'

export const addProfileInfo = (load) => {
    return {
        type    : actionNames.ADD_PROFILE_INFO,
        payload : load
    }
}
