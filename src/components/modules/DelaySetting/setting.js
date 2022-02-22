import React, { Component } from "react";
import Header from "../Common/header";
import Footer from "../Common/footer";
import delaysettingService from "../../../services/delaysettingServices";
import { GetData } from "../../../helper/helper"
class setting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            responseSetting:1,
            messageSetting:0,
            loader:false,
            delay_hrs:null,
            delay_minute:null,
            delay_status:false
        }
      }
    /**
    * @inputChangeHandller 
    * getting input field values
    */
    inputChangeHandller = (event) => {
        // console.log(event.target);
        this.setState({ [event.target.name]: event.target.value })
    }
    autoSetting = async (event) => {
        if(this.state.delay_status === false){
            this.setState({delay_status:true})
        }else{
            this.setState({delay_status:false})
        }
    }
    submitAddDefaultMessage  =    async   (event) =>  {
        const gfs = chrome.storage.local;
        this.setState({loader:true});
        event.preventDefault();
        let user_id = await GetData('user_id');;
        
        let payload =   {
            delay_hrs:this.state.delay_hrs,
            delay_minute:this.state.delay_minute,
            delay_status:this.state.delay_status,
            user_id: user_id
        }
        
        delaysettingService.setSetting(payload).then(result=>{
            // console.log("This I got From backGround SUSSSSS",result);
            if(result.data.code==1){
                let responsenewvalue =result.data.payload;
                if(responsenewvalue.delay_setting == 1){
                    this.setState({delay_status:true});
                }else{
                    this.setState({delay_status:false});
                }
                let toatlminutes=parseInt(responsenewvalue.delay_time);
                if(toatlminutes<60){
                    this.setState({
                        loader:false,
                        delay_hrs:0,
                        delay_minute:toatlminutes
                    });
                }else{
                    let constmin =60;
                    let hrs = Math. floor(toatlminutes/constmin);
                    let mins = toatlminutes%constmin;
                    // console.log("Total Hrs =",hrs);
                    // console.log("Total Mins =",mins);
                    this.setState({
                        loader:false,
                        delay_hrs:hrs,
                        delay_minute:mins
                    });
                }
                

            }else{
                this.setState({
                    loader:false,
                    delay_hrs:null,
                    delay_minute:null,
                    delay_status:false
                })  

            }
        }).catch(error=>{
            // console.log("This I got From backGround EROOOOOO",error);
        })
        // console.log("This Inf I have to Send",payload);
    }
      componentDidMount = async () => {
          this.setState({loader:true})
          let params ={
            user_id    :   await GetData('user_id')
          };
          delaysettingService.getSetting(params).then(result=>{
            // console.log("This I got From backGround SUSSSSS",result);
            if(result.data.code==1){
                let responsenewvalue =result.data.payload;
                if(responsenewvalue.delay_setting == 1){
                    this.setState({delay_status:true});
                }else{
                    this.setState({delay_status:false});
                }
                let toatlminutes=parseInt(responsenewvalue.delay_time);
                if(toatlminutes<60){
                    this.setState({
                        loader:false,
                        delay_hrs:0,
                        delay_minute:toatlminutes
                    });
                }else{
                    let constmin =60;
                    let hrs = Math. floor(toatlminutes/constmin);
                    let mins = toatlminutes%constmin;
                    // console.log("Total Hrs =",hrs);
                    // console.log("Total Mins =",mins);
                    this.setState({
                        loader:false,
                        delay_hrs:hrs,
                        delay_minute:mins
                    });
                }
                

            }else{
                this.setState({
                    loader:false,
                    delay_hrs:null,
                    delay_minute:null,
                    delay_status:false
                })  

            }
        }).catch(error=>{
            // console.log("This I got From backGround EROOOOOO",error);
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
                <div class="toggleSettings">
                    <p>
                        Delay AutoResponder Response
                        <span class="toggler">
                            <label class="switch_box box_1">
                            {this.state.delay_status === false ?
                            <input type="checkbox" 
                            className="switch_1" 
                            name="delay_status" 
                            onChange={this.autoSetting} 
                            id="swich" 
                            name="togg"
                            />
                            :
                            <input type="checkbox" 
                                    className="switch_1" 
                                    name="delay_status" 
                                    onChange={this.autoSetting} 
                                    id="swich" 
                                    name="togg" 
                                    checked
                            />
                            }
                                
                                <span className="toogler"></span>
                            </label>
                        </span>
                    </p>

                    <div class="settingsMore active">
                    <input type="number" placeholder="HH"  min="0" max="24"  name="delay_hrs" value={this.state.delay_hrs} onChange={this.inputChangeHandller} />
                            
                        <span>:</span>
                        <input type="number" placeholder="MM" min="0" max="60"  name="delay_minute" value={this.state.delay_minute} onChange={this.inputChangeHandller} />
                    </div>

                    <div class="submitFormSettings">
                        <button class="blue_btn submitSettings" onClick={this.submitAddDefaultMessage} >Save</button>
                    </div>
                </div>
                <Footer></Footer>
                </div>
            </div>

        )
                }
}
export default setting;
