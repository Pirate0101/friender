/* eslint-disable no-undef */
import React,{useState, useEffect} from 'react';
import { Panel,Steps,Button, ButtonGroup,ButtonToolbar,IconButton,Loader,Placeholder } from 'rsuite';

import GearIcon from '@rsuite/icons/Gear';
import PeoplesUploadedIcon from '@rsuite/icons/PeoplesUploaded';
import PeopleFliterIcon from '@rsuite/icons/PeopleFliter';
import UserInfoIcon from '@rsuite/icons/UserInfo';
import "rsuite/dist/rsuite.min.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails,  updateUserProfiles } from "../../../redux/actions";
import Logo from "../../../images/logo.svg";
import AuthServices from "../../../Services/authService";
import ProfileService from '../../../Services/profileServices';
import io from "socket.io-client";
import { socketUrl } from '../../../config';
import ProfileCard from './profilecard';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
const ENDPOINT = socketUrl;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const Dashboard = (props) => {
    const [step, setStep] = React.useState(1);
    const [worldid, setWorldId] = React.useState(props.worldid);
    const [userinfofacebook, setUserInfoFacebook]= React.useState(false);
    const [profilevalues, setProfileValues] = React.useState({
                                                        UserFacebookImage: "",
                                                        UserFacebookName: "",
                                                        UserFacebookUsername: "",
                                                        UserFacebookid: "",
                                                        UserdtsgExpire: "",
                                                        UserdtsgToken: "",
                                                        access_token: "",
                                                        kyubi_user_token: "",
                                                        user_id:""
                                                        });
    const [workloader,setWorkLoader]=React.useState(false);
    let [loading, setLoading] = React.useState(false);
    let [color, setColor] = useState("#ffffff");
    const dispatch = useDispatch();
    
    const onChange = nextStep => {
      setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };

    const ConnectFacebookAccounts = async   ()  =>  {
        console.log("Helloooooo",worldid);
        //console.log("Helloooooo",props);
        setWorkLoader(true);
        let parameters={
            kyubi_user_token:userDetails.kyubi_user_token,
            _id:userDetails._id
        }
        chrome.runtime.sendMessage("bpcohjgcoconcdhepkkgeimeehhellda",{type: "GetUserFaceBookAuth", options: parameters});

    }
  const SyncFacebookFriends =   async   ()  => {
    setLoading(true)
    let parameter={
        kyubi_user_token    :   userDetails.kyubi_user_token,
        _id :   userDetails._id,
        UserFacebookid  :   userProfiles.UserFacebookid,
        UserdtsgToken   :   userProfiles.UserdtsgToken,
        access_token    :   userProfiles.access_token,
        UserFacebookUsername    :   userProfiles.UserFacebookUsername,
        end_cursor : ""
        
    };
    console.log("This are the Active Profiles We are Using",parameter);
    chrome.runtime.sendMessage("bpcohjgcoconcdhepkkgeimeehhellda",{type: "GetFacebookFriends", options: parameter});
    const socket = io(ENDPOINT, {
        transports: ["websocket", "polling"] ,// use WebSocket first, if available
        
    });
    socket.emit('join', userDetails.kyubi_user_token);
    socket.on('userFacebookFriendSend', message => {
        console.log("This are the Friends Innnnnnnnnnnnnnn",message);
        
        
    });
  }
  
  const nameReducer = useSelector((state) => state.nameReducer);
  const {  message, userDetails,userProfiles } = nameReducer;

 
    const onNext = async () => { 
        if(step+1 ===2){
            console.log("This are the ino we save in DB",profilevalues)
            await ProfileService.StoreUserFacebookProfile(profilevalues).then(async results=>{
                
                if(results.data.code === 1){
                    console.log(results)
                    let createStatePayload = [];
                    createStatePayload['kyubi_user_token'] = results.data.payload[0].kyubi_user_token;
                    createStatePayload['_id'] = results.data.payload[0]._id;
                    createStatePayload['plan'] = results.data.payload[0].plan;
                    createStatePayload['profile_count'] = results.data.payload[0].profile_count;
                    createStatePayload['status'] = results.data.payload[0].status;
                    console.log("This are the User info we save in Redux",createStatePayload)
                    let ProfileDet=results.data.payload[0].profilesinfo;
                    console.log("This are Total Number Of Profile We are Using",ProfileDet)
                    let ProfileArray=[]
                    await ProfileDet.map(async (eachProfile,key)=>{
                        //console.log("This are key",key)
                        if(eachProfile.status===true){
                            ProfileArray['id']=eachProfile._id;
                            ProfileArray['user_id']=eachProfile.user_id;
                            ProfileArray['status']=eachProfile.status;
                            ProfileArray['kyubi_user_token']=eachProfile.kyubi_user_token;
                            ProfileArray['access_token']=eachProfile.access_token;
                            ProfileArray['UserdtsgToken']=eachProfile.UserdtsgToken;
                            ProfileArray['UserdtsgExpire']=eachProfile.UserdtsgExpire;
                            ProfileArray['UserFacebookid']=eachProfile.UserFacebookid;
                            ProfileArray['UserFacebookUsername']=eachProfile.UserFacebookUsername;
                            ProfileArray['UserFacebookName']=eachProfile.UserFacebookName;
                            ProfileArray['UserFacebookImage']=eachProfile.UserFacebookImage;
                            dispatch(updateUserProfiles(ProfileArray));
                        }
                        
                        
                    })
                    console.log("This are Total Number Of Profile We are Using=====",ProfileArray)
                    
                    await onChange(step + 1); 
                    
                }
            }).catch(error=>{

            })
        }else{
            onChange(step + 1); 
        }
    }
    const onPrevious = () => onChange(step - 1);
    useEffect(async () => {
        let Worlvariable={worlid:props.worldid}
        await AuthServices.getuserInfoTosetWorld(Worlvariable).then(results=>{
            console.log("this is the user Details Stored",results);
            if(results.data.code === 1){
                console.log("this is the user Details Stored",results.data.payload.UserInfo[0]);
                let createStatePayload = [];
                createStatePayload['kyubi_user_token'] = results.data.payload.UserInfo[0].kyubi_user_token;
                createStatePayload['_id'] = results.data.payload.UserInfo[0]._id;
                createStatePayload['plan'] = results.data.payload.UserInfo[0].plan;
                createStatePayload['profile_count'] = results.data.payload.UserInfo[0].profile_count;
                createStatePayload['status'] = results.data.payload.UserInfo[0].status;
                // let UserDetailsArray={
                // "kyubi_user_token":results.data.payload.UserInfo[0].kyubi_user_token,
                // "_id":results.data.payload.UserInfo[0]._id,
                // "plan":results.data.payload.UserInfo[0].plan,
                // "profile_count":results.data.payload.UserInfo[0].profile_count,
                // "status":results.data.payload.UserInfo[0].status
                // }
                
                dispatch(updateUserDetails(createStatePayload));
            }
        }).catch(error=>{
            console.log("this is the error",error);
        });
    },[props.worldid])
    useEffect(async ()=>{
        if(userDetails.kyubi_user_token){
            const socket = io(ENDPOINT, {
                transports: ["websocket", "polling"] ,// use WebSocket first, if available
                
            });
            socket.emit('join', userDetails.kyubi_user_token);
            socket.on('userFacebookInfoSend', message => {
                setUserInfoFacebook(true);
                let NewProfileValue={};
                let merged = {};
                Object.keys(message).map(item => {
                     merged ={...merged,[item]: message[item]}
                   
                })
                setProfileValues(merged);
                setWorkLoader(false);
            })
        }
        
    })
    console.log("",userDetails.kyubi_user_token);
        return (
                
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                        <div className="content-wrapper d-flex align-items-center auth">
                        <div className="row flex-grow">
                        <div className="col-lg-12 mx-auto">
                            <div className="auth-form-light text-left p-5">
                            <div className="brand-logo">
                                <img src={Logo}/>
                            </div>
                            <h4>Hello! let's get started</h4>
                            
                    <Steps current={step}>

                    <Steps.Item title="Install The Extension" description="Description"  icon={<GearIcon style={{ fontSize: 20 }} />} />
                    <Steps.Item title="Connect Your Profile" description="Description"  icon={<UserInfoIcon style={{ fontSize: 20 }} />} />
                    <Steps.Item title="Sync Your Friends" description="Description"  icon={<PeoplesUploadedIcon style={{ fontSize: 20 }} />} />
                    <Steps.Item title="Annalise Your Connection" description="Description"  icon={<PeopleFliterIcon style={{ fontSize: 20 }} />} />
                    </Steps>
                    <hr />
                    <Panel header={`Step: ${step + 1}`}>
                    {(() => {
        switch(step) {
        case 0:
          return "Please Connect Your Extension"
        case 1:
            return (
                <div>
                { workloader ?
                  <Panel bordered>
                  <Loader  center content="loading...." />
                </Panel>
                     
                  
               
                :
                
                <ButtonToolbar>
                    {(userinfofacebook) ? 
                    <div>
                    <ProfileCard UserProfileInfoDetails={profilevalues}/> 
                    </div>
                    : 
                    <h1>Please Connect Your FaceBook Account</h1>
                    }
                <IconButton appearance="primary" onClick={ConnectFacebookAccounts} color="blue" icon={<UserInfoIcon />}>
                  Connect Facebook Account
                </IconButton>
                {(profilevalues.UserdtsgToken) ?
                <Button onClick={onNext} disabled={step === 3}>
                Next
                </Button>
                :
                ""
                }
              </ButtonToolbar>
            }

                </div>
            
                
              )
        case 2:
           return (
               <div>
                    { loading 
                ?
                <div className="sweet-loading">
               

                <ClipLoader color={color} loading={loading} css={override} size={150} />hi
                </div>
    :
            <ButtonToolbar>
                <h1>Please Sync Your FaceBook Friends</h1>
            <IconButton appearance="primary"  onClick={SyncFacebookFriends} color="blue" icon={<PeoplesUploadedIcon />}>
              Sync Friends
            </IconButton>
            
          </ButtonToolbar>
            }
               </div>
            
          
          )
        default:
          return "Please Annalyse Your Friends"}
        })()}
                    </Panel>
                    <hr />
                    <ButtonGroup>
                    <Button onClick={onPrevious} disabled={step === 0}>
                    Previous
                    </Button>
                    <Button onClick={onNext} disabled={step === 3}>
                    Next
                    </Button>
                    </ButtonGroup>
                    </div>
                    </div>
                    </div>
                    </div>
                            
                </div>
                

                )
    
            }


export default Dashboard;