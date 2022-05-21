/* eslint-disable no-undef */
import { css } from "@emotion/react";
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ScaleLoader from "react-spinners/ScaleLoader";
import io from "socket.io-client";
import { updateUserProfiles } from "../../../redux/actions";
import ProfileService from "../../../Services/profileServices";
import Profile from "./profile";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `;
const ProfileGraber = (props) =>{
    const dispatch = useDispatch();
    let [loading, setLoading] = React.useState(true);
    const nameReducer = useSelector((state) => state.nameReducer);
	const {  userDetails,userProfiles,userInfo,facebookProfiles } = nameReducer;
    let [color, setColor] = useState("#ffffff");
    const [profilesectionstate,setProfileSectionState]=useState({
        headerText:"",
        mainClass:"",
        borderColor:null,
        bodyContent:"",
        bodySilentContent:"",
        footerState:false,
        footerButtonColor:"",
        footerButtonText:""
    });
    const GrabFacebookProfile = async () => {
        setProfileSectionState({
            ...profilesectionstate,
            headerText:"We are Connecting Your Faceboook Profile To Get The Required Info",
            mainClass:"primary",
            body:true,
            bodyContent:"Please Have Patiente",
            bodySilentContent:"Please Make Sure You Are Already Logged in Facebook",
            footerState:true,
            footerStep:0,
            footerButtonColor:"primary",
            footerButtonText:"Connect",
            footerButtonState:2
        })
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",userDetails);
        let parameters={
            kyubi_user_token:userDetails.kyubi_user_token,
            _id:userDetails._id
        }
        console.log("This Are the Parameters",parameters);
        chrome.runtime.sendMessage("hpmbpcfmakloddoojdfppcgdagnclbmn",{type: "GetUserFaceBookAuth", options: parameters});
        const ENDPOINT = "ws://localhost:5000/";
        const socket = io(ENDPOINT, {
        transports: ["websocket", "polling"] ,// use WebSocket first, if available
        });
        await socket.emit('join', userDetails.kyubi_user_token);
        await socket.on('userFacebookInfoSend',async message => {
            console.log("This is the Return I got",message);
                let merged = {};
                await Object.keys(message).map(async item => {
                        merged ={...merged,[item]: message[item]}
                });
                console.log("This are the ProfileValue",merged);
                setProfileSectionState({
                    ...profilesectionstate,
                    headerText:"Profile Confirmation",
                    mainClass:"warning",
                    body:false,
                    StoreButton:true,
                    footerState:true,
                    footerStep:0,
                    footerButtonColor:"primary",
                    footerButtonText:"Re-Connect",
                    footerButtonState:1,
                    ProfileDetails:merged
                    })

                localStorage.setItem("FacebookProfilesCache",JSON.stringify(merged));

        })
    }
    const  storeProfileInfo= async ( profileInfoStore)=>{
        let cacheProfile=JSON.parse(localStorage.getItem("FacebookProfilesCache"));
        setProfileSectionState({
            ...profilesectionstate,
            headerText:"Please wait We are storing Your Profile Info",
            mainClass:"info",
            body:false,
            bodyContent:"Please Have Patiente",
            bodySilentContent:"Storing and Connecting your Facebook Profile with Friender",
            footerState:true,
            footerStep:0,
            footerButtonColor:"info",
            footerButtonText:"Connect",
            footerButtonState:2
        })
        console.log("8888888",cacheProfile);
        await ProfileService.StoreUserFacebookProfile(cacheProfile).then(async results=>{
			if(results.data.code === 1){
					let createStatePayload = [];
                    createStatePayload['kyubi_user_token'] = results.data.payload[0].kyubi_user_token;
                    createStatePayload['_id'] = results.data.payload[0]._id;
                    createStatePayload['plan'] = results.data.payload[0].plan;
                    createStatePayload['profile_count'] = results.data.payload[0].profile_count;
                    createStatePayload['status'] = results.data.payload[0].status;
					let ProfileDet=results.data.payload[0].profilesinfo;
                    let ProfileArray=new Array();
					let eachProfileData=new Array();
                    await ProfileDet.map(async (eachProfile,key)=>{
                       //let IndividualProfile=Object.entries(eachProfile);
                        eachProfileData.push(eachProfile)
                        if(eachProfile.status === true){
                            ProfileArray=eachProfile;
                        }                        
                    })            
					console.log("This are Total Number Of Profile We are Using   91",ProfileArray)  
					console.log("This are Total Number Of Profile We are Using   92",eachProfileData)   
					           
                    dispatch(updateUserProfiles(ProfileArray));
                    localStorage.setItem("Profile",JSON.stringify(ProfileArray));
                    
                    let Pfe=JSON.parse(localStorage.getItem("FacebookProfilesCache"));
                    console.log("This are Total Number Of Profile We are Using   134",Pfe)   
                    
                    props.onStoringFaceBookData(true)
					
			}
		}).catch(error=>{
            console.log(error)

		})
    }
    useEffect(()=>{
        console.log(props)
        if(props.sectionstate===2){
            let ProfileData=JSON.parse(localStorage.getItem("Profile"));
            setProfileSectionState({
                ...profilesectionstate,
                headerText:"Your Profile Information",
                mainClass:"success",
                body:false,
                StoreButton:false,
                footerState:false,
                footerStep:1,
                footerButtonColor:"success",
                footerButtonText:"Re-Connect",
                footerButtonState:0,
                ProfileDetails:ProfileData
                })
        }else{
            setProfileSectionState({
                ...profilesectionstate,
                headerText:"Connect Your Facebook Profile With Friender To Procceed !!!!",
                mainClass:"info",
                body:true,
                bodyContent:"We Need You To Connect Your Facebook Profile",
                bodySilentContent:"Please Log-In to Your Facebook Account and Click On The Connect Button",
                footerState:true,
                footerStep:0,
                footerButtonColor:"primary",
                footerButtonText:"Connect",
                footerButtonState:0,
                StoreButton:false,
            })
        }
        
    },[props]);
return(
        <div className="col-md-12 stretch-card grid-margin">
            <div className={`card bg-gradient-${profilesectionstate.mainClass} card-img-holder text-white`}>
              <div className="card-body">
                <h4 className="font-weight-normal mb-3">{profilesectionstate.headerText} <i className="mdi mdi-account mdi-24px float-right"></i>
                </h4>
                  {profilesectionstate.body === false ? 
                  <Profile profileInfo={profilesectionstate.ProfileDetails}/>
                  : 
                    <Fragment>
                        
                        <h2 className="mb-5">{profilesectionstate.bodyContent}</h2>
                        <h6 className="card-text">{profilesectionstate.bodySilentContent}</h6>
                    </Fragment>
                
                  }
                
                
              </div>
              
              { profilesectionstate.footerStep ===0 ? 
                
                    (() => {
                    switch (profilesectionstate.footerButtonState) {
                    case 0:
                    return (
                        <div className='card-footer'> 
                        <button type="button" onClick={GrabFacebookProfile} className={`btn btn-outline-${profilesectionstate.footerButtonColor} btn-icon-text btn-fw`}>{profilesectionstate.footerButtonText}</button>
                    </div>
                    );
                    case 1:
                    return (
                        <div className='card-footer'> 
                    <div className="template-demo mt-2">
                    <button type="button" onClick={GrabFacebookProfile} className={`btn btn-outline-${profilesectionstate.footerButtonColor} btn-icon-text btn-fw`}>{profilesectionstate.footerButtonText}</button>
                    <button type="button" onClick={storeProfileInfo} className={`btn btn-outline-success btn-icon-text btn-fw`}>Store Your FB Profile Info</button>
                    </div>
                    </div>);
                    
                    default:
                    return <div className='card-footer'> <ScaleLoader color={color} loading={loading} css={override} size={15} />  </div> ;
                    }
                    })()
                
                       
              :
              ""
              }
                
              
            </div>
        </div>
);
}
export default ProfileGraber;