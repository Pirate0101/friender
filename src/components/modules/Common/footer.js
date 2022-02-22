import React, { Component } from "react";
import logo from "../../../images/logo.svg";
import { NavLink } from "react-router-dom";
import FaceBookLogo from "../../../images/Path3.svg";
import MessenderLogo from "../../../images/Messanger.svg";
import  {OpenLink,OpenPoweredBy,OpenTier5Partnership,OpenFacebookLink,OpenMessengerLink,OpenSignupLink} from  '../../../helper/helper';
class footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
          
        }
      }
      
    componentDidMount(){
        // console.log("I am In Header");
    }
    LinkHandler(option,event){
        event.preventDefault();
        OpenLink(option);
    }
    render() {
        return (
            <div className="footer">
            {process.kyubi.footer.showFooter && ( 
                <div>

                <p>
                {process.kyubi.footer.poweredBy.willBeDisplayed === true ?
                   <>
                        Powered by <a  onClick={(event) => this.LinkHandler(process.kyubi.footer.poweredBy.url,event)} href="#">{process.kyubi.footer.poweredBy.label}</a>
                   </>
                 :
                    ""
                }
                {process.kyubi.footer.partnership.willBeDisplayed === true ?
                   <>
                       and the <a  onClick={(event) => this.LinkHandler(process.kyubi.footer.partnership.url,event)}  href="#">{process.kyubi.footer.partnership.label}</a>
                   </>
                 :
                    ""
                }
                </p>
                {process.kyubi.footer.chatSupport.willBeDisplayed === true ?
                <a  onClick={(event) => this.LinkHandler(process.kyubi.footer.chatSupport.url,event)}  href="#"><img src={FaceBookLogo}/></a>
                :
                ""
                }
                {process.kyubi.footer.officialGroup.willBeDisplayed === true ?
                <a  onClick={(event) => this.LinkHandler(process.kyubi.footer.officialGroup.url,event)}  href="#"><img src={MessenderLogo}/></a>
                :
                ""
                }
                 
                </div>
            )}
            </div>
        )
    }
}
export default footer;