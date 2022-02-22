import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { OpenFacebookInTab, CheckUserInfoFromFaccebook, OpenFacebookProfileInTab, GetData } from '../../../helper/helper'
import Header from "../Common/header";
import Footer from "../Common/footer";
import loginHelper from "../../../helper/loginHelper";
import settingService from "../../../services/setting";
import AuthServices from "../../../services/authService";
// import { GetData } from "../../../helper/helper"
import biglogo from "../../../images/biglogo.svg";
import RefreshLogo from "../../../images/layer1.svg";
import FaceBookLogo from "../../../images/fb_blue.svg";
import IconLogo from "../../../images/icon.svg";
import LoaderLogo from "../../../images/Loader.gif";
import * as authAction from '../../../store/actions/Auth/authAction';
let port = chrome.runtime.connect({name: "time to send message"});


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fb_image: "",
      fb_name: "XXXXX",
      fb_username: "",
      fb_id: "",
      fb_logged_id: "",
      autoresponder: "0",
      default_message: "0",
      loader: true,
      is_user_logged_in_facebook: "false"
    }
  }
  fbHandler = async (event) => {
    event.preventDefault();
    let fb_logged_id = await GetData('fb_logged_id');
    // console.log("You Are Loged in ksjhdfgbkjhtdfg", fb_logged_id);
    if (fb_logged_id === "false") {
      OpenFacebookInTab();
    } else {
      OpenFacebookProfileInTab();
    }
  }
  autoresponderHandler = async (event) => {
  }
  refreshHandler = async (event) => {
    event.preventDefault();

    this.setState({
      loader: true
    })
      loginHelper.login();
    // CheckUserInfoFromFaccebook();
    setTimeout(async () => {
      let fb_username, fb_image, fb_name, fb_id, default_message, autoresponder, fb_logged_id;
      fb_username = await GetData('fb_username')
      fb_image = await GetData('fb_image')
      fb_name = await GetData('fb_name')
      fb_id = await GetData('fb_id')
      default_message = await GetData('default_message')
      autoresponder = await GetData('autoresponder')
      fb_logged_id = await GetData('fb_logged_id')
      let createStatePayload = [];
      createStatePayload['UserName'] = fb_username;
      createStatePayload['UserImage'] = fb_image;
      createStatePayload['UserLoginFacebook'] = fb_logged_id;
      createStatePayload['UserAutoResponder'] = autoresponder
      createStatePayload['UserDefaultMessage'] = default_message
      // console.log(" fb_name, fb_id in dashboard after refresh : ",  fb_name, fb_id,);
      // console.log(" createStatePayload in dashboard : ",  createStatePayload);

      this.props.setProfileInfo(createStatePayload);
      this.setState({
        fb_image: fb_image,
        fb_username: fb_username,
        fb_name: fb_name,
        fb_id: fb_id,
        is_user_logged_in_facebook: fb_logged_id,
        loader: false
      })

    },5000);
  }
  componentDidMount = async () => {
    const gfs = chrome.storage.local;
    let params = {
      user_rec: await GetData('kyubi_user_token')
    };
      // console.log("params : ", params);
      AuthServices.userRetrive(params).then(async result => {
        // console.log("This I got From backGround SUSSSSS", result.data.payload);
        if (result.data.code == 1) {
          let responsenewvalue = result.data;
          let UserName = responsenewvalue.payload.UserInfo.facebook_name;
          let UserImage = responsenewvalue.payload.UserInfo.facebook_image;
          let UserLoginFacebook = await GetData('fb_logged_id');
          let UserAutoResponder = 0;
          let UserDefaultMessage = 0;
          gfs.set({ 'kyubi_user_token': responsenewvalue.payload.UserInfo.kyubi_user_token });
          gfs.set({ 'user_id': responsenewvalue.payload.UserInfo.user_id });
          gfs.set({ 'fb_id': responsenewvalue.payload.UserInfo.facebook_fbid });
          gfs.set({ 'fb_username': responsenewvalue.payload.UserInfo.facebook_name });
          gfs.set({ 'fb_name': responsenewvalue.payload.UserInfo.facebook_profile_name });
          gfs.set({ 'fb_image': responsenewvalue.payload.UserInfo.facebook_image });

          if (responsenewvalue.payload.UserSettings.default_message) {
            gfs.set({ 'default_message': responsenewvalue.payload.UserSettings.default_message });
          } else {
            gfs.set({ 'default_message': 0 });
          }
          if (responsenewvalue.payload.UserSettings.default_message_text) {
            gfs.set({ 'default_message_text': responsenewvalue.payload.UserSettings.default_message_text });
            UserDefaultMessage = 1;
          } else {
            gfs.set({ 'default_message_text': "" });
          }
          if (responsenewvalue.payload.UserSettings.autoresponder) {
            gfs.set({ 'autoresponder': responsenewvalue.payload.UserSettings.autoresponder });
            UserAutoResponder = 1;
          } else {
            gfs.set({ 'autoresponder': 0 });
          }
          if (responsenewvalue.payload.UserSettings.default_time_delay) {
            gfs.set({ 'default_time_delay': responsenewvalue.payload.UserSettings.default_time_delay });
          }

          gfs.set({ 'keywordsTally': JSON.stringify(responsenewvalue.payload.AutoResponderKeywords) });
          let fb_image, fb_name, fb_username, fb_logged_id, fb_id;
          fb_username = await GetData('fb_username')
          fb_image = await GetData('fb_image')
          fb_name = await GetData('fb_name')
          fb_id = await GetData('fb_id')
          fb_logged_id = await GetData('fb_logged_id')
          // console.log(" fb_name, UserImage in dashboard : ",  fb_name+"\n"+UserImage);
          // console.log("fb_image, fb_name, fb_username, fb_logged_id, fb_id : ", fb_image+"\n"+fb_name+"\n"+fb_username+"\n"+fb_logged_id+"\n"+fb_id);
          this.setState({
            fb_image: fb_image,
            fb_name: fb_name,
            fb_username: fb_username,
            is_user_logged_in_facebook: fb_logged_id,
            loader: false
          })
          let createStatePayload = [];
          createStatePayload['UserName'] = UserName;
          createStatePayload['UserImage'] = UserImage;
          createStatePayload['UserLoginFacebook'] = UserLoginFacebook;
          createStatePayload['UserAutoResponder'] = UserAutoResponder;
          createStatePayload['UserDefaultMessage'] = UserDefaultMessage;
          // console.log(" createStatePayload in dashboard : ",  createStatePayload);

          this.props.setProfileInfo(createStatePayload);

        } else {
          let fb_image, fb_name, fb_username, fb_logged_id, default_message, autoresponder;
          fb_username = await GetData('fb_username')
          fb_image = await GetData('fb_image')
          autoresponder = await GetData('autoresponder')
          default_message = await GetData('default_message')
          fb_logged_id = await GetData('fb_logged_id')
          fb_name = await GetData('fb_name');
          // console.log(" fb_name in dashboard : ",  fb_name);
          let createStatePayload = [];
          createStatePayload['UserName'] = fb_username;
          createStatePayload['UserImage'] = fb_image;
          createStatePayload['UserLoginFacebook'] = fb_logged_id;
          createStatePayload['UserAutoResponder'] = autoresponder;
          createStatePayload['UserDefaultMessage'] = default_message;
          // console.log(" createStatePayload in dashboard : ",  createStatePayload);
          // let NewCreateStatePayload = JSON.stringify(createStatePayload);

          this.props.setProfileInfo(createStatePayload);
          this.setState({
            fb_image: fb_image,
            fb_name: fb_name,
            fb_username: fb_username,
            is_user_logged_in_facebook: fb_logged_id,
            loader: false
          })
        }
        // console.log("this.state.is_user_logged_in_facebook : ", this.state.is_user_logged_in_facebook);
      }).catch(error => {
        // console.log("This I got From backGround EROOOOOO dash2", error);
      })
      gfs.set({ "redux": this.props.ProfileInfo.profileInfo })
    
  }
  render() {
    return (
      <div>
        {this.state.loader && (
          <div className="after_login_refresh"><img src={process.kyubi.loader.preLoader} alt="" /></div>
        )}
        <div className="dashboard">
          <Header selectedtab="dashboard"></Header>

          <div className="after_log_profile">
            <img src={this.state.fb_image} alt="" />
            <p>Welcome</p>
            <h3>{this.state.fb_username}</h3>
          </div>
          <div className="fb_login_request">
            {this.state.is_user_logged_in_facebook === true ?
              ""
              :
              <div className="login_caution">
                <img src={IconLogo} alt="" />
                Please login to your Facebook profile and click the refresh button below to proceed further.
              </div>
            }

            <a onClick={this.refreshHandler} href="#" className="bluebtn"><img src={RefreshLogo} alt="" /> Refresh</a>
            <a onClick={this.fbHandler} href="#" className="whitebtn"><img src={FaceBookLogo} alt="" /> Facebook</a>
          </div>
          <Footer></Footer>
        </div>
      </div>
    );
  }
}
/**
 * @mapStateToProps
 * grab the values from redux store
 */
const mapStateToProps = state => {
  return {
    ProfileInfo: state.auth.payload
  };
};
/**
* @mapDispatchToProps 
* sending the values to redux store
*/

const mapDispatchToProps = (dispatch) => {
  return {
    setProfileInfo: (load) => dispatch(authAction.addProfileInfo(load))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));