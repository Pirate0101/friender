import React, { Component } from "react";
import AutoResponder from "../ResponseSetting/IndividualComponents/autoResponder";
import DefaultMessage from "../ResponseSetting/IndividualComponents/defaultMessage";
class responseSetting extends Component {
    constructor(props) {
        super(props)
        this.state = {
          autoResponsederSetting:1,
          
          DefaultMessageSetting:0,
          
          loader:false
        }
      }
      activateAutoResponder  = async (event) =>  {
        event.preventDefault();
        this.setState({
            autoResponsederSetting:1,
            DefaultMessageSetting:0
        })
        
      }
      activateDefaultMessage  = async (event) =>  {
        event.preventDefault();
        this.setState({
            autoResponsederSetting:0,
            DefaultMessageSetting:1
        })
        
      }
      render() {
        return (
            <div id="tabResponse" className="maintabcontent">
                <ul class="subtab">
                  <li>
                    <a href="#" onClick={this.activateAutoResponder} className={this.state.autoResponsederSetting ?"active":""} id="autoResponder">
                    {this.state.autoResponsederSetting ?<img src="images/icon1a.svg" className="active"/>:<img src="images/icon1b.svg" className="inactive"/>}
                    Auto Responder</a>
                  </li>
                  <li>
                    <a href="#" onClick={this.activateDefaultMessage} id="defaultMessage" className={this.state.DefaultMessageSetting ?"active":""}>
                    {this.state.DefaultMessageSetting ?<img src="images/icon2b.svg" className="active"/>:<img src="images/icon2a.svg" className="inactive"/>}
                    Default Message</a>
                  </li>
                </ul>
                {this.state.autoResponsederSetting ?
                  <AutoResponder></AutoResponder>
                :
                  <DefaultMessage></DefaultMessage>
                }
            </div>          
        )
      }
}
export default responseSetting;