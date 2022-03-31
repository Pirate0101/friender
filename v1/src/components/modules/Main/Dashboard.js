import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {  GetData } from '../../../helper/helper'
import Header from "../Common/header";
import Footer from "../Common/footer";
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

  componentDidMount = async () => {

    
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