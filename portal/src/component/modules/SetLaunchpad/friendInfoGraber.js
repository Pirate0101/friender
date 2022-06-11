/* eslint-disable no-undef */
import { Fragment, useEffect, useState } from 'react';
import StepCardpro from './stepCardPro';
const FriendInfoGraber= (props)=>{
    const [friendsectionstate,setFriendSectionState]=useState({
        headerText:"",
        mainClass:"",
        borderColor:null,
        bodyContent:"",
        bodySilentContent:"",
        footerButton:true,
        footerButtonColor:"danger",
        footerButtonText:"Start Scanning",
        footerLoader:"",
        footerText:""
    });
    const [totalFriendStat,settotalFriendStat]=useState({
        icon:"mdi mdi-account-convert",
        maintext:"All Facebook Friends",
        count:0,
        pstate:"Not-Initiated",
        
    });
    const [totalActiveFriendStat,settotalActiveFriendStat]=useState({
        icon:"mdi mdi-account-multiple-plus",
        maintext:"All Facebook Active Friends",
        count:0,
        pstate:"Not-Initiated",
        
    });
    const [totalInActiveFriendStat,settotalInActiveFriendStat]=useState({
        icon:"mdi mdi-account-multiple-minus",
        maintext:"All Facebook In-Active Friends",
        count:0,
        pstate:"Not-Initiated",
        
    });
    const [totalFriendRequestStat,settotalFriendRequestStat]=useState({
        icon:"mdi mdi-emoticon-tongue",
        maintext:"All Facebook Friend Request Send",
        count:0,
        pstate:"Not-Initiated",
        
    });
    const [totalFriendReciveStat,settotalFriendReciveStat]=useState({
        icon:"mdi mdi-emoticon-happy",
        maintext:"All Facebook Friend Request Recive",
        count:0,
        pstate:"Not-Initiated",
        
    });
    
    useEffect(()=>{
        console.log("we are inside FriendGrabber",props)
        if(props.sectionstate===1){
            setFriendSectionState({
                    ...friendsectionstate,
                    headerText:"We are going to Get all Your Facebook Connection",
                    mainClass:"info",
                    body:true,
                    bodyContent:"We Need You To Connect Your Facebook Profile To Grab All Your Friends",
                    bodySilentContent:"Please Log-In to Your Facebook Account and Click On The Scan Button To Start The Process It can Take Time So Please Be Patient",
                    footerButton:true,
                    footerButtonColor:"danger",
                    footerButtonText:"Start Scanning",
                    footerLoader:"",
                    footerText:"",
                    stepCard:true
            })
        }else if(props.sectionstate===0){
            setFriendSectionState({
                ...friendsectionstate,
                headerText:"We are going to Get all Your Facebook Connection",
                mainClass:"info",
                body:true,
                bodyContent:"We Need You To Connect Your Facebook Profile To Grab All Your Friends",
                bodySilentContent:"Please First Connect Your Facebook Account in Previous Step then Come Back here again",
                footerButton:true,
                footerButtonColor:"danger",
                footerButtonText:"Start Scanning",
                footerLoader:"",
                footerText:"",
                StoreButton:false,
                stepCard:false
        })
        }
    },[props]);
    const ScanFacebookProfileFriend = async() =>{
        let ProfileData=JSON.parse(localStorage.getItem("Profile"));
        let parameter={
            kyubi_user_token    :   ProfileData.kyubi_user_token,
            _id 	:	ProfileData._id,
            UserFacebookid  :   ProfileData.UserFacebookid,
            UserdtsgToken   :   ProfileData.UserdtsgToken,
            access_token    :   ProfileData.access_token,
            UserFacebookUsername    :   ProfileData.UserFacebookUsername,
            UsercollectionToken :   ProfileData.UsercollectionToken,
            UserProfileId   : ProfileData._id,
            end_cursor : ""
            
        };
        console.log("This is the Profile Info",parameter);
        chrome.runtime.sendMessage("hpmbpcfmakloddoojdfppcgdagnclbmn",{type: "GetSentRequestDetails", options: parameter});
    }
    return (
    <div className="col-md-12 stretch-card grid-margin">
    <div className={`card bg-gradient-${friendsectionstate.mainClass} card-img-holder text-white`}>
        <div className="card-body">
            <h4 className="font-weight-normal mb-3">{friendsectionstate.headerText} <i className="mdi mdi-account mdi-24px float-right"></i>
            </h4>
            {friendsectionstate.body ?
            <Fragment>
                <h2 className="mb-5">{friendsectionstate.bodyContent}</h2>
                <h6 className="card-text">{friendsectionstate.bodySilentContent}</h6>
                
            </Fragment>
            :
            ""
            }
            {friendsectionstate.stepCard?
            <div className="row">
                <StepCardpro  setdate={totalFriendStat}/>
                <StepCardpro   setdate={totalActiveFriendStat}/>
                <StepCardpro   setdate={totalInActiveFriendStat}/>
                <StepCardpro   setdate={totalFriendRequestStat}/>
                <StepCardpro   setdate={totalFriendReciveStat}/>
                
            </div>
            
            :
            ""
            }
        
        </div>
        <div className='card-footer'> 
            {friendsectionstate.footerButton?
           <button type="button" onClick={ScanFacebookProfileFriend} className={`btn btn-gradient-${friendsectionstate.footerButtonColor} btn-fw`}>Start {friendsectionstate.footerButtonText}</button>
            :
            ""
            }
        
        </div>
        </div>
        </div>
        )
}
export default FriendInfoGraber;