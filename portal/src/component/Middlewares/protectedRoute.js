

import { Route } from 'react-router'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails,  updateUserProfiles } from "../../redux/actions";
import MainLayout from "../Layout/mainlayout";
const ProtectedRoute = (props) => {
    console.log(props.datasection)
    const [usersState, setUsersState] = useState({props})
    const [usersComponent, setUsersComponent] = useState()
    const dispatch = useDispatch();
    const nameReducer = useSelector((state) => state.nameReducer);
    const {  message, userDetails,userProfiles } = nameReducer;
    console.log("heeee",userDetails);
    console.log("heeee",userProfiles);
    useEffect(async ()=>{
        setUsersComponent(usersState.component)
        setUsersState({props})
        console.log("hellllll",userDetails.kyubi_user_token);
    },[props])
    return (<div >
        
                <Route>
                <MainLayout datasection={usersState.props.datasection} />
                       
                </Route>
            </div>
        )
}
export default ProtectedRoute;
