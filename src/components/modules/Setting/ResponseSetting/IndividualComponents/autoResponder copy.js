import React, { Component } from "react";
import plusLogo from  "../../../../../images/plus.svg";
import editLogo from  "../../../../../images/edit.svg";
import deleteLogo from  "../../../../../images/delete.svg";
class responseSetting extends Component {
    constructor(props) {
        super(props)
        this.state = {
          autoResponsederList:1,
          autoResponsederCreate:0,
          autoResponsederEdit:0
        }
      }
      addAutoResponderHandler  = async (event) =>  {
        event.preventDefault();
        this.setState({
            autoResponsederList:0,
            autoResponsederCreate:1,
            autoResponsederEdit:0
        })
        
      }
      render() {
        return (
        <>
                {this.state.autoResponsederList ?
                // <div className="list_no_record">
                //     <img src="images/empty_file.svg" alt=""/>
                //     <p>You haven’t created any Auto Responder yet.</p>
                //     <a className="createbtn"><img src="images/plus.svg" alt=""/> Create New</a>
                // </div>
                <div id="tabautoResponder" className="subtabcontent">
                    <div className="headding">
                    <span>Auto Responder Lists</span> <a href="" onClick={this.addAutoResponderHandler} className="createbtn"><img alt="" src={plusLogo}/> Create New</a>
                    </div>
                    <div className="listing_card">
                    <div className="head">
                        <div className="txt">General Greetings</div>
                        <div className="action">
                            <label className="switch_box box_2">
                            <input type="checkbox" className="switch_2" id="" name="" checked=""/>
                            <div className="toogler"></div>
                            </label>
                            <a href="#"><img src={editLogo} alt=""/></a> 
                            <a href="#"><img src={deleteLogo} alt=""/></a>
                        </div>
                    </div>
                    <div className="body">
                        <p className="qn">Welcome [First Name], How can I help you?</p>
                        <div className="listfooter">
                        <p>Keywords:</p>
                        <span className="tags">Hello </span>
                        <span className="tags">Hey</span> 
                        <span className="tags">Hi</span> 
                        <span className="tags">Hi there</span>
                        </div>
                    </div>
                    </div>
                    <div className="listing_card">
                    <div className="head">
                        <div className="txt">General Greetings</div>
                        <div className="action">
                            <label className="switch_box box_2">
                            <input type="checkbox" className="switch_2" id="" name="" checked=""/>
                            <div class="toogler"></div>
                            </label>
                            <a href="#"><img src={editLogo} alt=""/></a> 
                            <a href="#"><img src={deleteLogo} alt=""/></a>
                        </div>
                    </div>
                    <div className="body">
                        <p className="qn">Welcome to our help desk [First Name], How can we help you?</p>
                        <div className="listfooter">
                        <p>Keywords:</p>
                        <span className="tags">Hello </span>
                        <span className="tags">Hey</span> 
                        <span className="tags">Hi</span> 
                        <span className="tags">Hi there</span>
                        </div>
                    </div>
                    </div>
                    <div className="listing_card inactive">
                    <div className="head">
                        <div className="txt">General Greetings</div>
                        <div className="action">
                            <label className="switch_box box_2">
                            <input type="checkbox" className="switch_2" id="" name="" />
                            <div className="toogler"></div>
                            </label>
                            <a href="#"><img src={editLogo} alt=""/></a> 
                            <a href="#"><img src={deleteLogo} alt=""/></a>
                        </div>
                    </div>
                    <div className="body">
                        <p className="qn">Welcome to our help desk [First Name], How can we help you?</p>
                        <div className="listfooter">
                        <p>Keywords:</p>
                        <span className="tags">Hello </span>
                        <span className="tags">Hey</span> 
                        <span className="tags">Hi</span> 
                        <span className="tags">Hi there</span>
                        </div>
                    </div>
                    </div>
                        
                </div> 
                :
                ""
                }
                {this.state.autoResponsederCreate ?
                <div id="tabautoResponder" className="subtabcontent">
                    <form>
                        <label>
                            Auto Responder Name
                        </label>
                            <input type="text" placeholder="General Greetings"/>
                        <label>
                            Keywords
                        </label>
                            <textarea placeholder="Hello, Hey, Hi, Hi there"></textarea>
                        <label>Auto Response Message</label>
                            <textarea className="withtag" placeholder="Welcome [First Name], How can I help you?"></textarea>
                            <a href="#" className="formtag">[ First Name ]</a> <a href="#" className="formtag">[ Last Name ]</a>
        
                        <label className="checking">
                            <input type="checkbox" name=""/>
                            <span>&check;</span> Activate this Auto Responder
                        </label>
    
                        <button className="blue_btn" type="submit">Save Auto Responder</button>
                    </form>
                </div>
                :
                ""
                }

        </>
            
            
       
        )
      }
}
export default responseSetting;