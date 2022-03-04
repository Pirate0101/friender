import React, { useState, useEffect } from "react";
import Header from "../Common/header";
import Footer from "../Common/footer";
import IconLogo from "../../../images/icon.svg";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import {profileGetter} from "../../../helper/profileHelper";
import { GetData } from "../../../helper/helper";
import AuthServices from "../../../services/authService";
import FriendService from "../../../services/friendService";
import Moment from 'react-moment';
import LinearProgress from '@mui/material/LinearProgress';
const Setting = () =>  {
  const [profile, setProfile] = useState({
    name: "XXXXXXXX",
    id: "",
    dtsg_token: "",
    image: IconLogo,
    username: "XXXXXXX",
    default: 0,
    time:"00:00:00"
  });
  const [friendlist, setFriendList] = useState({
    totalfriend: 0 ,
    totalfriendcapture: 0,
    totalfriendcapturepersentage: 0
  });
  const [friendscrapingstatus, setFriendScrapingStatus] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [loader, setloader] = useState(false);
  const [progress, setProgress] = useState(false);
  const [circularloading, setCircularloading] = useState(false);
  const steps = [
    {
      label: 'Connect Your Facebook Profile',
      description: `The Internet has always been, and always will be, a magic box..
                    So Please let us connect with your profile so that we can do some more.....`,
      action: `Connect Your Profile`
    },
    {
      label: 'Sync Your Friends List',
      description:
        `A family is a risky venture, because the greater the love, the greater the loss…
         That’s the trade-off. But I’ll take it all.
         let Sync your Friend List`,
      action: `Sync Friends`
    },
    {
      label: 'Create an ad',
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
      action: `Sync Friends Engagement`
    },
  ];
  const handleNext = () => {
    //setloader(true)
    stepActionInitiator()
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const gfs = chrome.storage.local;
  //This Function will fetch User Set Profile Info
  const fetchProfileInfo = async () =>{
    setloader(true)
    let user_idLocal=await GetData('user_id');
    if(user_idLocal){
      let payloadProfile= {
        user_id:user_idLocal
      }
      AuthServices.GetProfile(payloadProfile).then(async result => {
        console.log("This Is The User Info",result);
        if (result.data.code == 1){
          setloader(false);
          setProfile({
            name: result.data.payload.UserFacebookName,
            id: result.data.payload.UserFacebookid,
            dtsg_token:result.data.payload.UserdtsgToken,
            image: result.data.payload.UserFacebookImage,
            username: result.data.payload.UserFacebookUsername,
            time:result.data.payload.UserdtsgExpire
            
          })
          
          gfs.set({'UserdtsgToken': result.data.payload.UserdtsgToken});
          gfs.set({'UserFacebookid': result.data.payload.UserFacebookid});
          gfs.set({'UserFacebookUsername': result.data.payload.UserFacebookUsername});
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }else{
          setloader(false)
        }
      }).catch(error=>{
        setloader(false)
        
      });
    }else{
      setloader(false)
    }
  }
  //This is for the initial Facebook Profile Grabing
  useEffect(() => {  
    fetchProfileInfo();
  }, []);
  // This Function Will Fetch User Facebook Information
  const fetchFacebookProfileInfo  = async ()  =>  {
    setCircularloading(true);
    await AuthServices.getProfileInfo().then(async ProfileResult => {
      //This will regex the response
      let ProfileInfoGetter =await profileGetter(ProfileResult);
      if(ProfileInfoGetter.FacebookStatus){
        setProfile({
          name: ProfileInfoGetter.UserFacebookName,
          id: ProfileInfoGetter.UserFacebookid,
          dtsg_token:ProfileInfoGetter.UserdtsgToken,
          image: ProfileInfoGetter.UserFacebookImage,
          username: ProfileInfoGetter.UserFacebookUsername,
          time:ProfileInfoGetter.UserdtsgExpire
        });
          const gfs = chrome.storage.local;
          gfs.set({'UserdtsgToken': ProfileInfoGetter.UserdtsgToken});
          gfs.set({'UserFacebookid': ProfileInfoGetter.UserFacebookid});
          gfs.set({'UserFacebookUsername': ProfileInfoGetter.UserFacebookUsername});
          ProfileInfoGetter.user_id=await GetData('user_id');
          ProfileInfoGetter.kyubi_user_token=await GetData('kyubi_user_token');
          let ProfileInfo = {
            UserFacebookName: ProfileInfoGetter.UserFacebookName,
            UserFacebookid: ProfileInfoGetter.UserFacebookid,
            UserdtsgToken:ProfileInfoGetter.UserdtsgToken,
            UserFacebookImage: ProfileInfoGetter.UserFacebookImage,
            UserFacebookUsername: ProfileInfoGetter.UserFacebookUsername,
            UserdtsgExpire:ProfileInfoGetter.UserdtsgExpire,
            user_id: ProfileInfoGetter.user_id,
            kyubi_user_token:ProfileInfoGetter.kyubi_user_token
          }
          await AuthServices.GetOrStoreProfile(ProfileInfo).then(async result=>{
            if(result.data.code == 1){
              setProfile({
                name: result.data.payload.UserFacebookName,
                id: result.data.payload.UserFacebookid,
                dtsg_token:result.data.payload.UserdtsgToken,
                image: result.data.payload.UserFacebookImage,
                username: result.data.payload.UserFacebookUsername,
                time:result.data.payload.UserdtsgExpire
                
              })
              setCircularloading(false);
              setActiveStep(1);
            }else{
              console.log("Error For Profile Info Storing1");
              setCircularloading(false);
            }
            
          }).catch(error=>{
            console.log("Error For Profile Info Storing2");
            setCircularloading(false);
          });
      }else{
        //Error For Profile Info 
        console.log("Error For Profile Info Scraping2");
        setCircularloading(false);
      }
    }).catch(error=>{
      console.log("Error For Profile Info Storing1");
      setCircularloading(false);
    });
  }
  // This Function will fetch Facebook Friends
  const fetchFacebookFriendsListAndCounts = async (user_id,dtsgToken,Facebookid,Username,FacebookCursior)  =>  {
    setProgress(true);
    
    let TotalFriendPayload ={
      dtsg:dtsgToken,
      FBuserId:Facebookid,
      cursor:FacebookCursior
    }
    FriendService.GetFacebookFriends(TotalFriendPayload).then(async resultFriendList=>{
      console.log("This are the Facebook Info",resultFriendList)
      if(resultFriendList.success){
        let payloadCountStore={
          totalfriendCount:resultFriendList.count,
          friends:resultFriendList.friends,
          UserFacebookid:Facebookid,
          user_id:user_id
        }
        console.log("this are the payload we have to sent to backend",payloadCountStore)
      }else{
      console.log("Error For Getting the Friend Info");
      setProgress(false);
      }
    }).catch(error=>{
      console.log("From Setting Page",error);
      setProgress(false);
    })
  }
  // This Function Depending on the step will perform the Pulling action
  const stepActionInitiator = async ()  =>{
    if(activeStep === 0){
      console.log("Please call the function to get the user facebook Info");
      fetchFacebookProfileInfo();
      //setActiveStep(1);
    }else if(activeStep === 1){
      console.log("Please call the function to get the user facebook Friend Info");
    let user_idLocal=await GetData('user_id');
    let UserdtsgTokenLocal=await GetData('UserdtsgToken');
    let UserFacebookidLocal=await GetData('UserFacebookid');
    let UserFacebookUsernameLocal=await GetData('UserFacebookUsername');
    let UserFacebookCursior = ""
      fetchFacebookFriendsListAndCounts(user_idLocal,UserdtsgTokenLocal,UserFacebookidLocal,UserFacebookUsernameLocal,UserFacebookCursior);
      //setActiveStep(2);
    }else{
      console.log("Please call the function to get the user facebook Friend Association Info");
      //setActiveStep(3);
    }
  }

  return  (
    <div className="settings">
      {loader && (
          <div className="after_login_refresh"><img src={process.kyubi.loader.preLoader} alt="" /></div>
      )}
      <Header selectedtab="dashboard"></Header>

          <div className="after_log_profile">
            <img src={profile.image} alt="" />
            <p>Welcome</p>
            <h3>{profile.name}</h3>
            <h5>{profile.username}</h5>
            <h7>Your Profile is Synced for <Moment date={profile.time} format="hh:mm:ss" trim durationFromNow unix interval={1000}/></h7>
            
          </div>
          <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {circularloading === false ?
                
                  <div>
                  {progress === false ?
                  <div>
                    <Typography>{step.description}</Typography>
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? 'Finish' : step.action}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </div>
                    </Box>
                  </div>
                  :
                  
                  <StepContent>
                    <Box sx={{ maxWidth: 400 }}>
                      <Box sx={{ width: '80%' }}>
                        <LinearProgress variant="determinate"  value={friendlist.totalfriendcapturepersentage} />
                      </Box>
                      <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary">Syncked {friendlist.totalfriendcapture} out of {friendlist.totalfriend} ({friendlist.totalfriendcapturepersentage}%) ....</Typography>
                      </Box>
                    </Box>
                  </StepContent>
                  }
                  </div>
                
                :
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress color="primary" />
                </Box>
                
                }
              </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
    </div>
  );
}
export default Setting;