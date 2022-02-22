import React, { Component } from "react";
import logo from "../../../image/Logo_Side.png";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import {Animated} from "react-animated-css";
import * as authAction from '../../../store/actions/Auth/authAction';
class sidebar extends Component {
    constructor(props) {
      super(props)
      this.state = {
        selected:this.props.selectedtab,
        openSidebar:false,
        
      }
    }
    HideMenu = (event) => {
      event.preventDefault();
      // console.log(this.props.shownav);
      this.setState({
        openSidebar:false
      })
    }
    ShowMenu = (event) => {
      event.preventDefault();
      // console.log(this.props.shownav);
      this.setState({
        openSidebar:true
      })
    }
    componentDidMount(){
      
        // console.log("I am in sidebar =====",this.props.login_user_profile_info);
    }
    render() {
        return (
        <div>
          <nav className="main-header navbar navbar-expand  navbar-dark">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" onClick={this.ShowMenu} data-widget="pushmenu" href="#" role="button">
                    <i className="fas fa-bars"></i>
                  </a>
                </li>
              </ul>
          </nav>
        {this.state.openSidebar ?
                      
                      <div className="main-sidebar sidebar-light-primary elevation-4 sidebar-no-expand" id="navbarMenu">
              
                      <a href="" onClick={this.HideMenu} ><div className="crossbox"><i class="fas fa-times"></i></div></a>
                      
                        <NavLink  to="/dashboard" className="brand-link">
                        
                          <img  src={logo} className="Brandlogo"></img>
                        
                        </NavLink>
                        <div className="sidebar">
                          <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                              <li className="nav-item">
                                  <NavLink  to="/dashboard" className="nav-link">
                                    <i className="nav-icon fas fa-tachometer-alt"></i>
                                    <p>
                                      Dashboard
                                    </p>
                                  </NavLink>
                              </li>
                              <li className="nav-item">
                                  <NavLink  to="/setting" className="nav-link">
                                    <i className="nav-icon fas fa-cogs"></i>
                                    <p>
                                      Setting
                                    </p>
                                  </NavLink>
                              </li> 
                              <li className="nav-item">
                                  <NavLink  to="/delay_setting" className="nav-link">
                                    <i className="nav-icon fas fa-cogs"></i>
                                    <p>
                                      Delay Setting
                                    </p>
                                  </NavLink>
                              </li>  
                              <li className="nav-item">
                                  <NavLink  to="/autoresponder" className="nav-link">
                                    <i className="nav-icon fas fa-magic"></i>
                                    <p>
                                      Auto-Responder
                                    </p>
                                  </NavLink>
                              </li>
                              
                              <li className="nav-item">
                                  <NavLink  to="/logout" className="nav-link">
                                    <i className="nav-icon fas fa-sign-out-alt"></i>
                                    <p>
                                      Logout
                                    </p>
                                  </NavLink>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                   
        :
        ""
        }
        </div>
          
         

          
        );
    }
}

/**
 * @mapStateToProps
 * get the values from redux store for updating the front end
*/
const mapStateToProps = (state) => {
  return {
    login_user_profile_info: state.auth.payload
  }
}



/**
 * @mapDispatchToProps
 * send the values to redux store when an admin user is created, suspended or activated
 */
const mapDispatchToProps = dispatch => {
  return {
      setProfileInfo: load => dispatch(authAction.addProfileInfo(load))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(sidebar);