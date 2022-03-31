import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import AutoResponderService from  "../../../services/autoResponderServices"
import Sidebar from "../Common/sidebar"
import ReactDOM from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import { GetData } from "../../../helper/helper";
const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  
const delimiters = [KeyCodes.comma, KeyCodes.enter];
  
class autoResponderCreate extends Component {
    constructor(props) {
      super(props)
      this.state = {
        auto_responder_name:"",
        auto_responder_message:"",
        auto_responder_status:1,
        loader:false,
        auto_responder_keywords: [],
      };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        
    }
    handleDelete(i) {
        const { auto_responder_keywords } = this.state;
        this.setState({
            auto_responder_keywords: auto_responder_keywords.filter((auto_responder_keyword, index) => index !== i),
        });
    }

    handleAddition(auto_responder_keyword) {
        this.setState(state => ({ auto_responder_keywords: [...state.auto_responder_keywords, auto_responder_keyword] }));
    }

    
    /**
        * @inputChangeHandller 
        * getting input field values
    */
    inputChangeHandller = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    autoSetting = () => {
        // console.log("hiyy",this.state.auto_responder_status )
        if(this.state.auto_responder_status === 0){
            this.setState({auto_responder_status:1})
        }else{
            this.setState({auto_responder_status:0})
        }
    }
    createAutoResponderGroupHandler = async (event) =>{
        this.setState({loader:true});
        event.preventDefault();
        let Token = await GetData('kyubi_user_token');
        
        let payload = {
            user_id:Token,
            auto_responder_name:this.state.auto_responder_name,
            auto_responder_keywords:this.state.auto_responder_keywords,
            auto_responder_message:this.state.auto_responder_message,
            auto_responder_status:this.state.auto_responder_status
        }
        // console.log("This I gottttt",payload);
        AutoResponderService.createAutoResponder(payload).then(response =>{
          
          this.setState({loader:false});
          this.props.history.push('/autoresponder');
        });
      }
    render() {
        const { auto_responder_keywords } = this.state;
        return (
            <div className="wrapper">
                {this.state.loader && (   
                    <div className="overlay">
                    <i className="fas fa-2x fa-sync-alt fa-spin"></i>
                    </div>
                )}
                <Sidebar  selectedtab="setting"></Sidebar>
                <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-12">
                            <div className="col-sm-6">
                            <h1>Auto-Responder</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                            
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title"> Create Auto-Responder</h3>
                                </div>
                                <form>
                                <div className="card-body">
                                    
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Auto-Responder Name</label>
                                        <input type="text"
                                            name="auto_responder_name" 
                                            className="form-control" 
                                            id="exampleInputEmail1" 
                                            placeholder="Auto-Responder Name" 
                                            value={this.state.auto_responder_name}
                                            onChange={this.inputChangeHandller}
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Auto-Responder Keywords</label>
                                        <ReactTags 
                                        placeholder="Press enter Or Press , to Create Autoresponder Keywords"
                                        tags={auto_responder_keywords}
                                        handleDelete={this.handleDelete}
                                        handleAddition={this.handleAddition}
                                        allowUnique={true}
                                        delimiters={delimiters} />
                                        


                                        
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Auto-Responder Response Message</label>
                                        <textarea 
                                        name="auto_responder_message" 
                                        value=""  
                                        className="form-control" 
                                        rows="3"  
                                        placeholder="Please enter the response message...."
                                        value={this.state.auto_responder_message}
                                        onChange={this.inputChangeHandller}
                                        ></textarea>
                                    </div>
                                    <div className="form-group clearfix">
                                        <div className="icheck-success d-inline">
                                        {this.state.auto_responder_status ?
                                        <input type="checkbox" id="checkboxPrimary3" name="auto_responder_status" onChange={this.autoSetting} checked/>
                                        :
                                        <input type="checkbox" id="checkboxPrimary3" name="auto_responder_status" onChange={this.autoSetting}/>
                                        }
                                        <label for="checkboxPrimary3">
                                            Activate Auto-Responder
                                        </label>
                                        </div>
                                    </div>
                                    
                                </div>           
                                <div className="card-footer">
                                <button type="submit" className="btn btn-primary" onClick={this.createAutoResponderGroupHandler} >Submit</button>
                                </div>
                                </form>
                            </div>

                            </div>
                        </div>
                    </div>
                </section>
                </div>
            </div>
        );
    }
}

export default autoResponderCreate;