import React, { Component } from "react";
import plusLogo from  "../../../../../images/plus.svg";
import editLogo from  "../../../../../images/edit1.svg";
import deleteLogo from  "../../../../../images/delete1.svg";
import viewLogo from  "../../../../../images/view.svg";
import backArrowLogo from "../../../../../images/arrow2.svg";
import SegmentServices from "../../../../../services/segmentServices.js";
import biglogo from "../../../../../images/Loader.gif";
import { GetData } from "../../../../../helper/helper"
class segment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deleteSegmentId:"",
            deleteSegmentblock:false,
            deleteSegmenttext:"",
            deleteSegmentHead:"",
            deleteSegmentCancle:false,
            deleteSegmantDelete:false,
            deleteSegmentClose:false,
            segmentList:1,
            segmentCreate:0,
            segmentEdit:0,
            default_message_text:"",
            message_block:[],
            hideTextbox:false,
            sagment_name:"",
            message_block_List:[],
            sagment_name_edit:"",
            message_block_edit:[],
            sagment_id_edit:"",
            hideTextboxEdit:false,
            default_message_text_edit:"",
            loader:true,
            csn:false,
            isSegmentList:false,
            esn:false,
            segBlock:false,
            notifier:false,
            notifier_head:"",
            notifier_message:""
        }
      }
        /**
        * @inputChangeHandller 
        * getting input field values
        */
        inputChangeHandller = (event) => {
            this.setState({ [event.target.name]: event.target.value })
        }
        addSegmentHandler  = async (event) =>  {
            event.preventDefault();
            this.setState({
                segmentList:0,
                segmentCreate:1,
                segmentEdit:0
            })
        }
        listSegmentHandler  = async (event) =>  {
            event.preventDefault();
            this.setState({
                segmentList:1,
                segmentCreate:0,
                segmentEdit:0
            })
        }
        showTextBoxHandler  = async (event) =>  {
            event.preventDefault();
            this.setState({
                hideTextbox:false
            })
        }
        showTextBoxHandlerEdit  = async (event) =>  {
            event.preventDefault();
            this.setState({
                hideTextboxEdit:false
            })
        } 
        storeInMessageBlock =   async   (event) =>  {
            event.preventDefault();
            let Old_message_block   =   this.state.message_block;
            Old_message_block.push(this.state.default_message_text);

            this.setState({
                message_block:Old_message_block,
                default_message_text:"",
                hideTextbox:true,
                cmb:false
            });
            // console.log("This are the Message Blocks",this.state.message_block)
        }
        storeInMessageBlockEdit =   async   (event) =>  {
            event.preventDefault();
            let Old_message_block_edit   =   this.state.message_block_edit;
            Old_message_block_edit.push(this.state.default_message_text_edit);

            this.setState({
                message_block_edit:Old_message_block_edit,
                default_message_text_edit:"",
                hideTextboxEdit:true
            });
            // console.log("This are the Message Blocks",this.state.message_block_edit)
        }
        submitAddSegment   =    async   (event) =>  {
            this.setState({loader:true})
            event.preventDefault();
            if(this.state.sagment_name == ""){
                this.setState({csn:true,loader:false})
            }else{
                this.setState({csn:false})
            }
            
            if(this.state.sagment_name !="" ){
                let user_id = await GetData('user_id');
                
                let payload =   {
                    message_segments_block:this.state.message_block,
                    message_segment_name:this.state.sagment_name,
                    user_id:user_id
                }
                // console.log("This I have to save in DB as Segments",payload);
                if(this.state.message_block.length>0){
                    SegmentServices.createSegment(payload).then(async result=>{
                        let user_id = await GetData('user_id');
                        
                        let  params ={
                            user_id    :   user_id
                        };
                        SegmentServices.getSegment(params).then(result=>{
                            if(result.data.code == 1){
                                this.setState({
                                message_block_List:result.data.payload,
                                loader:false,
                                segmentList:1,
                                segmentCreate:0,
                                segmentEdit:0,
                                message_block:[],
                                sagment_name:"",
                                notifier:true,
                                notifier_head:"Well Done !",
                                notifier_message:"Awesome, you successfully Added an Segment"
                                });
                                setInterval(() => {
                                    this.setState({
                                            notifier:false,
                                            notifier_head:"",
                                            notifier_message:""
                                    });
                                },2000);  
                            }else{
                                this.setState({
                                    loader:false,
                                    segmentList:1,
                                    segmentCreate:0,
                                    segmentEdit:0,
                                    message_block:[],
                                    sagment_name:"",
                                    notifier:true,
                                    notifier_head:"OOhh Snap !",
                                    notifier_message:"Something went Wrong  Please try again after sometime"
                                    });
                                    setInterval(() => {
                                        this.setState({
                                                notifier:false,
                                                notifier_head:"",
                                                notifier_message:""
                                        });
                                    },2000);
                            }
                        }).catch(error=>{
                            this.setState({
                                loader:false,
                                segmentList:1,
                                segmentCreate:0,
                                segmentEdit:0,
                                message_block:[],
                                sagment_name:"",
                                notifier:true,
                                notifier_head:"OOhh Snap !",
                                notifier_message:"Something went Wrong  Please try again after sometime"
                                });
                                setInterval(() => {
                                    this.setState({
                                            notifier:false,
                                            notifier_head:"",
                                            notifier_message:""
                                    });
                                },2000);
                            // console.log("This I got From DDDDBBBBBB EROOOOOO",error);
                        })
        
                    }).catch(async error=>{
                        let user_id = await GetData('user_id');
                        
                        let  params ={
                            user_id    :   user_id
                        };
                        SegmentServices.getSegment(params).then(result=>{
                            if(result.data.code == 1){
                                this.setState({
                                message_block_List:result.data.payload,
                                loader:false
                                })  
                            }else{
                                this.setState({
                                    loader:false
                                    })
                            }
                        }).catch(error=>{
                            // console.log("This I got From DDDDBBBBBB EROOOOOO",error);
                        })
        
                    })
                }else{
                    this.setState({isSegmentList:true,loader:false})
                }
            }
            
        }
        submitAddSegmentEdit   =    async   (event) =>  {
            this.setState({loader:true})
            event.preventDefault();
            if(this.state.sagment_name_edit == ""){
                this.setState({esn:true,loader:false})
            }else{
                this.setState({esn:false})
            }
            if(this.state.message_block_edit.length == 0){
                this.setState({segBlock:true,loader:false})
            }else{
                this.setState({segBlock:false})
            }
            if(this.state.sagment_name_edit !="" && this.state.message_block_edit.length != 0){
            let user_id = await GetData('user_id');
            
            let payload =   {
                message_segments_block:this.state.message_block_edit,
                message_segment_name:this.state.sagment_name_edit,
                user_id:user_id,
                sagment_id_edit:this.state.sagment_id_edit
            }
            // console.log("This I have to save in DB as Segments",payload);
            SegmentServices.UpdateSegment(payload).then(result=>{
                // console.log("this is more SUUUUUUCCEEEEESSSS",result);
                if(result.data.code == 1){
                    this.setState({
                    message_block_List:result.data.payload,
                    loader:false,
                    segmentList:1,
                    segmentCreate:0,
                    segmentEdit:0,
                    message_block_edit:[],
                    sagment_name_edit:"",
                    sagment_id_edit:"",
                    notifier:true,
                    notifier_head:"Well Done !",
                    notifier_message:"Awesome, you successfully Updated an Segment"
                    });
                    setInterval(() => {
                        this.setState({
                                notifier:false,
                                notifier_head:"",
                                notifier_message:""
                        });
                    },2000); 
                }else{
                    this.setState({
                        loader:false,
                        segmentList:1,
                        segmentCreate:0,
                        segmentEdit:0,
                        message_block_edit:[],
                        sagment_name_edit:"",
                        sagment_id_edit:"",
                        notifier_head:"OOhh Snap !",
                        notifier_message:"Something went Wrong  Please try again after sometime"
                        });
                        setInterval(() => {
                            this.setState({
                                    notifier:false,
                                    notifier_head:"",
                                    notifier_message:""
                            });
                        },2000);
                }
            }).catch(error=>{
                this.setState({
                    loader:false,
                    segmentList:1,
                    segmentCreate:0,
                    segmentEdit:0,
                    message_block:[],
                    sagment_name:"",
                    notifier:true,
                    notifier_head:"OOhh Snap !",
                    notifier_message:"Something went Wrong  Please try again after sometime"
                    });
                    setInterval(() => {
                        this.setState({
                                notifier:false,
                                notifier_head:"",
                                notifier_message:""
                        });
                    },2000);
                // console.log("this is more ERRRRROOOOOORRRRRR",error);
            })
            }
        }
        /**
         * @insertTagAtMessageSegments
         * in this function we are managing the tag in welcome message area
        */
        insertTagAtMessageSegments(areaId, text) {
                var txtarea = document.getElementById(areaId);
                if (!txtarea) {
                return;
                }
                // if (txtarea.value.length < 188) {
                var scrollPos = txtarea.scrollTop;
                var strPos = 0;
                var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
                "ff" : (document.selection ? "ie" : false));
                if (br == "ie") {
                txtarea.focus();
                var range = document.selection.createRange();
                range.moveStart('character', -txtarea.value.length);
                strPos = range.text.length;
                } else if (br == "ff") {
                strPos = txtarea.selectionStart;
                }
                var front = (txtarea.value).substring(0, strPos);
                var back = (txtarea.value).substring(strPos, txtarea.value.length);
                txtarea.value = front + text + back;
                strPos = strPos + text.length;
                let WelcomeMessage = txtarea.value;
                WelcomeMessage = WelcomeMessage.replace(/{first_name}/g, "");
                WelcomeMessage = WelcomeMessage.replace(/{last_name}/g, "");
                WelcomeMessage = WelcomeMessage.replace(/{date}/g, "");
                WelcomeMessage = WelcomeMessage.replace(/{date_time}/g, "");
                // console.log("This is the message ========",WelcomeMessage);
                this.setState({ default_message_text: txtarea.value});
                // this.setState({ welcomeContent: txtarea.value, welcomeTextLengthCount: txtarea.value });
                if (br == "ie") {
                txtarea.focus();
                var ieRange = document.selection.createRange();
                ieRange.moveStart('character', -txtarea.value.length);
                ieRange.moveStart('character', strPos);
                ieRange.moveEnd('character', 0);
                ieRange.select();
                } else if (br == "ff") {
                txtarea.selectionStart = strPos;
                txtarea.selectionEnd = strPos;
                txtarea.focus();
                }
                txtarea.scrollTop = scrollPos;
                // }
        }
        insertTagAtMessageSegments_edit(areaId, text) {
            var txtarea = document.getElementById(areaId);
            if (!txtarea) {
            return;
            }
            // if (txtarea.value.length < 188) {
            var scrollPos = txtarea.scrollTop;
            var strPos = 0;
            var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
            "ff" : (document.selection ? "ie" : false));
            if (br == "ie") {
            txtarea.focus();
            var range = document.selection.createRange();
            range.moveStart('character', -txtarea.value.length);
            strPos = range.text.length;
            } else if (br == "ff") {
            strPos = txtarea.selectionStart;
            }
            var front = (txtarea.value).substring(0, strPos);
            var back = (txtarea.value).substring(strPos, txtarea.value.length);
            txtarea.value = front + text + back;
            strPos = strPos + text.length;
            let WelcomeMessage = txtarea.value;
            WelcomeMessage = WelcomeMessage.replace(/{first_name}/g, "");
            WelcomeMessage = WelcomeMessage.replace(/{last_name}/g, "");
            WelcomeMessage = WelcomeMessage.replace(/{date}/g, "");
            WelcomeMessage = WelcomeMessage.replace(/{date_time}/g, "");
            // console.log("This is the message ========",WelcomeMessage);
            this.setState({ default_message_text_edit: txtarea.value});
            // this.setState({ welcomeContent: txtarea.value, welcomeTextLengthCount: txtarea.value });
            if (br == "ie") {
            txtarea.focus();
            var ieRange = document.selection.createRange();
            ieRange.moveStart('character', -txtarea.value.length);
            ieRange.moveStart('character', strPos);
            ieRange.moveEnd('character', 0);
            ieRange.select();
            } else if (br == "ff") {
            txtarea.selectionStart = strPos;
            txtarea.selectionEnd = strPos;
            txtarea.focus();
            }
            txtarea.scrollTop = scrollPos;
            // }
        }
        editMessageSegments(segment_id,event){
            event.preventDefault(); 
            let  params ={
                segment_id    :   segment_id
            };
            SegmentServices.editSegment(params).then(result  =>{
                if(result.data.code == 1){
                    this.setState({
                        sagment_name_edit:result.data.payload.title,
                        message_block_edit:result.data.payload.message_blocks,
                        sagment_id_edit:result.data.payload._id,
                        segmentList:0,
                        segmentCreate:0,
                        segmentEdit:1
                    })
              }
            })
        }
        deleteMessageSegments(segment_id,event){
            event.preventDefault();
            this.setState({
                deleteSegmentId:segment_id,
                deleteSegmentblock:true,
                deleteSegmenttext:"Are you sure you want to delete this Segment ?",
                deleteSegmentHead:"Delete Segment",
                deleteSegmentCancle:true,
                deleteSegmantDelete:true,
                deleteSegmentClose:false

            })
        }
        deleteMessageSegmentsCancel(event){
            event.preventDefault();
            this.setState({
                deleteSegmentId:"",
                deleteSegmentblock:false,
                deleteSegmenttext:"",
                deleteSegmentHead:"",
                deleteSegmentCancle:false,
                deleteSegmantDelete:false,
                deleteSegmentClose:false
            })
        }
        deleteMessageSegmentsClose(event){
            event.preventDefault();
            this.setState({
                deleteSegmentId:"",
                deleteSegmentblock:false,
                deleteSegmenttext:"",
                deleteSegmentHead:"",
                deleteSegmentCancle:false,
                deleteSegmantDelete:false,
                deleteSegmentClose:false
            })
        }
        deleteMessageSegmentsConfirm = async (event) => {
            event.preventDefault();
            // const gfs = chrome.storage.local;
            let user_id = await GetData('user_id');
            
            let  params ={
                segment_id    :   this.state.deleteSegmentId,
                user_id:user_id
            };
            
            // console.log(params);
            this.setState({
                deleteSegmentId:"",
                deleteSegmentblock:false,
                deleteSegmenttext:"",
                deleteSegmentHead:"",
                deleteSegmentCancle:false,
                deleteSegmantDelete:false,
                deleteSegmentClose:false,
                loader:true
            })
            SegmentServices.DeleteSegment(params).then(async result  =>{
                if(result.data.code == 1){
                    let user_id = await GetData('user_id');
                    
                    let  params ={
                        user_id    :   user_id
                    };
                    SegmentServices.getSegment(params).then(result=>{
                      
                    
                    if(result.data.code == 1){
                          this.setState({
                            message_block_List:result.data.payload,
                            loader:false
                          })
                    }else{
                        this.setState({
                            loader:false
                          })
                    }
                    }).catch(error=>{
                        this.setState({
                            loader:false
                          })
                      // console.log("This I got From DDDDBBBBBB EROOOOOO",error);
                    })
                    this.setState({
                        deleteSegmentId:"",
                        deleteSegmentblock:true,
                        deleteSegmenttext:result.data.message,
                        deleteSegmentHead:"Success",
                        deleteSegmentCancle:false,
                        deleteSegmantDelete:false,
                        deleteSegmentClose:true,
                        loader:false
                    })  
                }else if(result.data.code == 2){
                    
                    this.setState({
                        deleteSegmentId:"",
                        deleteSegmentblock:true,
                        deleteSegmenttext:result.data.message,
                        deleteSegmentHead:"Sorry",
                        deleteSegmentCancle:false,
                        deleteSegmantDelete:false,
                        deleteSegmentClose:true,
                        loader:false
                    }) 
                }else if(result.data.code == 3){
                    this.setState({
                        deleteSegmentId:"",
                        deleteSegmentblock:true,
                        deleteSegmenttext:result.data.message,
                        deleteSegmentHead:"Error",
                        deleteSegmentCancle:false,
                        deleteSegmantDelete:false,
                        deleteSegmentClose:true,
                        loader:false
                    }) 
                }else{
                    this.setState({
                        deleteSegmentId:"",
                        deleteSegmentblock:true,
                        deleteSegmenttext:result.data.message,
                        deleteSegmentHead:"Error",
                        deleteSegmentCancle:false,
                        deleteSegmantDelete:false,
                        deleteSegmentClose:true,
                        loader:false
                    }) 
                }
            })
        }
        RemoveMessageSegmentsBlockEdit(block_index,event){
            event.preventDefault();
            let  presentSegmentBlock= this.state.message_block_edit;
            presentSegmentBlock.splice(block_index, 1);

            this.setState({message_block_edit:presentSegmentBlock});
        }
        RemoveMessageSegmentsBlock(block_index,event){
            event.preventDefault();
            let  presentSegmentBlock= this.state.message_block;
            presentSegmentBlock.splice(block_index, 1);

            this.setState({message_block_edit:presentSegmentBlock});

        }
        componentDidMount = async () => {
                let user_id = await GetData('user_id');
                
                let  params ={
                    user_id    :   user_id
                };
                SegmentServices.getSegment(params).then(result=>{
                  
                
                if(result.data.code == 1){
                      this.setState({
                        message_block_List:result.data.payload,
                        loader:false
                      })
                }else{
                    this.setState({
                        loader:false
                      })
                }
                }).catch(error=>{
                    this.setState({
                        loader:false
                      })
                  // console.log("This I got From DDDDBBBBBB EROOOOOO",error);
                })
        }
      render() {
        return (
            <div>
                {this.state.segmentList ?

                    <div className="subtabcontent">
                            {this.state.loader && (   
                                <div className="after_login_refresh"><img src={process.kyubi.loader.preLoader} alt=""/></div>
                            )}
                            {this.state.notifier  && (
                                <div className="group_delete_sreen">
                                    <div className="group_delete_popup">
                                        <h3>{this.state.notifier_head}</h3>
                                        <p>{this.state.notifier_message}</p>
                                    </div>
                                </div>
                            )}
                        { this.state.message_block_List.length != 0 ?
                            <div>
                                <div className="headding">
                                    <span>Message Segments</span> <a onClick={this.addSegmentHandler} className="createbtn"><img src={plusLogo}/> Create New</a>
                                </div>
                                <div className="segmentlists">

                                    { this.state.deleteSegmentblock  && ( 
                                        <div class="group_delete_sreen">
                                            <div className="group_delete_popup">
                                            <h3>{this.state.deleteSegmentHead}</h3>
                                            <p>{this.state.deleteSegmenttext}</p>
                                            <div className="text-right">
                                            { this.state.deleteSegmentCancle  && ( 
                                                <a href="#" onClick={(event) => this.deleteMessageSegmentsCancel(event)} className="bluelink1">Cancel</a>
                                            )} 
                                            { this.state.deleteSegmantDelete  && ( 
                                                <a href="#" onClick={(event) => this.deleteMessageSegmentsConfirm(event)} className="redlink">Delete</a>
                                            )}
                                            { this.state.deleteSegmentClose  && ( 
                                                <a href="#" onClick={(event) => this.deleteMessageSegmentsClose(event)} className="redlink">Close</a>
                                            )} 
                                            </div>
                                            </div>
                                        </div>
                                    )}  
            
                                {this.state.message_block_List && this.state.message_block_List.map((data, index) =>
                                    <div className="segmentlist">
                                        <span className="txt">{data.title}</span>
                                        <span className="txt">{data.message_blocks.length}<br/> Blocks </span>
                                        <div className="action">
                                            {/* <a href="#"><img src={viewLogo} alt=""/></a> */}
                                            <a href="#" onClick={(event) => this.editMessageSegments(data._id,event)} ><img src={editLogo} alt=""/></a>
                                            <a href="#" onClick={(event) => this.deleteMessageSegments(data._id,event)} ><img src={deleteLogo} alt=""/></a>
                                        </div>
                                    </div>
                                )}
                                </div>
                            </div>
                        :
                            <div className="list_no_record">
                                <img src="images/empty_file.svg" alt=""/>
                                <p>{`You haven’t created any Message Segment yet.`}</p>
                                <a onClick={this.addSegmentHandler} className="createbtn"><img src={plusLogo} alt=""/> Create New</a>
                            </div>
                        }
                        
                    </div>
                :
                ""
                }
                {this.state.segmentCreate ?
                    <div className="subtabcontent">
                        {this.state.loader && (   
                                <div className="after_login_refresh"><img src={process.kyubi.loader.preLoader} alt=""/></div>
                        )}
                        <div className="headding gap1">
                            <span className="big">Create a Message Segments</span> 
                            <a  onClick={this.listSegmentHandler} href="#" className="roundarrow"><img src={backArrowLogo}/></a>
                        </div>
                        <form>
                            <label>Title</label>
                            <input type="text" name="sagment_name" value={this.state.sagment_name} onChange={this.inputChangeHandller}  placeholder="Enter your message segment title" className="otherstyle" />
                            {this.state.csn && (
                            <div className="error"> Please Provide Message Segments Title *</div>
                            )}
                            <label>Create message block (s)<br/>
                                <span>Click on the </span>"keyword"
                                <span> to insert into your message</span>
                            </label>
                                {this.state.message_block && this.state.message_block.map((data, index) =>
                                    <span className="selectedBlock" key={index}>{data}<a href="#" className="cross" onClick={(event) => this.RemoveMessageSegmentsBlock(index,event)}>X</a></span>
                                )}
                            <div className="addblock">
                                {this.state.hideTextbox
                                ?
                                <p className="gap1"><a href="#" onClick={this.showTextBoxHandler} className="blue_link">Add another block</a></p>
                                :
                                <textarea name="default_message_text" value={this.state.default_message_text} onChange={this.inputChangeHandller} id="default_message_text" className="withtag otherstyle" placeholder="Build block content">
                        
                                </textarea>
                            }
                            {this.state.isSegmentList && (
                            <div className="error"> Please Provide Message Segments message block *</div>
                            )}
                                
                                {this.state.default_message_text==""
                                ?
                                ""
                                :
                                <a href="#" onClick={this.storeInMessageBlock} className="add">Add</a>
                                }
                                
                            </div>
                            <button type="button" onClick={() => this.insertTagAtMessageSegments('default_message_text', '{first_name}')} className="formtag">[ First Name ]</button> 
                            <button type="button" onClick={() => this.insertTagAtMessageSegments('default_message_text', '{last_name}')} class="formtag">[ Last Name ]</button>
                            <button type="button" onClick={() => this.insertTagAtMessageSegments('default_message_text', '{date}')} class="formtag">[ Todays Date ]</button>

                            <p>&nbsp;</p>

                            <button onClick={this.submitAddSegment} className="blue_btn" type="submit">Save Message Segment</button>
                        </form>  
                    </div>
                :
                ""
                }
                {this.state.segmentEdit ?
                    <div className="subtabcontent">
                        {this.state.loader && (   
                                <div className="after_login_refresh"><img src={process.kyubi.loader.preLoader} alt=""/></div>
                        )}
                        <div className="headding gap1">
                            <span className="big">Edit a Message Segments</span> 
                            <a  onClick={this.listSegmentHandler} href="#" className="roundarrow"><img src={backArrowLogo}/></a>
                        </div>
                        <form>
                            <label>Title</label>
                            <input type="text" name="sagment_name_edit" value={this.state.sagment_name_edit} onChange={this.inputChangeHandller}  placeholder="Enter your message segment title" className="otherstyle" />
                            {this.state.esn && (
                                <div className="error"> Please Provide Message Segments Title *</div>
                            )}
                            <label>Edit message block (s)<br/>
                                <span>Click on the </span>"keyword"
                                <span> to insert into your message</span>
                            </label>
                                {this.state.message_block_edit && this.state.message_block_edit.map((data, index) =>
                                    <span className="selectedBlock">{data}<a href="#"  onClick={(event) => this.RemoveMessageSegmentsBlockEdit(index,event)} className="cross">X</a></span>
                                )}
                            <div className="addblock">
                                {this.state.hideTextboxEdit
                                ?
                                <p className="gap1"><a href="#" onClick={this.showTextBoxHandlerEdit} className="blue_link">Add another block</a></p>
                                :
                                <textarea name="default_message_text_edit" value={this.state.default_message_text_edit} onChange={this.inputChangeHandller} id="default_message_text_edit" className="withtag otherstyle" placeholder="Build block content">
                        
                                </textarea>
                                }
                                
                                {this.state.default_message_text_edit==""
                                ?
                                ""
                                :
                                <a href="#" onClick={this.storeInMessageBlockEdit} className="add">Add</a>
                                }
                            </div>
                            <button type="button" onClick={() => this.insertTagAtMessageSegments_edit('default_message_text_edit', '{first_name}')} className="formtag">[ First Name ]</button> 
                            <button type="button" onClick={() => this.insertTagAtMessageSegments_edit('default_message_text_edit', '{last_name}')} class="formtag">[ Last Name ]</button>
                            <button type="button" onClick={() => this.insertTagAtMessageSegments_edit('default_message_text_edit', '{date}')} class="formtag">[ Todays Date ]</button>

                            <p>&nbsp;</p>
                            {this.state.segBlock && (
                                <div className="error"> Please Provide Message Segments Blocks *</div>
                            )}
                            <button onClick={this.submitAddSegmentEdit} className="blue_btn" type="submit">Update Message Segment</button>
                        </form>  
                    </div>
                :
                ""
                }
            </div>
        )
      }
}
export default  segment;