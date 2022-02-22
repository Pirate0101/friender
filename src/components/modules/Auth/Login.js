import React, { Component} from "react";
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {kyubiExtensionId}  from "../../../config";
import "./login.css";
import AuthServices from "../../../services/authService";
import loginHelper from "../../../helper/loginHelper";
import  {OpenPoweredBy,OpenTier5Partnership,OpenFacebookLink,OpenMessengerLink,OpenSignupLink, GetData} from  '../../../helper/helper';
import logo from "../../../images/logo1.svg";
import biglogo from "../../../images/biglogo.svg";
import LoaderLogo from "../../../images/Loader.gif"
import mail from "../../../images/mail.svg";
import lock from "../../../images/lock.svg";
import messanger from "../../../images/Messanger.svg";
import path from "../../../images/Path3.svg";
import * as authAction from '../../../store/actions/Auth/authAction';
import getDeviceId from "../../../helper/generateDeviceID";
import Footer from "../Common/footer"
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
          email:"",
          password:"",
          loader:false,
          error:false,
          errorMessage:"",
          loadingstatus:false,
          confirmationVal:false
        }
        

      }
    /**
    * @inputChangeHandller 
    * getting input field values
    */
    inputChangeHandller = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    /**
    * @checkBackgroundFetching 
    * Check  Wether Background Fetching is  done or not
    */
    checkBackgroundFetching() {
            // setInterval(() => {
            //     let inBackgroundFetching=localStorage.getItem('inBackgroundFetching');
            //     // console.log("This check ++++++++++",inBackgroundFetching);
            //     if(inBackgroundFetching !== "true"){
            //         // console.log("This check 111++++++++++",inBackgroundFetching);
            //         this.props.history.push('/dashboard');       
                               
            //     }
            // },2000);
        }
    /**
    * @handleLoginFormValidation 
    * email and password field blank validation
    */
    handleLoginFormValidation() {
        let fields = {
        email: this.state.email,
        password: this.state.password,
        };
        
        let formIsValid = true;
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let checkResult = emailRegex.test(String(this.state.email).toLowerCase());
        if (!fields["email"]) {
        formIsValid = false;
        this.setState({errorMessage:"Email Is Required"});
        return formIsValid;
        } else if (checkResult === false) {
        formIsValid = false;
        this.setState({errorMessage:"Please enter a proper email"});
        return formIsValid;
        }
        else if (!fields["password"]) {
        formIsValid = false;
        this.setState({errorMessage:"Password Is Required"});
        return formIsValid;
        }else{
            formIsValid = true;
            return formIsValid;
        }
        
        return formIsValid;
    }
     /**
    * @loginHandler 
    * in this function we are checking the email id, password
    * and if the details are correct then login them and also take care about the remember password one
    */
    loginHandler = async (event) => {
        event.preventDefault();
        const gfs = chrome.storage.local;
        
        this.setState({ loader: true });
        let payload = {
        email: this.state.email,
        password: this.state.password,
        }
        if (this.handleLoginFormValidation()) {
            this.setState({ error:false});
            this.setState({errorMessage:""});
            // let subscription = await GetData('subscription');
                let payload  ={
                    extensionId: process.kyubi.extId,
                    email: this.state.email,
                    password: this.state.password,
                    deviceId: getDeviceId(),
                    confirmLogout: this.state.confirmationVal,
                    // subscription: subscription ? subscription : null
                }
                // console.log("subscription : ", subscription);
                // console.log("payload : ", payload);
            await AuthServices.login(payload).then(async result=>{
                if(result.data.code  === 1){
                    // console.log("result : ", result);
                    let token = result.data.token;
                    let tokens = token.split(".");
                    tokens =atob(tokens[1]);
                    let myObj = JSON.parse(tokens);
                    // console.log("Tis Is my Obj",myObj)
                    //this.props.setProfileInfo(myObj);
                    // console.log("Tis Is my Obj11",this.props.ProfileInfo.profileInfo)
                    gfs.set({'kyubi_user_token': myObj.user.id});
                    gfs.set({'inBackgroundFetching': true});
                    gfs.set({'kyubi_email': myObj.user.email});
                    let LC=loginHelper.login();
                        setTimeout(() => {
                        this.setState({ loader: false });
                        this.props.history.push('/dashboard');
                        // console.log("sorry");
                    }, 5000);
                }else{
                    this.setState({ loader: false });
                    this.setState({errorMessage:"User not found or In-Active"});
                    this.setState({ error:true});
                }
                

            }).catch(error=>{
                // console.log(error);
                this.setState({ loader: false });
                this.setState({errorMessage:"User not found or In-Active"});
                this.setState({ error:true});
            });
            


        }else{
            this.setState({ error:true,loader: false});

        }
        //this.setState({ loader: false });
    }

    callFrameHandler    =   async   (event) =>{
        loginHelper.framecaller();
    }
    
    async componentDidMount(){
        this.setState({ loader: true });
        let kyubi_user_token = await GetData('kyubi_user_token');
        let inBackgroundFetching = await GetData('inBackgroundFetching');
        if(kyubi_user_token){
            if(inBackgroundFetching !== "true"){
                let createStatePayload = [];
                createStatePayload['UserName'] = await GetData('fb_username');
                createStatePayload['UserImage'] = await GetData('fb_image');
                createStatePayload['UserLoginFacebook'] = await GetData('fb_logged_id');
                createStatePayload['UserAutoResponder'] = await GetData('autoresponder');
                createStatePayload['UserDefaultMessage'] = await GetData('default_message');

          this.props.setProfileInfo(createStatePayload);
                this.props.history.push('/setting');

            }else{
                this.setState({ loader: false });
            }
        }else{
            this.setState({ loader: false });
        }
        
    }

    render() {
        
        return (
            <div>
                {this.state.loader && (   
                <div class="after_login_refresh"><img src={process.kyubi.loader.preLoader} alt=""/></div>
                )}
                <div className="loginscreen" style={{
                                backgroundImage: (process.kyubi.logo.background_image ? `url(${process.kyubi.logo.background_image})` : '')
                            }}>
                    {!process.kyubi.logo.background_image && 
                        <><div className="graphics1"></div><div className="graphics2"></div></>
                    }
                    <div className="logo"><img src={process.kyubi.logo.secondary_logo} /></div>
                    <div className="login_container">
                        <div className="login_welcome_block">
                            Welcome,
                            <h3>Login to continue!</h3>
                        </div>
                        <div className="login_block">
                                <form>
                                    <label>
                                        <span><img src={mail}/></span>
                                        <input 
                                        name="email"
                                        id="email"
                                        type="email"
                                        placeholder="Email Address"
                                        onChange={this.inputChangeHandller}
                                        />
                                    </label>
                                    <label>
                                        <span><img src={lock} /></span>
                                        <input 
                                            type="password" 
                                            placeholder="**********"
                                            name="password"
                                            id="password"
                                            onChange={this.inputChangeHandller}
                                        />
                                    </label>
                                    <div className="text-right gap1">
                                        <NavLink className="link" to="/forgetPassword">Forgot Password?</NavLink>
                                    </div>
                                    <button type="button" className="blue_btn" onClick={this.loginHandler} >LOGIN</button>
                                    <div  className="login_signup">Don’t have an account? <a onClick={(event) => this.LinkHandler("optOne",event)} href="#">Sign up</a></div>
                                    {this.state.error && (   
                                        <div className="error"> {this.state.errorMessage} *</div>
                                    )}
                                </form>
                        </div>  
                        <Footer></Footer>
                        
                    </div>
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
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))