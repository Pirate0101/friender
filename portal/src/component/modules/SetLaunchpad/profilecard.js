import React, { useState, useEffect } from "react";
import { defaultClassPrefix } from "rsuite/esm/utils";
import {  IconButton, ButtonToolbar,Message } from 'rsuite';
import { Panel } from 'rsuite';
import UserBadgeIcon from '@rsuite/icons/UserBadge';
const ProfileCard   =   (props) =>  {
    let request = props.request;
    console.log("This Are The Reqqqqq",props.UserProfileInfoDetails.UserFacebookImage);
    useEffect(() => {
        
    }, []);
    return (
        <div>
        {(props.UserProfileInfoDetails.UserdtsgToken) ?
            <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240 }}>
            <img src={props.UserProfileInfoDetails.UserFacebookImage} height="240" />
            <Panel header={props.UserProfileInfoDetails.UserFacebookName}>
            <p>
            <small>
            If You Want to Use This FaceBook Profile Please Click Next Or IF you Want 
            to Switch Your Profile then Please Log-out from Facebook And log-in to your
             desired profile then please re-click on the "Connect to Facebook Account.                                           
            
            </small>
            </p>
            <ButtonToolbar>
                  <IconButton appearance="primary" color="blue" icon={<UserBadgeIcon />}>
                    Visit Profile
                  </IconButton>
                  
                </ButtonToolbar>
            </Panel>
            </Panel>
            :
            <div>
            
            <Message  showIcon type="warning" header="Sorry">
              Please Log In to Your Facebook Account to Proceeed.
              
            </Message>
            </div>
        }
        </div>
        

    );

};
export default ProfileCard;