import * as actionNames from '../../actions/actionTypes'


const initialState = {
    payload: {
        profileInfo: []
    }
}


const addProfileInfo = (state, action) => {
    return {

        payload: {
            ...state.payload,
            profileInfo: action.payload
        }
    }
}



const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionNames.ADD_PROFILE_INFO:
            return addProfileInfo(state, action)
        default:
            return state
    }
}

export default authReducer