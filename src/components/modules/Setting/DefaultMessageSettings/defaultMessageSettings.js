import React, { Component } from "react";
import SegmentActiveLogo from  "../../../../images/icon2b.svg";
import SegmentInActiveLogo from  "../../../../images/icon2a.svg";
import GroupActiveLogo from  "../../../../images/icon3b.svg";
import GroupInActiveLogo from  "../../../../images/icon3a.svg";
import GroupSection from  "../DefaultMessageSettings/IndividualComponents/group";
import SegmentSection from  "../DefaultMessageSettings/IndividualComponents/segment";
class defaultMessageSettings extends Component {
    constructor(props) {
        super(props)
        this.state = {
          Segment:1,
          Group:0,
          
          loader:false
        }
      }
      activateSegment  = async (event) =>  {
        event.preventDefault();
        this.setState({
            Segment:1,
            Group:0
        })
        
      }
      activateGroup  = async (event) =>  {
        event.preventDefault();
        this.setState({
            Segment:0,
            Group:1
        })
        
      }
      render() {
        return (
            <div id="tabResponse" className="maintabcontent">
                <ul class="subtab">
                  <li>
                    <a href="#" onClick={this.activateSegment} className={this.state.Segment ?"active":""}>
                    {this.state.Segment ?
                    <img src={SegmentActiveLogo} className="active"/>
                    :
                    <img src={SegmentInActiveLogo} className="inactive"/>
                    }
                    Segments</a>
                  </li>
                  <li>
                    <a href="#" onClick={this.activateGroup} id="defaultMessage" className={this.state.Group ?"active":""}>
                    {this.state.Group ?
                    <img src={GroupActiveLogo} className="active"/>
                    :
                    <img src={GroupInActiveLogo} className="inactive"/>
                    }
                    Groups</a>
                  </li>
                </ul>
                {this.state.Segment ?
                  <SegmentSection></SegmentSection>
                :
                  <GroupSection></GroupSection>
                }
            </div>)
      }
}
export default defaultMessageSettings;