import React, { Component } from "react";
import Header from "../Common/header";
import Footer from "../Common/footer";
import ResponseSetting from "../Setting/ResponseSetting/responseSetting";
import MessageSetting  from "../Setting/DefaultMessageSettings/defaultMessageSettings"
class setting extends Component {
    constructor(props) {
        super(props)
        this.state = {
          responseSetting:1,
          messageSetting:0,
          loader:false
        }
      }
      activateResponseSetting  = async (event) =>  {
        event.preventDefault();
        this.setState({
            responseSetting:1,
            messageSetting:0
        })
        
      }
      activateMessageSetting  = async (event) =>  {
        event.preventDefault();
        this.setState({
            responseSetting:0,
            messageSetting:1
        })
        
      }
      render() {
        return (
            <div>
                {this.state.loader && (   
                    <div className="after_login_refresh"><img src={process.kyubi.loader.preLoader} alt=""/></div>
                )}
                <div className="dashboard">
                <Header selectedtab="setting"></Header>
                <ul class="maintab">
                    <li><a href="" onClick={this.activateResponseSetting} id="responce" className={this.state.responseSetting ?"active":""}>Response Settings</a></li>
                    <li><a href="" onClick={this.activateMessageSetting} id="message" className={this.state.messageSetting ?"active":""}>Message Settings</a></li>
                </ul>
                {this.state.responseSetting ?
                <ResponseSetting></ResponseSetting>
                :
                <MessageSetting></MessageSetting>
                }
                <Footer></Footer>
                </div>
            </div>

        )
                }
}
export default setting;