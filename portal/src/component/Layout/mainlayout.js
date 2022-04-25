import React, { Component } from "react";
import Header from "../Common/header";
import SideBar from "../Common/sidebar";
import Dashboard from "../modules/Dashboard/dashboard";
import "./ven.css";
import "./mt.css";
class MainLayout extends Component {
    constructor(props) {
      super(props)
      this.state = {
          headerSection:"",
          menuSection:"",
          bodySection:"",
          footerSection:""
      }
    }
/**
* @render
* in here we are loading our component based on the route
*/
componentDidMount(){
    console.log(this.props);
    
}
  render() { 
            let headerSection="";
            let menuSection="";
            let bodySection="";
            let footerSection="";
    if(this.props.datasection === "dashboard"){
        
     headerSection=<Header/>;
     menuSection=<SideBar selectedLink="dashboard"/>;
     bodySection=<Dashboard />;
     footerSection="";
        
    }else if(this.props.datasection === "forgetpassword"){
     headerSection="";
     menuSection="";
     bodySection="";
     footerSection="";
        
    }else if(this.props.datasection === "setpermissionsection"){
     headerSection="";
     menuSection="";
     bodySection="";
     footerSection="";
    }
    return (
        <React.Fragment >
            <div className="container-scroller">
            {headerSection}
            <div className="container-fluid page-body-wrapper">
            {menuSection}
                <div className="main-panel">
                    {bodySection}
                </div>
            </div>
            
            
            {footerSection}
            </div>
        </React.Fragment>
    );
  }
}
export default MainLayout;