import React,{Component} from 'react';
import { NavLink,Redirect, withRouter } from 'react-router-dom';
import { kyubiExtensionId } from '../../../config';
import AuthServices from "../../../Services/authService";
import validator from 'validator';
import jwtDecode from 'jwt-decode'
import {connect}            from 'react-redux';
import * as authAction      from '../../../store/actions/Auth/authAction'
import Logo from "../../../images/logo.svg";

  class Login extends Component {
    constructor(props){
      super(props)
      this.state = {
        isError: false,
        errMsg: '',
        email: '',
        password: '',
        LoggedIn:false,
        AfterLoggedInPath:""
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
        
        this.setState({ loader: true });
        let payload = {
        email: this.state.email,
        password: this.state.password,
        }
        console.log(payload);
        if (this.handleLoginFormValidation()) {
            this.setState({ error:false});
            this.setState({errorMessage:""});
            // let subscription = await GetData('subscription');
            
                let payload  ={
                    extensionId: kyubiExtensionId,
                    email: this.state.email,
                    password: this.state.password,
                    
                    // subscription: subscription ? subscription : null
                }
                console.log("SET",payload);
                // console.log("subscription : ", subscription);
                // console.log("payload : ", payload);
            await AuthServices.login(payload).then(async result=>{
                if(result.data.code  === 1){
                    // console.log("result : ", result);
                    let token = result.data.token;
                    let tokens = token.split(".");
                    tokens =atob(tokens[1]);
                    let myObj = JSON.parse(tokens);
                    console.log("SET",myObj);
                    this.setState({LoggedIn:true,AfterLoggedInPath:"/dashboard"});
                    // let LC=loginHelper.login();
                    //     setTimeout(() => {
                    //     this.setState({ loader: false });
                    //     this.props.history.push('/dashboard');
                    //     // console.log("sorry");
                    // }, 5000);
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


    render() {   
      if(this.state.LoggedIn===true){
        return <Redirect to={this.state.AfterLoggedInPath} />
      }
        return (
                
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth">
                        <div className="row flex-grow">
                        <div className="col-lg-4 mx-auto">
                            <div className="auth-form-light text-left p-5">
                            <div className="brand-logo">
                                <img src={Logo}/>
                            </div>
                            <h4>Hello! let's get started</h4>
                            <h6 className="font-weight-light">Sign in to continue.</h6>
                            <form className="pt-3">
                                <div className="form-group">
                                <input className="form-control form-control-lg" 
                                type="email"
                                autoComplete="off"
                                value={this.state.email || ""}
                                name='email'
                                id="1k"
                                placeholder="Enter Your Email Id"
                                onChange={this.inputChangeHandller} 
                                required
                                />
                                </div>
                                <div className="form-group">
                                <input className="form-control form-control-lg" 
                                    type="password"
                                    autoComplete="off"
                                    value={this.state.password || ""}
                                    name='password'
                                    id="2"
                                    placeholder="Enter Your Password"
                                    onChange={this.inputChangeHandller} 
                                    required/>
                                </div>
                                <div className="mt-3">
                                <button type="submit" onClick={this.loginHandler} className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">Login</button>
                                
                                </div>
                                <div className="my-2 d-flex justify-content-between align-items-center">
                                <div className="form-check">
                                    <label className="form-check-label text-muted">
                                    <input type="checkbox" className="form-check-input"/> Keep me signed in </label>
                                </div>
                                <a href="#" className="auth-link text-black">Forgot password?</a>
                                </div>
                                
                                <div className="text-center mt-4 font-weight-light"> Don't have an account? <a href="register.html" className="text-primary">Create</a>
                                </div>
                            </form>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                

        );
    }
}
const mapStateToProps = (state) => {
  return {
      decodedPermissions : state.auth.payload != null 
          ? state.auth.payload
          : ''
  }
}
const mapDispatchToProps = (dispatch) => {
return {
    setPermissions : (load) => dispatch(authAction.addPermissionsFunc(load)),
    setProfileInfo : (load) => dispatch(authAction.addProfileInfo(load))
}
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);