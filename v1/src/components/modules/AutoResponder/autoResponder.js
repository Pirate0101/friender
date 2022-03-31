import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "../Common/sidebar";
import AutoResponderService from  "../../../services/autoResponderServices";
import settingService   from  "../../../services/setting";
import { GetData } from "../../../helper/helper"
class autoResponnder extends Component {
    constructor(props) {
      super(props)
      this.state = {
        autoresponderList :[],
        loader:true
      }
    }
    componentDidMount= async () => {
        const gfs = chrome.storage.local;
        let UserToken = await GetData('kyubi_user_token');
        
        //this.setState({autoresponderList:autoresponderList})
        let payload ={
            user_id:UserToken
        }
        AutoResponderService.listAutoResponder(payload).then(async response =>{
        //   // console.log("This is what i Got",response);
          if(response.data.payload !=  "" ){
            // console.log("This is what i Got",response.data.payload);
            if(response.data.payload.autokey.length>0){
                // console.log("This is what i Got",response.data.payload.autokey);
                this.setState({autoresponderList:response.data.payload.autokey})
            }
            
          }
          
            this.setState({loader:false});
        }).catch(error=>{
            this.setState({loader:false});
        });

    
    
        let user_id = await GetData('user_id');
        
          let Newpayload   ={user_id:user_id }
          settingService.getUserDetails(Newpayload).then(result  =>{
            // console.log("This is what i111 Got",result);
                    gfs.set({'kyubi_user_token': result.data.payload.UserInfo.kyubi_user_token});
                    gfs.set({'user_id': result.data.payload.UserInfo.user_id});
                    gfs.set({'fb_id': result.data.payload.UserInfo.facebook_id});
                    gfs.set({'fb_username': result.data.payload.UserInfo.facebook_name});
                    gfs.set({'fb_name': result.data.payload.UserInfo.facebook_profile_name});
                    gfs.set({'fb_image': result.data.payload.UserInfo.facebook_image});
                      

                      if(result.data.payload.UserSettings.default_message){
                        gfs.set({'default_message': result.data.payload.UserSettings.default_message});
                        // localStorage.setItem('default_message', result.data.payload.UserSettings.default_message);
                      }
                      if(result.data.payload.UserSettings.default_message_text){
                        gfs.set({'default_message_text': result.data.payload.UserSettings.default_message_text});
                        // localStorage.setItem('default_message_text', result.data.payload.UserSettings.default_message_text);
                      }
                      if(result.data.payload.UserSettings.autoresponder){
                        gfs.set({'autoresponder': result.data.payload.UserSettings.autoresponder});
                        // localStorage.setItem('autoresponder', result.data.payload.UserSettings.autoresponder);
                      }
                      if(result.data.payload.UserSettings.default_time_delay){
                        gfs.set({'default_time_delay': result.data.payload.UserSettings.default_time_delay});
                        // localStorage.setItem('default_time_delay', result.data.payload.UserSettings.default_time_delay);
                      }
                      
                        gfs.set({'keywordsTally': result.data.payload.UserSettings.AutoResponderKeywords});
                        // localStorage.setItem('keywordsTally', JSON.stringify(result.data.payload.AutoResponderKeywords));
          }).catch(error=>{
            // console.log("This is what i222 Got",error);
          })

    
    }
    render() {
        return (
            <div className="wrapper">
                {this.state.loader && (   
                <div className="overlay">
                <i className="fas fa-2x fa-sync-alt fa-spin"></i>
                </div>
                )}
                <Sidebar  selectedtab="setting"></Sidebar>
                <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-12">
                            <div className="col-sm-6">
                            <h1>Auto-Responder</h1>
                            
                            <NavLink  to="/autorespondercreate"  class="btn btn-app">
                                <i class="fas fa-plus-square"></i> Create New Auto-Responder
                            </NavLink>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row overflow-auto">
                            <div className="col-md-12">
                            {Object.keys(this.state.autoresponderList).length > 0 ?
                            (this.state.autoresponderList.map((data, i) => {
                                let editlink= "/autoresponderedit/"+data._id;
                            return(
                                
                            <div className={data.status ===  1 ? "card card-success shadow-none" : "card card-danger shadow-none" }>
                                <div className="card-header">
                                    <h3 className="card-title">{data.auto_responder_name}</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                        <NavLink  to={editlink}><i className="far fa-edit"></i></NavLink>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body" >
                                    <div className={data.status ===  1 ? "callout callout-success" : "callout callout-danger" }>
                                        <h6>Response Message :</h6>
                                        <p>{data.message}</p>
                                    </div>
                                    <div className={data.status ===  1 ? "callout callout-success" : "callout callout-danger" }>
                                        <h6>Keywords :</h6>
                                        <p>
                                        {data.autoresponderkeywords.map((result, i) => {
                                        return (
                                            <span class="badge badge-info">{result.keywords}</span>
                                        )
                                        })
                                        }
                                        
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            )
                            }))
                            :
                            (this.state.loader ? " ": 
                            <div className="card card-danger shadow-none">
                            <div className="card-header">
                                <h3 className="card-title">Oops !</h3>
                                <div className="card-tools">
                                    
                                </div>
                            </div>
                            <div className="card-body" >
                                <div className="callout callout-danger">
                                    <h5>Sorry There Is No Auto-Responder</h5>
                                    
                                </div>
                                
                            </div>
                            </div> 
                                )
                              
                            }       
                            
                            </div>
                        </div>
                    </div>
                </section>
                </div>
            </div>
    
        );
    }
}

export default autoResponnder;