/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import Card, {
	CardBody, CardHeader, CardLabel,
	CardTitle
} from '../../../components/bootstrap/Card';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { layoutMenu } from '../../../menu';
import { updateUserDetails, updateUserInfo } from "../../../redux/actions";
import AuthServices from "../../../Services/authService";
import Friendsync from '../friend-sync/friend';
import Profile from '../profile-card/profile';
const Blank = (props) => {
	
	const {id} = useParams()
	
	const dispatch = useDispatch();
	const [sectionstate,setSectionState]=useState({
		profileState:0,
		friendsState:0,
		syncState:0,
		activityState:0
	})
	useEffect(() => {
		async function fetchUserData() {
		  // You can await here
		  let Worlvariable={worlid:id}
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
				dispatch(updateUserInfo(createStatePayload));
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
	  }, [id]); 
	const  StoreFaceBookData =async (isProfiledataStored) => {
		console.log("This is It",isProfiledataStored);
		setSectionState({...sectionstate,
			profileState:2,
			friendsState:1
		})
	  }
	return (
		<PageWrapper title={layoutMenu.setWorld.text}>
			<Page>
				<div className='row d-flex align-items-center h-100'>
					<div
						className='col-12 d-flex justify-content-center'
						style={{ fontSize: 'calc(3rem + 3vw)' }}>
						<p>Welcome to Friender </p>
						
			
					</div>
					<div className='col-lg-12'>
					<Card className='shadow-3d-primary'>
							<CardHeader>
								<CardLabel icon='Summarize' iconColor='success'>
									<CardTitle tag='h4' className='h5'>
										Setting Up Friender WOrld
									</CardTitle>
								</CardLabel>
								
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<div className='col-md-6'>
										<Profile sectionstate={sectionstate.profileState} onStoringFaceBookData={StoreFaceBookData} />
									</div>
									<div className='col-md-6'>
									     <Friendsync sectionstate={sectionstate.friendsState}  />
									</div>
								</div>
							</CardBody>
					</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Blank;
