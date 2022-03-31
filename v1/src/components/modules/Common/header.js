import React, { Component } from "react";
import { Redirect, withRouter } from 'react-router-dom'
import logo from "../../../images/logo.svg";
import { NavLink } from "react-router-dom";
import  plog from "../../../images/avatar_a.png";
import  sideMenuLogo from "../../../images/side_menu.svg";
import  SettingServices from "../../../services/setting";
import  LoadingLogo from "../../../images/Loader.gif";
import loginHelper from  "../../../helper/loginHelper.js";
import { connect } from 'react-redux';
import { GetData } from "../../../helper/helper";
import * as authAction from '../../../store/actions/Auth/authAction';
class header extends Component {
    constructor(props) {
        super(props)
        this.state = {
          selected:this.props.selectedtab,
          openNavBar:false,
          default_message:0,
          autoresponder_status:0,
          ready_for_activate:0,
          user_name:"XXXXXX",
          user_image:plog,
          meven_status:0,
         loader:false
        }
        
      }
      HideMenu = (event) => {
        event.preventDefault();
        // console.log(this.props.shownav);
        this.setState({
            openNavBar:false
        })
      }
      autoSetting = async (event) => {
        const gfs = chrome.storage.local;
        this.setState({loader:true});
        let payload = {
        }
        // console.log("hiyy",this.state.meven_status )
        let Token = await GetData('kyubi_user_token');
        if(this.state.meven_status === 0){
          this.setState({meven_status:1})
          payload = {
              update_load_status:1,
              kyubi_user_token:Token
            }
          let LC=loginHelper.login();
        }else{
            this.setState({meven_status:0})
              payload = {
                update_load_status:0,
                kyubi_user_token:Token
              }
            let LO = loginHelper.logout();
        }
        await SettingServices.updateLoadStatus(payload).then(async result=>{
          if(result.data.code==1){
                  let responsenewvalue =result.data;
                  gfs.set({'kyubi_user_token': responsenewvalue.payload.UserInfo.kyubi_user_token});
                  gfs.set({'user_id': responsenewvalue.payload.UserInfo.user_id});
                  gfs.set({'fb_id': responsenewvalue.payload.UserInfo.facebook_id});
                  gfs.set({'fb_username': responsenewvalue.payload.UserInfo.facebook_name});
                  gfs.set({'fb_name': responsenewvalue.payload.UserInfo.facebook_profile_name});
                  gfs.set({'fb_image': responsenewvalue.payload.UserInfo.facebook_image});
                  
                  if(responsenewvalue.payload.UserSettings.default_message){
                    gfs.set({'default_message': responsenewvalue.payload.UserSettings.default_message});
                  }else{
                    gfs.set({'default_message': 0});
                  }
                  if(responsenewvalue.payload.UserSettings.default_message_text){
                    gfs.set({'default_message_text': responsenewvalue.payload.UserSettings.default_message_text});
                  }else{
                    gfs.set({'default_message_text': ""});
                  }
                  if(responsenewvalue.payload.UserSettings.autoresponder){
                    gfs.set({'autoresponder': responsenewvalue.payload.UserSettings.autoresponder});
                    
                  }else{
                    gfs.set({'autoresponder': 0});
                  }
                  if(responsenewvalue.payload.UserSettings.default_time_delay){
                    gfs.set({'default_time_delay': responsenewvalue.payload.UserSettings.default_time_delay});
                  }
                  
                  gfs.set({'keywordsTally': responsenewvalue.payload.AutoResponderKeywords});
                  let createStatePayload = [];
                  createStatePayload['UserName']=await GetData('fb_username');
                  createStatePayload['UserImage']=await GetData('fb_image');
                  createStatePayload['UserLoginFacebook']=await GetData('fb_logged_id');
                  createStatePayload['UserAutoResponder']=await GetData('autoresponder');
                  createStatePayload['UserDefaultMessage']=await GetData('default_message');

                  this.props.setProfileInfo(createStatePayload);
                  let default_message, autoresponder_status;
                  autoresponder_status=createStatePayload['UserAutoResponder'];
                  default_message=createStatePayload['UserDefaultMessage'];
                  this.setState({
                    autoresponder_status : autoresponder_status,
                    default_message : default_message
                  })
                  this.setState({loader:false});
          }
        }).catch(error=>{
          this.setState({loader:false});
        });

      }
      ShowMenu = async(event) => {
        const gfs = chrome.storage.local;
        event.preventDefault();
        // console.log(this.props.shownav);
        this.setState({
            openNavBar:true
        });

        let fb_username,
         fb_image,
         autoresponder,
         default_message;

         fb_username=await GetData('fb_username');
         fb_image=await GetData('fb_image');
         autoresponder=await GetData('autoresponder');
         default_message=await GetData('default_message');
        // console.log("I am In Header");
        if(fb_username){
          this.setState({
            user_name:fb_username
        });
        }
        if(fb_image){
          this.setState({
            user_image:fb_image
        });
        }
        if(autoresponder){
          if(autoresponder=="1"){
            this.setState({
            meven_status:1
            });
          }
          this.setState({
            autoresponder_status:autoresponder
          });
        }
        if(default_message){
          if(default_message=="1"){
            this.setState({
            meven_status:1
            });
          }
          this.setState({
            default_message:default_message
          });
        }
        
      }
    
    componentDidMount = async () => {
      // console.log("I am in sidebar -- header1 =====",this.props.ProfileInfo);
      // console.log("I am in sidebar -- header1 =====",this.props.ProfileInfo.profileInfo);
      // console.log("I am in sidebar -- header1 =====",this.props.ProfileInfo.profileInfo["UserImage"]);
      // this.props.ProfileInfo.profileInfo[0].map(result=>{
      //   // console.log("User Name ===",result)
      // })
      
      //const{UserLoginFacebook,UserAutoResponder,UserDefaultMessage} = this.props.ProfileInfo.profileInfo[0];
      // console.log("User Name ===",NewPropsState.UserLoginFacebook)
      // console.log("User Name ===",NewPropsState.UserAutoResponder)
      // console.log("User Name ===",NewPropsState.UserDefaultMessage)
      this.setState({loader:true});
      let fb_username,
      fb_image,
      autoresponder,
      default_message;

      fb_username=await GetData('fb_username');
      fb_image=await GetData('fb_image');
      autoresponder=await GetData('autoresponder');
      default_message=await GetData('default_message');
        // console.log("I am In Header Auto  Responder",autoresponder,"Default Message",default_message);
        if(this.props.ProfileInfo.profileInfo["UserName"]){
          this.setState({
            user_name:this.props.ProfileInfo.profileInfo["UserName"]
        });
        }
        if(this.props.ProfileInfo.profileInfo["UserImage"]){
          this.setState({
            user_image:this.props.ProfileInfo.profileInfo["UserImage"]
        });
        }
        if(this.props.ProfileInfo.profileInfo["UserAutoResponder"]){
          if(this.props.ProfileInfo.profileInfo["UserAutoResponder"]=="1"){
            this.setState({
            meven_status:1
            });
          }
          this.setState({
            autoresponder_status:this.props.ProfileInfo.profileInfo["UserAutoResponder"]
          });
        }
        if(this.props.ProfileInfo.profileInfo["UserDefaultMessage"]){
          if(this.props.ProfileInfo.profileInfo["UserDefaultMessage"]=="1"){
            this.setState({
            meven_status:1
            });
          }
          this.setState({
            default_message:this.props.ProfileInfo.profileInfo["UserDefaultMessage"]
          });
        }
        this.setState({loader:false});
    }
    render() {
        return (
            <div className="gen_header">
              {this.state.loader && (   
                                <div className="after_login_refresh"><img src={process.kyubi.loader.preLoader} alt=""/></div>
              )}
              <div className="logo"><img src={process.kyubi.logo.primary_logo} alt="" /></div>
              <div className="hBtnWrapper">
                <div className="toogler">
                  <label className="switch_box box_1">
                    {this.state.autoresponder_status == "1" || this.state.default_message == "1" ?
                      <div>
                        <input type="checkbox" className="switch_1" name="meven_status" onChange={this.autoSetting} id="swich" name="togg" checked/>
                        <div className="toogler"></div>
                      </div>
                      
                    :
                      <div>
                        <input type="checkbox" className="switch_1" name="meven_status" onChange={this.autoSetting} id="swich" name="togg" />
                        <div className="toogler"></div>
                      </div>
                    }

                  </label>
                </div>
                <div className="slide_menu_click">
                  <a href="#" className="side_click" onClick={this.ShowMenu} ><img src={sideMenuLogo}/></a>
                  <div className={this.state.openNavBar ?"slider_menu active":"slider_menu"}>
                      <a href="#" onClick={this.HideMenu} className="cross">X</a>
                      <div className="after_log_profile">
                        <img src={this.state.user_image} alt=""/>
                        <p>Welcome</p>
                        <h3>{this.state.user_name}</h3>
                      </div>
                      <ul className="menunav">
                        <li><NavLink  to="/dashboard"><img src="images/menuicon4.svg" /> Dashboard</NavLink></li>
                        <li><NavLink  to="/setting"><img src="images/menuicon3.svg"/> Settings</NavLink></li>
                        <li><NavLink  to="/delay_setting"><img src="images/menuicon3.svg"/> Delay Setting</NavLink></li>
                        <li><NavLink  to="/logout"><img src="images/menuicon1.svg"/> Logout</NavLink></li>
                      </ul>
                  </div>
                </div>
              </div>
            </div>
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(header));