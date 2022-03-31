import React, { Component} from "react";
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {kyubiExtensionId}  from "../../../config";
import "./login.css";
import AuthServices from "../../../services/authService";
import loginHelper from "../../../helper/loginHelper";
import  {OpenPoweredBy,OpenTier5Partnership,OpenFacebookLink,OpenMessengerLink,OpenSignupLink} from  '../../../helper/helper';
import logo from "../../../images/logo1.svg";
import biglogo from "../../../images/biglogo.svg";
import LoaderLogo from "../../../images/Loader.gif"
import mail from "../../../images/mail.svg";
import lock from "../../../images/lock.svg";
import messanger from "../../../images/Messanger.svg";
import path from "../../../images/Path3.svg";
import * as authAction from '../../../store/actions/Auth/authAction';
import Footer from "../Common/footer";
class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email:"",
      loader:false,
      error:false,
      errorMessage:"",
      loadingstatus:false,
      ActionMessage:false,
      ActionMessageHead:"",
      ActionMessagetext:""
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
    * @handleFormValidation 
    * email field blank validation
    */
    handleFormValidation() {
          let fields = {
          email: this.state.email
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
          else{
              formIsValid = true;
              return formIsValid;
          }
          
          return formIsValid;
    }

    /**
    * @forgetPasswordHandler 
    * in this function we are checking the email id
    * and if the details are correct then Ask kyubi Tofenerate Reset Password Link
    */
    forgetPasswordHandler = async (event) => {
            event.preventDefault();
            
            this.setState({ loader: true });
            let payload = {
            email: this.state.email
            }
            if (this.handleFormValidation()) {
                this.setState({ error:false});
                this.setState({errorMessage:""});
                let payload  ={
                  extId: process.kyubi.extId,
                  email: this.state.email
                }
                await AuthServices.forgotPassword(payload).then(async result=>{
                   if(result.data.code  === 1){
                      this.setState({ loader: false,
                        ActionMessage:true,
                        ActionMessageHead:"Success",
                        ActionMessagetext:result.data.message
                      });
                    }else{
                        this.setState({ loader: false,
                          ActionMessage:true,
                          ActionMessageHead:"Error !!",
                          ActionMessagetext:"Sorry Cannot  Process Your Request, Please Provide a Registered Email ID Or Try Again After Sometime"
                        });
                    }
                    
    
                }).catch(error=>{
                  this.setState({ 
                    loader: false,
                    ActionMessage:true,
                    ActionMessageHead:"Error !!",
                    ActionMessagetext:"Sorry Cannot  Process Your Request, Please Provide a Registered Email ID Or Try After Sometime"
                   });
                });
                
    
    
            }else{
              this.setState({ loader: false,
                error:true,
                errorMessage:"Please Provide Proper Email ID !!"
               });
              
    
            }
            //this.setState({ loader: false });
        }
        ActionMessageClose(event){
          event.preventDefault();
          this.props.history.push('/');
          this.setState({
            email:"",
            loader:false,
            error:false,
            errorMessage:"",
            loadingstatus:false,
            ActionMessage:false,
            ActionMessageHead:"",
            ActionMessagetext:""
          })
      }
    render() {
        return (
          <>
                {this.state.loader && (   
                <div class="after_login_refresh"><img src={process.kyubi.loader.preLoader} alt=""/></div>
                )}
                <div className="loginscreen">
                  { this.state.ActionMessage  && ( 
                      <div class="group_delete_sreen">
                          <div className="group_delete_popup">
                            <h3>{this.state.ActionMessageHead}</h3>
                            <p>{this.state.ActionMessagetext}</p>
                            <div className="text-right">
                              <a href="#" onClick={(event) => this.ActionMessageClose(event)} className="redlink">Close</a>
                            </div>
                          </div>
                      </div>
                  )} 
                  <div className="graphics1"></div>
                  <div className="graphics2"></div>
                  <div className="logo"><img src={process.kyubi.logo.secondary_logo} /></div>
                  <div className="login_container">
                      <div className="login_welcome_block">
                      Forgot Password?
                        <h3 className="forgetpasswordtext">Submit your registered email to get the link to reset your account password.</h3>
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
                                  
                                  <div className="text-right gap1">
                                      
                                      Click here to <NavLink className="link" to="/">LogIn</NavLink>
                                  </div>
                                  <button type="button" className="blue_btn" onClick={this.forgetPasswordHandler} >Submit</button>
                                  
                                  {this.state.error && (   
                                      <div className="error"> {this.state.errorMessage} *</div>
                                  )}
                              </form>
                      </div>  
                      <div className="footer">
                          <Footer></Footer>
                      </div>
                  </div>
                </div>
          </>
          
        );
    }
}
export default ForgotPassword;