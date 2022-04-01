import React, { Component } from "react";
import Login from "../modules/login/login";
import Setlaunchpad from "../modules/SetLaunchpad/setlaunchpad";
class DefaultLayout extends Component {
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
    console.log(this.props.datasection);
    console.log("Thius is the Kyubi ID",this.props.computedMatch.params.id);
}
  render() { 
            let headerSection="";
            let menuSection="";
            let bodySection="";
            let footerSection="";
    if(this.props.datasection === "login"){
        
     headerSection="";
     menuSection="";
     bodySection=<Login/>;
     footerSection="";
        
    }else if(this.props.datasection === "forgetpassword"){
     headerSection="";
     menuSection="";
     bodySection="";
     footerSection="";
        
    }else if(this.props.datasection === "setlaunchpad"){
     headerSection="";
     menuSection="";
     bodySection=<Setlaunchpad worldid={this.props.computedMatch.params.id}/>;
     footerSection="";
    }
    return (
        <React.Fragment >
            <div className="container-scroller">
            {headerSection}
            {bodySection}
            {footerSection}
            </div>
        </React.Fragment>
    );
  }
}
export default DefaultLayout;