/* eslint-disable no-undef */
import GearIcon from '@rsuite/icons/Gear';
import PeopleFliterIcon from '@rsuite/icons/PeopleFliter';
import PeoplesUploadedIcon from '@rsuite/icons/PeoplesUploaded';
import UserInfoIcon from '@rsuite/icons/UserInfo';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { Button, ButtonGroup, Panel, Steps } from 'rsuite';
import "rsuite/dist/rsuite.min.css";
import { updateUserDetails } from "../../../redux/actions";
import AuthServices from "../../../Services/authService";
import FriendInfoGraber from './friendInfoGraber';
import ProfileGraber from './profileGraber';
const SetLaunchpad = (props) => {
    const {id} = useParams()
    const [step, setStep] = useState(0);
    const [sectionstate,setSectionState]=useState({
		profileState:0,
		friendsState:0,
		syncState:0,
		activityState:0
	})
    
    const onChange = nextStep => {
      setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };
    const  StoreFaceBookData =async (isProfiledataStored) => {
		console.log("This is It",isProfiledataStored);
		setSectionState({...sectionstate,
			profileState:2,
			friendsState:1
		});
        onChange(step + 1);
	}
    const dispatch = useDispatch();
	const nameReducer = useSelector((state) => state.nameReducer);
	const {  userDetails,userProfiles,userInfo,facebookProfiles } = nameReducer;
    useEffect(() => {
        async function fetchUserData() {
            console.log("this is the user Details Stored",props.worldid);
            let Worlvariable={worlid:props.worldid}
            await AuthServices.getuserInfoTosetWorld(Worlvariable).then(async results=>{
                console.log("this is the user Details Stored",results);
                if(results.data.code === 1){
                    console.log("this is the user Details Stored",results.data.payload.UserInfo[0]);
                    let createStatePayload = [];
                    createStatePayload['kyubi_user_token'] = results.data.payload.UserInfo[0].kyubi_user_token;
                    createStatePayload['_id'] = results.data.payload.UserInfo[0]._id;
                    createStatePayload['plan'] = results.data.payload.UserInfo[0].plan;
                    createStatePayload['profile_count'] = results.data.payload.UserInfo[0].profile_count;
                    createStatePayload['status'] = results.data.payload.UserInfo[0].status;
                    
                    dispatch(updateUserDetails(createStatePayload));
                }
            })
            if(localStorage.getItem("Profile")){
                // let ProfileData=JSON.parse(localStorage.getItem("Profile"));
                setSectionState({...sectionstate,
                    profileState:2,
                    friendsState:1
                })
            }
        }
        fetchUserData();
    },[props.worldid])
  
    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);
        return (
                
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                        <div className="content-wrapper d-flex align-items-center auth">
                        <div className="row flex-grow">
                        <div className="col-lg-12 mx-auto">
                            <div className="auth-form-light text-left p-5">
                            
                            <h4>Hello! let's get started</h4>
                            
                    <Steps current={step}>

                    <Steps.Item title="Install The Extension" description="Description"  icon={<GearIcon style={{ fontSize: 20 }} />} />
                    <Steps.Item title="Connect Your Profile" description="Description"  icon={<UserInfoIcon style={{ fontSize: 20 }} />} />
                    <Steps.Item title="Sync Your Friends" description="Description"  icon={<PeoplesUploadedIcon style={{ fontSize: 20 }} />} />
                    <Steps.Item title="Annalise Your Connection" description="Description"  icon={<PeopleFliterIcon style={{ fontSize: 20 }} />} />
                    </Steps>
                    <hr />
                    <Panel header={`Step: ${step + 1}`}>
                        {step}
                        {(() => {
        switch(step) {
        case 0:
          return <ProfileGraber sectionstate={sectionstate.profileState} onStoringFaceBookData={StoreFaceBookData} />
        case 1:
            return <FriendInfoGraber sectionstate={sectionstate.friendsState} />
        case 2:
            return "Please Annalyse Your Friends3"
        default:
          return "Please Annalyse Your Friends4"}
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


export default SetLaunchpad;