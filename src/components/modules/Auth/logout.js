import React, { Component} from "react";
import { Redirect, withRouter } from 'react-router-dom';
import loginHelper from "../../../helper/loginHelper";
import {kyubiExtensionId}  from "../../../config";
import "./login.css";

class logout extends Component {
    constructor(props) {
        super(props)
        this.state = {
          
        }
        

      }
      componentDidMount(){
        const gfs = chrome.storage.local;
        
        gfs.remove(['fb_id']);
        gfs.remove(['token']);
        gfs.remove(['keywordsTally']);
        gfs.remove(['inBackgroundFetching']);
        gfs.remove(['fb_image']);
        gfs.remove(['fb_logged_id']);
        gfs.remove(['fb_name']);
        gfs.remove(['fb_username']);
        gfs.remove(['autoresponder']);
        gfs.remove(['kyubi_user_token']);
        gfs.remove(['user_id']);
        gfs.remove(['default_message_text']);
        gfs.remove(['fb_username']);
        gfs.remove(['default_time_delay']);
        gfs.remove(['default_message']);
        gfs.remove(['individualThreadList']);
       
        gfs.remove(['profileFetch']);
        gfs.remove(['messageListFetch']);
        gfs.remove(['individualMessageFetch']);
        let LO = loginHelper.logout();
        gfs.remove(['fbthread']);
        gfs.remove(['fbmunread']);
        gfs.remove(['fbprofile']);
        this.props.history.push('/');
         
      }
    render() {
        return (

          <div className="wrapper">
            
            

            <div className="content-wrapper">
              <section className="content-header">
                <div className="container-fluid">
                  <div className="row mb-12">
                    <div className="col-sm-6">
                      
                    </div>
                  </div>
                </div>
              </section>
              <section className="content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12">
                    <div class="alert alert-danger alert-dismissible">
                  
                  <h5><i class="icon fas fa-ban"></i> Alert!</h5>
                  Thanks For Being With Us We are Loging You Out
                </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          
        );
    }
}
export default logout;