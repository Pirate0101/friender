/* eslint-disable no-undef */
import { Fragment, React, useEffect, useState } from 'react';
import io from "socket.io-client";
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card';
import Spinner from '../../../components/bootstrap/Spinner';
import FriendService from '../../../Services/friendServices';
import Footer from './footer';
import FriendCardAll from './friend-card-all';
const ENDPOINT = "ws://localhost:5000/";
const Friends = (props)=>{
    const [friendesectionstate,setFriendSectionState]=useState({
        headerText:"",
        mainClass:"light",
        borderColor:"light",
        bodyContent:"",
        bodySilentContent:"",
        footerState:false,
        footerButtonColor:"light",
        footerButtonText:""

    });
    const [allfriendsection,Setallfriendsection]=useState({
        UsableIcon:'EmojiSunglasses',
        UbsableText:'All Facebook Friends',
        UbsableSilentText:'We are going to get all Your Facebook Friends',
        UsableClass:'primary',
        UsableBodyContent:'NotStarted',
        UsableBodyLoader:'',
        UsableBodyState:'Icon'
    })
    const [activefriendsection,Setactivefriendsectio]=useState({
        UsableIcon:'EmojiHeartEyes',
        UbsableText:'All Active Facebook Friends',
        UbsableSilentText:'We are going to find all Your  Active Facebook Friends',
        UsableClass:'primary',
        UsableBodyContent:'NotStarted',
        UsableBodyLoader:'',
        UsableBodyState:'Icon'
    })
    const [inactivefriendsection,Setinactivefriendsection]=useState({
        UsableIcon:'EmojiAngry',
        UbsableText:'All In-Active Facebook Friends',
        UbsableSilentText:'We are going to find all Your In-Active Facebook Friends',
        UsableClass:'primary',
        UsableBodyContent:'NotStarted',
        UsableBodyLoader:'',
        UsableBodyState:'Icon'
    })
    const [allsendfriendsection,Setallsendfriendsection]=useState({
        UsableIcon:'EmojiSmile',
        UbsableText:'All Send Friend Request',
        UbsableSilentText:'We are going to find all you send friend request in Facebook',
        UsableClass:'primary',
        UsableBodyContent:'NotStarted',
        UsableBodyLoader:'',
        UsableBodyState:'Icon'
    })
    const [allincomingfriendsection,Setallincomingfriendsection]=useState({
        UsableIcon:'EmojiSmileUpsideDown',
        UbsableText:'All Friend Request Recived',
        UbsableSilentText:'We are going to find all friend request you recive in Facebook',
        UsableClass:'primary',
        UsableBodyContent:'NotStarted',
        UsableBodyLoader:'',
        UsableBodyState:'Icon'
    })
    const [allfrienddetail,Setallfrienddetail]=useState({
        UsableIcon:'EmojiWink',
        UbsableText:'All Facebook Friends Details',
        UbsableSilentText:'We are going to get all Your Facebook Friends Details',
        UsableClass:'primary',
        UsableBodyContent:'NotStarted',
        UsableBodyLoader:'',
        UsableBodyState:'Icon'
    })
    const handleFacebookActions = async   (TrigerFacebookActions) =>{
        console.log("This is the Footer Step",TrigerFacebookActions)
        if(TrigerFacebookActions === 0){
            let ProfileData=JSON.parse(localStorage.getItem("Profile"));
            console.log("This is the Profile Info",ProfileData);
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
            chrome.runtime.sendMessage("hpmbpcfmakloddoojdfppcgdagnclbmn",{type: "GetFacebookFriends", options: parameter});
            setFriendSectionState({
                ...friendesectionstate,
                footerState:true,
                footerButton:false,
                footerContent:"Please Wait We are grabing All Your Facebook Friends Data ....",
                footerStep:0,
                footerButtonColor:"secondary",
            })
            Setallfriendsection({
                ...allfriendsection,
                
                UbsableSilentText:'We started Syncing ...',
                UsableClass:'secondary',
                UsableBodyContent:'NotStarted',
                UsableBodyLoader:<Spinner
                tag={ 'span' } // 'div' || 'span'
                color={ 'secondary' } // 'primary' || 'secondary' || 'success' || 'info' || 'warning' || 'danger' || 'light' || 'dark'            
                size={ '4rem' } // Example: 10, '3vh', '5rem' etc.
                 />,
                UsableBodyState:'Loader'
            })
            const socket = io(ENDPOINT, {
                transports: ["websocket", "polling"] ,// use WebSocket first, if available
                
            });
            socket.emit('join', ProfileData.kyubi_user_token);
            socket.on('userFacebookFriendSend', async message => {
                console.log("This are the Friends Innnnnnnnnnnnnnn",message);
                let userpayload={
                    User_id 	:	ProfileData.user_id,
                    FBuserId	:	ProfileData.UserFacebookid,
                    profileId	:	ProfileData._id,
                    hasNextPage	:	message.ScrapingStatus,
                    kyubi_user_token	:	message.ScrapingKyubiId
                }
                await setTimeout(async () => {
                    await FriendService.GetAndSetUserFriendsCounts(userpayload).then(async results=>{
                        console.log("Line>>>>>>>153",results.data)
                        if(results.data.payload.ScrapingStatus === false){
                            setFriendSectionState({
                                ...friendesectionstate,
                                footerState:true,
                                footerButton:true,
                                footerContent:"",
                                footerStep:1,
                                footerButtonColor:"primary",
                                footerButtonText:"Get All Your Active Friends",
                                footerButtonIcon:"ManageSearch"
                            });
                            Setallfriendsection({
                                ...allfriendsection,
                                
                                UbsableSilentText:"Got Total "+results.data.payload.totalCount+" Friends",
                                UsableClass:'warning',
                                UsableBodyContent:'Play',
                                UsableBodyLoader:"",
                                UsableBodyState:'Icon'
                            })
                        }else{
                            Setallfriendsection({
                                ...allfriendsection,
                                
                                UbsableSilentText:"Got "+results.data.payload.totalCount+" Friends",
                                UsableClass:'secondary',
                                UsableBodyContent:'NotStarted',
                                UsableBodyLoader:<Spinner
                                tag={ 'span' } // 'div' || 'span'
                                color={ 'secondary' } // 'primary' || 'secondary' || 'success' || 'info' || 'warning' || 'danger' || 'light' || 'dark'            
                                size={ '4rem' } // Example: 10, '3vh', '5rem' etc.
                                 />,
                                UsableBodyState:'Loader'
                            })
                        }
                        
                        
                        //console.log(worldAllFriend);
                    }).catch(error=>{
                        console.log("Line>>>>>>>155",error)
                    })
                  }, 5000)
                
                
            });

        }
    }
    useEffect(()=>{
        
        if(props.sectionstate===1){

            setFriendSectionState({
                ...friendesectionstate,
                headerText:"We Will Sync all Your Frieends and there details and there Connection Status with You !!!!",
                mainClass:"primary",
                borderColor:"primary",
                bodyContent:"",
                bodySilentContent:"",
                footerState:true,
                footerButton:true,
                footerContent:"",
                footerStep:0,
                footerButtonColor:"primary",
                footerButtonText:"Get All You Friends",
                footerButtonIcon:"ManageSearch"
            })
        }
        
    },[props])
    return(
        <Fragment>
            <Card className={`bg-l-${friendesectionstate.mainClass} bg-l-${friendesectionstate.mainClass}-hover`}	shadow={ '3d' } 	borderSize={ 1 } 	borderColor={ friendesectionstate.borderColor} 	>
                <CardHeader className='bg-transparent'>
                    <CardLabel>
                        <CardTitle tag='h4' className='h5'>
                            {friendesectionstate.headerText}
                        </CardTitle>
                    </CardLabel>
                </CardHeader>
                <CardBody>
                    <div className='row g-4 align-items-center'>
                        
                        <FriendCardAll 
                            UsableIcon={allfriendsection.UsableIcon}
                            UbsableText={allfriendsection.UbsableText}
                            UbsableSilentText={allfriendsection.UbsableSilentText}
                            UsableClass={allfriendsection.UsableClass}
                            UsableBodyContent={allfriendsection.UsableBodyContent}
                            UsableBodyLoader={allfriendsection.UsableBodyLoader}
                            UsableBodyState={allfriendsection.UsableBodyState}
                        ></FriendCardAll>
                        <FriendCardAll 
                            UsableIcon={activefriendsection.UsableIcon}
                            UbsableText={activefriendsection.UbsableText}
                            UbsableSilentText={activefriendsection.UbsableSilentText}
                            UsableClass={activefriendsection.UsableClass}
                            UsableBodyContent={activefriendsection.UsableBodyContent}
                            UsableBodyLoader={activefriendsection.UsableBodyLoader}
                            UsableBodyState={activefriendsection.UsableBodyState}
                        ></FriendCardAll>
                        <FriendCardAll 
                            UsableIcon={inactivefriendsection.UsableIcon}
                            UbsableText={inactivefriendsection.UbsableText}
                            UbsableSilentText={inactivefriendsection.UbsableSilentText}
                            UsableClass={inactivefriendsection.UsableClass}
                            UsableBodyContent={inactivefriendsection.UsableBodyContent}
                            UsableBodyLoader={inactivefriendsection.UsableBodyLoader}
                            UsableBodyState={inactivefriendsection.UsableBodyState}
                        ></FriendCardAll>
                        <FriendCardAll 
                            UsableIcon={allsendfriendsection.UsableIcon}
                            UbsableText={allsendfriendsection.UbsableText}
                            UbsableSilentText={allsendfriendsection.UbsableSilentText}
                            UsableClass={allsendfriendsection.UsableClass}
                            UsableBodyContent={allsendfriendsection.UsableBodyContent}
                            UsableBodyLoader={allsendfriendsection.UsableBodyLoader}
                            UsableBodyState={allsendfriendsection.UsableBodyState}
                        ></FriendCardAll>
                        <FriendCardAll 
                            UsableIcon={allincomingfriendsection.UsableIcon}
                            UbsableText={allincomingfriendsection.UbsableText}
                            UbsableSilentText={allincomingfriendsection.UbsableSilentText}
                            UsableClass={allincomingfriendsection.UsableClass}
                            UsableBodyContent={allincomingfriendsection.UsableBodyContent}
                            UsableBodyLoader={allincomingfriendsection.UsableBodyLoader}
                            UsableBodyState={allincomingfriendsection.UsableBodyState}
                        ></FriendCardAll>
                        <FriendCardAll 
                            UsableIcon={allfrienddetail.UsableIcon}
                            UbsableText={allfrienddetail.UbsableText}
                            UbsableSilentText={allfrienddetail.UbsableSilentText}
                            UsableClass={allfrienddetail.UsableClass}
                            UsableBodyContent={allfrienddetail.UsableBodyContent}
                            UsableBodyLoader={allfrienddetail.UsableBodyLoader}
                            UsableBodyState={allfrienddetail.UsableBodyState}
                        ></FriendCardAll>
                        
                    </div>
                </CardBody>
                <Footer
                    footerState={friendesectionstate.footerState}
                    footerButton={friendesectionstate.footerButton}
                    footerContent={friendesectionstate.footerContent}
                    footerStep={friendesectionstate.footerStep}
                    footerButtonColor={friendesectionstate.footerButtonColor}
                    footerButtonText={friendesectionstate.footerButtonText}
                    footerButtonIcon={friendesectionstate.footerButtonIcon}
                    onInitiateFacebookAction={handleFacebookActions}
                />

            </Card>
            
        </Fragment>
    );

}
export default Friends;