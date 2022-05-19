/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card';
import Spinner from '../../../components/bootstrap/Spinner';
import Icon from '../../../components/icon/Icon';
import { updateFaceBookProfile, updateUserProfiles } from "../../../redux/actions";
import ProfileService from '../../../Services/profileServices';
import ConnectFooter from './connect-footer';
import ProfileDetail from './profile-detail';
const Profile = (props)=>{
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
    const [profilevalues, setProfileValues] = React.useState({
		UserFacebookImage: "",
		UserFacebookName: "",
		UserFacebookUsername: "",
		UserFacebookid: "",
		UserdtsgExpire: "",
		UserdtsgToken: "",
		access_token: "",
		kyubi_user_token: "",
		collectionToken:"",
		user_id:""
		});
    const dispatch = useDispatch();
	const nameReducer = useSelector((state) => state.nameReducer);
	const {  userDetails,userProfiles,userInfo,facebookProfiles } = nameReducer;
    
    const connectFacebookstatus = async   (confirmFacebookData)  =>  {
        
        if(confirmFacebookData.connect){
        
        setProfileSectionState({
            ...profilesectionstate,
            headerText:"We are Connecting Your Faceboook Profile To Get The Required Info",
            mainClass:"warning",
            borderColor:"warning",
            footerState:false,
            bodySilentContent:"Please Make Sure You Are Already Logged in Facebook",
            bodyContent:<Spinner
            tag={ 'span' } // 'div' || 'span'
            color={ 'warning' } // 'primary' || 'secondary' || 'success' || 'info' || 'warning' || 'danger' || 'light' || 'dark'            
            size={ '10rem' } // Example: 10, '3vh', '5rem' etc.
             />
        })
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
            localStorage.setItem("FacebookProfilesCache",JSON.stringify(merged));
            if(merged.UserFacebookid && merged.UserdtsgToken){
                setProfileSectionState({
                    ...profilesectionstate,
                    headerText:"Please Confirm Do you Want to Use This Facebook Profile Or Not",
                    mainClass:"info",
                    borderColor:"info",
                    footerState:true,
                    footerContent:<ConnectFooter onConfirmConnect={connectFacebookstatus} userDetail = {userDetails} connectText = "Re-Connect" confirmButton={true}  onStoreNProccced={storeProfileInfo}/>,
                    bodySilentContent:"If You Want To Use This Profile Please Click on Confirm Button Or If Want to use another then login to the desired profile in Facebook then click on Re-Connect Button",
                    bodyContent:<ProfileDetail profileInfo={merged}/>
                })
            }
        })
        }
	};
    const  storeProfileInfo= async ( profileInfoStore)=>{
        let cacheProfile=JSON.parse(localStorage.getItem("FacebookProfilesCache"));

        
        setProfileSectionState({
            ...profilesectionstate,
            headerText:"Please wait We are storing Your Profile Info",
            mainClass:"secondary",
            borderColor:"secondary",
            footerState:false,
            footerContent:"",
            bodySilentContent:"",
            bodyContent:<Spinner
            tag={ 'span' } // 'div' || 'span'
            color={ 'secondary' } // 'primary' || 'secondary' || 'success' || 'info' || 'warning' || 'danger' || 'light' || 'dark'            
            size={ '10rem' } // Example: 10, '3vh', '5rem' etc.
             />
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
                    dispatch(updateFaceBookProfile(eachProfileData));
                    let Pfe=JSON.parse(localStorage.getItem("FacebookProfilesCache"));
                    console.log("This are Total Number Of Profile We are Using   134",Pfe)   
                    
                    props.onStoringFaceBookData(true)
					
			}
		}).catch(error=>{
            console.log(error)

		})
    }

    
    useEffect(()=>{
        
        if(props.sectionstate===0){

            setProfileSectionState({
                ...profilesectionstate,
                headerText:"Connect Your Facebook Profile With Friender To Procceed !!!!",
                mainClass:"primary",
                borderColor:"primary",
                bodyContent:"We Need You To Connect Your Facebook Profile",
                bodySilentContent:"Please Log-In to Your Facebook Account and Click On The Connect Button",
                footerState:true,
                footerContent:<ConnectFooter onConfirmConnect={connectFacebookstatus} userDetail = {userDetails} connectText = "Connect" confirmButton={false} onStoreNProccced={storeProfileInfo}/>,
                footerButtonColor:"primary",
                footerButtonText:"Connect"
            })
        }
        if(props.sectionstate ===2){
            let ProfileData=JSON.parse(localStorage.getItem("Profile"));
            setProfileSectionState({
                ...profilesectionstate,
                headerText:"Hi "+ProfileData.UserFacebookName,
                mainClass:"success",
                borderColor:"success",
                footerState:false,
                footerContent:"",
                bodySilentContent:"",
                bodyContent:<ProfileDetail profileInfo={ProfileData}/>
            })
        }
    },[userDetails,props])
    console.log(props)
return (
    <Card    className={`bg-l-${profilesectionstate.mainClass} bg-l-${profilesectionstate.mainClass}-hover`}	shadow={ '3d' } 	borderSize={ 1 } 	borderColor={ profilesectionstate.borderColor} 	>
        <CardHeader className='bg-transparent'>
            <CardLabel>
                <CardTitle tag='h4' className='h5'>
                    {profilesectionstate.headerText}
                </CardTitle>
            </CardLabel>
        </CardHeader>
        <CardBody>
            <div className='d-flex align-items-center pb-3'>
                <div className='flex-shrink-0'>
                    <Icon
                    icon='PersonAdd'
                    size='5x'
                    color={profilesectionstate.borderColor}
                    />
                </div>
                <div className='flex-grow-1 ms-3'>
                    <div className='fw-bold fs-4 mb-0'>
                        {profilesectionstate.bodyContent}
                    </div>
                    <div className='text-muted'>
                    {profilesectionstate.bodySilentContent}
                    </div>
                    <div className='fw-bold  fs-4 mb-0'>


                    </div>
                </div>
            </div>
        </CardBody>
        {profilesectionstate.footerState && (
            profilesectionstate.footerContent
        )}
        
    </Card>
    );
}
export default Profile;