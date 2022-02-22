import React, { Component } from "react";
import plusLogo from  "../../../../../images/plus.svg";
import editLogo from  "../../../../../images/edit1.svg";
import deleteLogo from  "../../../../../images/delete1.svg";
import viewLogo from  "../../../../../images/view.svg";
import backArrowLogo from "../../../../../images/arrow2.svg";
import smallPlusLogo    from "../../../../../images/smallplus.svg";
import blackCrossLogo   from "../../../../../images/black_cross.svg";
import SegmentServices from "../../../../../services/segmentServices.js";
import GroupServices from "../../../../../services/groupServices.js";
import LoaderLogo from "../../../../../images/Loader.gif";
import { GetData } from "../../../../../helper/helper";
class group extends Component {
    constructor(props) {
        super(props)
        this.state = {
                        deleteGroupId:"",
                        deleteGroupblock:false,
                        deleteGrouptext:"",
                        deleteGroupHead:"",
                        deleteGroupCancle:false,
                        deleteGroupDelete:false,
                        deleteGroupClose:false,
                        groupList:1,
                        groupCreate:0,
                        groupEdit:0,
                        openCreateOption:0,
                        openCreateOptionKeyWord:0,
                        openCreateOptionStaticText:0,
                        openCreateOptionSegment:0,
                        DefaultSegments:[],
                        BlockStorage:[],
                        BlockStorageEdit:[],
                        TemporaryBlockStorage:[],
                        TemporaryBlockStorageEdit:[],
                        default_message_text_add:"",
                        default_message_text_edit:"",
                        showAddButton:0,
                        message_Group_List:[],
                        group_name_edit:"",
                        group_block_edit:[],
                        cgn:false,
                        egn:false,
                        loader:true,
                        group_id_edit:"",
                        openEditOption:0,
                        openEditOptionKeyWord:0,
                        openEditOptionStaticText:0,
                        openEditOptionSegment:0,
                        showEditButton:0,
                        notifier:false,
                        notifier_head:"",
                        notifier_message:"",
                        csn: false,
                        isGroupList: false
        }
      }

    addGroupHandler  = async (event) =>  {
        event.preventDefault();
        this.setState({
            groupList:0,
            groupCreate:1,
            groupEdit:0,
            openCreateOption:0,
            openCreateOptionKeyWord:0,
            openCreateOptionStaticText:0,
            openCreateOptionSegment:0
        })
    }
    editGroupHandler  = async (event) =>  {
        event.preventDefault();
        this.setState({
            groupList:0,
            groupCreate:0,
            groupEdit:1,
            openEditOption:0,
            openEditOptionKeyWord:0,
            openEditOptionStaticText:0,
            openEditOptionSegment:0
        })
    }
    addOpenOptions  = async (event) =>  {
        event.preventDefault();
        this.setState({
            openCreateOption:1,
            openCreateOptionKeyWord:0,
            openCreateOptionStaticText:0,
            openCreateOptionSegment:0,
            showAddButton:0
        })
    }
    editOpenOptions = async (event) =>  {
        event.preventDefault();
        this.setState({
            openEditOption:1,
            openEditOptionKeyWord:0,
            openEditOptionStaticText:0,
            openEditOptionSegment:0,
            showEditButton:0
        })
    }
    listGroupHandler  = async (event) =>  {
        event.preventDefault();
        this.setState({
            groupList:1,
            groupCreate:0,
            groupEdit:0,
        })
    }
    addOpenOptionsSegment  = async (event) =>  {
        event.preventDefault();
        this.setState({
            openCreateOptionKeyWord:0,
            openCreateOptionStaticText:0,
            openCreateOptionSegment:1
        })
    }
    editOpenOptionsSegment  = async (event) =>  {
        event.preventDefault();
        this.setState({
            openEditOptionKeyWord:0,
            openEditOptionStaticText:0,
            openEditOptionSegment:1
        })
    }
    addOpenOptionsText  = async (event) =>  {
        event.preventDefault();
        this.setState({
            openCreateOptionKeyWord:0,
            openCreateOptionStaticText:1,
            openCreateOptionSegment:0
        })
    }
    editOpenOptionsText  = async (event) =>  {
        event.preventDefault();
        this.setState({
            openEditOptionKeyWord:0,
            openEditOptionStaticText:1,
            openEditOptionSegment:0
        })
    }
    addOpenOptionsKeyword  = async (event) =>  {
        event.preventDefault();
        this.setState({
            openCreateOptionKeyWord:1,
            openCreateOptionStaticText:0,
            openCreateOptionSegment:0
        })
    }
    editOpenOptionsKeyword  = async (event) =>  {
        event.preventDefault();
        this.setState({
            openEditOptionKeyWord:1,
            openEditOptionStaticText:0,
            openEditOptionSegment:0
        })
    }
    insertBlockIntoTempStore    =   async (type,OptId,OptText,event)=>{

        event.preventDefault();
        let OldTemporaryBlockStorage =this.state.TemporaryBlockStorage;  
        if(type  == 1){
            let eachBlockSegmet ={
                type:"id",
                value:OptId,
                contents:"["+OptText+"]"

            }
            OldTemporaryBlockStorage.push(eachBlockSegmet);
            this.setState({
                TemporaryBlockStorage:OldTemporaryBlockStorage,
                openCreateOption:0,
                openCreateOptionKeyWord:0,
                openCreateOptionStaticText:0,
                openCreateOptionSegment:0,
                showAddButton:1
            })
        }else if(type  == 2){
            let eachBlockText ={
                type:"text",
                value:OptText,
                contents:OptText

            }
            OldTemporaryBlockStorage.push(eachBlockText);
            this.setState({

                TemporaryBlockStorage:OldTemporaryBlockStorage,
                openCreateOption:0,
                openCreateOptionKeyWord:0,
                openCreateOptionStaticText:0,
                openCreateOptionSegment:0,
                default_message_text_add:"",
                showAddButton:1
            })
        }else{
            let eachBlockText ={
                type:"text",
                value:OptText,
                contents:OptText

            }
            OldTemporaryBlockStorage.push(eachBlockText);
            this.setState({

                TemporaryBlockStorage:OldTemporaryBlockStorage,
                openCreateOption:0,
                openCreateOptionKeyWord:0,
                openCreateOptionStaticText:0,
                openCreateOptionSegment:0,
                showAddButton:1
            })
        }
        // console.log("Tis is the set",this.state.TemporaryBlockStorage);
        
    }
    insertBlockIntoTempStoreEdit    =   async (type,OptId,OptText,event)=>{

        event.preventDefault();
        let OldTemporaryBlockStorageEdit =this.state.TemporaryBlockStorageEdit;  
        if(type  == 1){
            let eachBlockSegmetEdit ={
                type:"id",
                value:OptId,
                contents:"["+OptText+"]"

            }
            OldTemporaryBlockStorageEdit.push(eachBlockSegmetEdit);
            this.setState({
                TemporaryBlockStorageEdit:OldTemporaryBlockStorageEdit,
                openEditOption:0,
                openEditOptionKeyWord:0,
                openEditOptionStaticText:0,
                openEditOptionSegment:0,
                showEditButton:1
            })
        }else if(type  == 2){
            let eachBlockTextEdit ={
                type:"text",
                value:OptText,
                contents:OptText

            }
            OldTemporaryBlockStorageEdit.push(eachBlockTextEdit);
            this.setState({

                TemporaryBlockStorageEdit:OldTemporaryBlockStorageEdit,
                openEditOption:0,
                openEditOptionKeyWord:0,
                openEditOptionStaticText:0,
                openEditOptionSegment:0,
                default_message_text_edit:"",
                showEditButton:1
            })
        }else{
            let eachBlockTextEdit ={
                type:"text",
                value:OptText,
                contents:OptText

            }
            OldTemporaryBlockStorageEdit.push(eachBlockTextEdit);
            this.setState({

                TemporaryBlockStorageEdit:OldTemporaryBlockStorageEdit,
                openEditOption:0,
                openEditOptionKeyWord:0,
                openEditOptionStaticText:0,
                openEditOptionSegment:0,
                showEditButton:1
            })
        }
        // console.log("Tis is the set",this.state.TemporaryBlockStorageEdit);
        
    }
    inputChangeHandller = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    RemoveMessageBlockAdd(block_index,event){
        event.preventDefault();
        // console.log("this is the Index",block_index);
        let  TemporaryBlockStorage= this.state.TemporaryBlockStorage;
        TemporaryBlockStorage.splice(block_index, 1);
        this.setState({TemporaryBlockStorage:TemporaryBlockStorage});

    }
    RemoveMessageBlockEdit(block_index,event){
        event.preventDefault();
        // console.log("this is the Index",block_index);
        let  TemporaryBlockStorageEdit= this.state.TemporaryBlockStorageEdit;
        TemporaryBlockStorageEdit.splice(block_index, 1);
        this.setState({TemporaryBlockStorageEdit:TemporaryBlockStorageEdit});

    }
    storeInMessageBlock = async   (event) =>  {
        event.preventDefault();
        let OldBlockStorage   =   this.state.BlockStorage;
        OldBlockStorage.push(this.state.TemporaryBlockStorage);

        this.setState({
            BlockStorage:OldBlockStorage,
            TemporaryBlockStorage:[],
            showAddButton:0
        });
        // console.log("This are the Message Blocks",this.state.BlockStorage)
    }
    storeInMessageBlockEdit = async   (event) =>  {
        event.preventDefault();
        let OldBlockStorage   =   this.state.BlockStorageEdit;
        OldBlockStorage.push(this.state.TemporaryBlockStorageEdit);

        this.setState({
            BlockStorageEdit:OldBlockStorage,
            TemporaryBlockStorageEdit:[],
            showEditButton:0
        });
        // console.log("This are the Message Blocks",this.state.BlockStorageEdit)
    }
    RemoveMessageSegmentsBlockAdd(block_index,event){
        event.preventDefault();
        // console.log("this is the Index",block_index);
        let  presentSegmentBlock= this.state.BlockStorage;
        presentSegmentBlock.splice(block_index, 1);
        this.setState({BlockStorage:presentSegmentBlock});

    }
    RemoveMessageSegmentsBlockEdit(block_index,event){
        event.preventDefault();
        // console.log("this is the Index",block_index);
        let  presentSegmentBlock= this.state.BlockStorageEdit;
        presentSegmentBlock.splice(block_index, 1);
        this.setState({BlockStorageEdit:presentSegmentBlock});

    }
    submitAddGroup = async  (event) =>{
        this.setState({loader:true});
        event.preventDefault();
        let user_id = await GetData('user_id');
        if(this.state.group_name == "" || this.state.group_name == undefined || this.state.group_name == null){
            this.setState({csn:true,loader:false})
        }else{
            this.setState({csn:false})
        } 
        if(this.state.BlockStorage.length == 0){
            this.setState({isGroupList:true,loader:false})
        }
        else{
            this.setState({isGroupList:false})
        }
        if(this.state.group_name && this.state.BlockStorage.length){
            let payload =   {
                BlockStorage:this.state.BlockStorage,
                group_name:this.state.group_name,
                user_id:user_id
            }
            console.log("This I have to save in DB as Group",payload);
            GroupServices.createGroup(payload).then(result=>{
                if(result.data.code == 1){
                    this.setState({
                        message_Group_List:result.data.payload,
                        groupList:1,
                        groupCreate:0,
                        groupEdit:0,
                        openCreateOption:0,
                        openCreateOptionKeyWord:0,
                        openCreateOptionStaticText:0,
                        openCreateOptionSegment:0,
                        loader:false,
                        notifier:true,
                        notifier_head:"Well Done !",
                        notifier_message:"Awesome, you successfully Added a Group"
                    });
                    setInterval(() => {
                        this.setState({
                                notifier:false,
                                notifier_head:"",
                                notifier_message:""
                        });
                    },2000);
                    // console.log("This I got From DDDDBBBBBB EROOOOOO GGGGG",this.state.message_Group_List);
                }
                // console.log("this is more SUUUUUUCCEEEEESSSS",result);
            }).catch(error=>{
                this.setState({
                    groupList:1,
                    groupCreate:0,
                    groupEdit:0,
                    openCreateOption:0,
                    openCreateOptionKeyWord:0,
                    openCreateOptionStaticText:0,
                    openCreateOptionSegment:0,
                    loader:false,
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
    submitEditGroup = async  (event) =>{
        this.setState({loader:true});
        event.preventDefault();
        const gfs = chrome.storage.local;
        // event.preventDefault();
        let user_id = await GetData('user_id');
        if(this.state.group_name_edit == "" || this.state.group_name_edit == undefined || this.state.group_name_edit == null){
            this.setState({csn:true,loader:false})
        }else{
            this.setState({csn:false})
        } 
        if(this.state.BlockStorageEdit.length == 0){
            this.setState({isGroupList:true,loader:false})
        }
        else{
            this.setState({isGroupList:false})
        }
        if(this.state.group_name_edit && this.state.BlockStorageEdit.length){
            let payload =   {
                BlockStorage:this.state.BlockStorageEdit,
                group_name_edit:this.state.group_name_edit,
                user_id:user_id,
                group_id_edit:this.state.group_id_edit
            }
            // console.log("This I have to save in DB as Group",payload);
            GroupServices.UpdateGroup(payload).then(result=>{
                if(result.data.code == 1){
                    // console.log(result.data.payload);
                    this.setState({
                        message_Group_List:result.data.payload,
                        loader:false,
                        groupList:1,
                        groupCreate:0,
                        groupEdit:0,
                        openEditOption:0,
                        openEditOptionKeyWord:0,
                        openEditOptionStaticText:0,
                        openEditOptionSegment:0,
                        notifier:true,
                        notifier_head:"Well Done !",
                        notifier_message:"Awesome, you successfully Edited a Group"
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
                        groupList:1,
                        groupCreate:0,
                        groupEdit:0,
                        openCreateOption:0,
                        openCreateOptionKeyWord:0,
                        openCreateOptionStaticText:0,
                        openCreateOptionSegment:0,
                        loader:false,
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
                // console.log("this is more SUUUUUUCCEEEEESSSS",result);
            }).catch(error=>{
                // console.log("this is more ERRRRROOOOOORRRRRR",error);
                this.setState({
                    groupList:1,
                    groupCreate:0,
                    groupEdit:0,
                    openCreateOption:0,
                    openCreateOptionKeyWord:0,
                    openCreateOptionStaticText:0,
                    openCreateOptionSegment:0,
                    loader:false,
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
            })
        }
    }
    editMessageGroup = async (group_id, event) =>{
        this.setState({loader:true})
        event.preventDefault();
        let  params ={
            group_id    :   group_id
        };
        GroupServices.editGroup(params).then(result  =>{
            // console.log(result);
            if(result.data.code == 1){
                this.setState({
                    group_name_edit:result.data.payload.title,
                    BlockStorageEdit:result.data.payload.associate_blocks,
                    group_id_edit:result.data.payload._id,
                    loader:false,
                    groupList:0,
                    groupCreate:0,
                    groupEdit:1,
                })
          }
        })
    }
    deleteMessageGroup(group_id,event){
        event.preventDefault();
        this.setState({
            deleteGroupId:group_id,
            deleteGroupblock:true,
            deleteGrouptext:"Are you sure you want to delete this Group ?",
            deleteGroupHead:"Delete Group",
            deleteGroupCancle:true,
            deleteGroupDelete:true,
            deleteGroupClose:false

        })
    }
    deleteMessageGroupCancel(event){
        event.preventDefault();
        this.setState({
            deleteGroupId:"",
            deleteGroupblock:false,
            deleteGrouptext:"",
            deleteGroupHead:"",
            deleteGroupCancle:false,
            deleteGroupDelete:false,
            deleteGroupClose:false
        })
    }
    deleteMessageGroupClose(event){
        event.preventDefault();
        this.setState({
            deleteGroupId:"",
            deleteGroupblock:false,
            deleteGrouptext:"",
            deleteGroupHead:"",
            deleteGroupCancle:false,
            deleteGroupDelete:false,
            deleteGroupClose:false
        })
    }
    deleteMessageGroupConfirm = async (event) => {
            event.preventDefault();
            const gfs = chrome.storage.local
            let user_id = await GetData('user_id');
            
            let  params ={
                group_id    :   this.state.deleteGroupId,
                user_id:user_id
            };
            // console.log(params);
            this.setState({
                deleteGroupId:"",
                deleteGroupblock:false,
                deleteGrouptext:"",
                deleteGroupHead:"",
                deleteGroupCancle:false,
                deleteGroupDelete:false,
                deleteGroupClose:false,
                loader:true
            })
            GroupServices.DeleteGroup(params).then(async result=>{
                if(result.data.code == 1){
                    let user_id = await GetData('user_id');
                    
                    let  params ={
                        user_id    :   user_id
                    };
                    GroupServices.getGroup(params).then(result=>{
                      
                    
                    if(result.data.code == 1){
                          this.setState({
                            message_Group_List:result.data.payload,
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
                        deleteGroupId:"",
                        deleteGroupblock:true,
                        deleteGrouptext:result.data.message,
                        deleteGroupHead:"Success",
                        deleteGroupCancle:false,
                        deleteGroupDelete:false,
                        deleteGroupClose:true,
                        loader:false
                    })  
                }else if(result.data.code == 2){
                    
                    this.setState({
                        deleteGroupId:"",
                        deleteGroupblock:true,
                        deleteGrouptext:result.data.message,
                        deleteGroupHead:"Sorry",
                        deleteGroupCancle:false,
                        deleteGroupDelete:false,
                        deleteGroupClose:true,
                        loader:false
                    }) 
                }else if(result.data.code == 3){
                    this.setState({
                        deleteGroupId:"",
                        deleteGroupblock:true,
                        deleteGrouptext:result.data.message,
                        deleteGroupHead:"Error",
                        deleteGroupCancle:false,
                        deleteGroupDelete:false,
                        deleteGroupClose:true,
                        loader:false
                    }) 
                }else{
                    this.setState({
                        deleteGroupId:"",
                        deleteGroupblock:true,
                        deleteGrouptext:result.data.message,
                        deleteGroupHead:"Error",
                        deleteGroupCancle:false,
                        deleteGroupDelete:false,
                        deleteGroupClose:true,
                        loader:false
                    }) 
                }
            }).catch(errorx=>{
                this.setState({
                    deleteGroupId:"",
                    deleteGroupblock:true,
                    deleteGrouptext:"Sorry Internal Server Error !!",errorx,
                    deleteGroupHead:"Error",
                    deleteGroupCancle:false,
                    deleteGroupDelete:false,
                    deleteGroupClose:true,
                    loader:false
                })
            });
    }
    componentDidMount = async () => {
        this.setState({loader:true})
            let user_id = await GetData('user_id');
            
        let  params ={
            user_id    :   user_id
        };
        SegmentServices.getSegment(params).then(result=>{        
            if(result.data.code == 1){
                this.setState({
                    DefaultSegments:result.data.payload
                })
            }
        }).catch(error=>{
          // console.log("This I got From DDDDBBBBBB EROOOOOO",error);
        })
        GroupServices.getGroup(params).then(result=>{
            if(result.data.code == 1){
                this.setState({
                    message_Group_List:result.data.payload,
                    loader:false
                })
                // console.log("This I got From DDDDBBBBBB EROOOOOO GGGGG",this.state.message_Group_List);
            }
        }).catch(error=>{
            this.setState({
               loader:false
            })
          // console.log("This I got From DDDDBBBBBB EROOOOOO",error);
        })
        //message_Group_List

    }
      render() {
        return (
        <div>
            {this.state.groupList ?
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
                { this.state.message_Group_List.length != 0 
                ?
                <div>
                    <div className="headding">
                        <span>Message Group</span> <a href="" onClick={this.addGroupHandler} className="createbtn"><img src={plusLogo}/> Create New</a>
                    </div>
                    <div className="segmentlists">
                    { this.state.deleteGroupblock  && ( 
                        <div class="group_delete_sreen">
                            <div className="group_delete_popup">
                            <h3>{this.state.deleteGroupHead}</h3>
                            <p>{this.state.deleteGrouptext}</p>
                            <div className="text-right">
                            { this.state.deleteGroupCancle  && ( 
                                <a href="#" onClick={(event) => this.deleteMessageGroupCancel(event)} className="bluelink1">Cancel</a>
                            )} 
                            { this.state.deleteGroupDelete  && ( 
                                <a href="#" onClick={(event) => this.deleteMessageGroupConfirm(event)} className="redlink">Delete</a>
                            )}
                            { this.state.deleteGroupClose  && ( 
                                <a href="#" onClick={(event) => this.deleteMessageGroupClose(event)} className="redlink">Close</a>
                            )} 
                            </div>
                            </div>
                        </div>
                    )} 
                    {this.state.message_Group_List && this.state.message_Group_List.map((data, index) =>
                        <div className="segmentlist">
                            <span className="txt">{data.title}</span>
                            <span className="txt">{data.associate_blocks.length}<br/> Blocks </span>
                            <div className="action">
                            <a href="#" onClick={(event) => this.editMessageGroup(data._id,event)} ><img src={editLogo} alt=""/></a>
                            <a href="#" onClick={(event) => this.deleteMessageGroup(data._id,event)} ><img src={deleteLogo} alt=""/></a>
                            </div>
                        </div>
                    )}
                    </div>
                </div>
                :
                <div className="list_no_record">
                    <img src="images/empty_file.svg" alt=""/>
                    <p>You haven’t created any Message Group yet.</p>
                    <a onClick={this.addGroupHandler} className="createbtn"><img src={plusLogo} alt=""/> Create New</a>
                </div>
                }
            </div>
            :
            ""
            }
            {this.state.groupCreate ?
            <div className="subtabcontent">
                {this.state.loader && (   
                                <div className="after_login_refresh"><img src={process.kyubi.loader.preLoader} alt=""/></div>
                )}
                <div class="headding gap1">
                    <span class="big">Create a Message Group</span> 
                    <a  onClick={this.listGroupHandler} href="#" className="roundarrow"><img src={backArrowLogo}/></a>
                </div>
                <form>
                    <label>Title</label>
                        <input type="text" name="group_name" value={this.state.group_name} onChange={this.inputChangeHandller}  placeholder="Enter your message group title" className="otherstyle" />
                        {this.state.csn && (
                            <div className="error"> Please Provide Message groups Title *</div>
                            )}
                    <label>Build message set</label>
                    {this.state.BlockStorage && this.state.BlockStorage.map((data, index) =>
                                    <span className="selectedBlock">{ data.map((newdata) =>
                                        newdata.contents
                                    )}<a href="#" onClick={(event) => this.RemoveMessageSegmentsBlockAdd(index,event)} className="cross">X</a></span>
                    )}
                    <div class="insert_msg">
                        {this.state.TemporaryBlockStorage && this.state.TemporaryBlockStorage.map((data, index) =>

                        <div class="addedinsert">{data.contents}<a href="#"   onClick={(event) => this.RemoveMessageBlockAdd(index,event)} ><img   src={blackCrossLogo}/></a> </div>
                        
                        )}
                        
                        <div class="insert">
                            <a href="" onClick={this.addOpenOptions} ><span ><img src={smallPlusLogo}/></span> Insert {this.state.TemporaryBlockStorage.length > 0 ?" Another" : ""  }</a>
                            {this.state.openCreateOption ? 
                                <div class="insertdropdown">
                                    <ul>
                                        <li><a onClick={this.addOpenOptionsSegment} href="#">Message Segment</a>
                                        {this.state.openCreateOptionSegment ?
                                            <div  class="insertdropdown inserone">
                                                <ul>
                                                    {this.state.DefaultSegments && this.state.DefaultSegments.map((data, index) =>
                                                        <li><a onClick={(event) => this.insertBlockIntoTempStore(1,data._id,data.title,event)}  href="#">{data.title}</a></li>                                                
                                                    )}
                                                </ul>
                                            </div>
                                        :
                                        ""
                                        }
                                        </li>                                  
                                        <li><a onClick={this.addOpenOptionsText} href="#">Static Text</a>
                                            {this.state.openCreateOptionStaticText ?
                                                <div class="insertdropdown insertwo">
                                                    <label>Title</label>
                                                    <textarea name="default_message_text_add" value={this.state.default_message_text_add} onChange={this.inputChangeHandller} id="default_message_text_add" className="withtag otherstyle" placeholder="Please Provide Your Static Text"></textarea>
                                                    <button  onClick={(event) => this.insertBlockIntoTempStore(2,"",this.state.default_message_text_add,event)} class="blue_btn" type="submit">Done</button> 
                                                </div>
                                            :
                                            ""
                                            }
                                        </li>
                                        
                                        <li><a onClick={this.addOpenOptionsKeyword} href="#">Keywords</a>
                                        {this.state.openCreateOptionKeyWord ?
                                            <div class="insertdropdown inserthree">
                                                <ul>
                                                    <li><a onClick={(event) => this.insertBlockIntoTempStore(3,"","{first_name}",event)} href="#">[ First Name ]</a></li>
                                                    <li><a onClick={(event) => this.insertBlockIntoTempStore(3,"","{last_name}",event)} href="#">[ Last Name ]</a></li>
                                                    <li><a onClick={(event) => this.insertBlockIntoTempStore(3,"","{date}",event)} href="#">[ Todays Date ]</a></li>
                                                </ul>
                                            </div>
                                        :
                                        ""
                                        }
                                        </li>
                                    </ul>
                                </div>
                            : 
                            ""
                            }    
                        </div>
                        {this.state.showAddButton
                            ?
                                <a href="#" onClick={this.storeInMessageBlock} className="add">Add</a>
                            :
                                ""
                        }
                    </div>
                    {this.state.isGroupList && (
                        <div className="error"> Please Provide Message Group message block *</div>
                    )}
                    <button onClick={this.submitAddGroup} class="blue_btn" type="submit">Save Message Group</button>
                </form>
            </div>
            :
            ""
            }
            {this.state.groupEdit ?
                <div className="subtabcontent">
                    {this.state.loader && (   
                                <div className="after_login_refresh"><img src={process.kyubi.loader.preLoader} alt=""/></div>
                    )}
                    <div class="headding gap1">
                        <span class="big">Edit a Message Group</span>
                        <a  onClick={this.listGroupHandler} href="#" className="roundarrow"><img src={backArrowLogo}/></a>
                    </div>
                    <form>
                        <label>Title</label>
                        <input type="text" name="group_name_edit" value={this.state.group_name_edit} onChange={this.inputChangeHandller}  placeholder="Enter your message group title" className="otherstyle" />
                        {this.state.csn && (
                            <div className="error"> Please Provide Message groups Title *</div>
                        )}
                        <label>Build message set</label>
                        {this.state.BlockStorageEdit && this.state.BlockStorageEdit.map((data, index) =>
                                    <span className="selectedBlock">{ data.map((newdata) =>
                                        newdata.contents
                                    )}<a href="#" onClick={(event) => this.RemoveMessageSegmentsBlockEdit(index,event)} className="cross">X</a></span>
                        )}
                        <div class="insert_msg">
                        {this.state.TemporaryBlockStorageEdit && this.state.TemporaryBlockStorageEdit.map((data, index) =>

                            <div class="addedinsert">{data.contents}<a href="#"   onClick={(event) => this.RemoveMessageBlockEdit(index,event)} ><img   src={blackCrossLogo}/></a> </div>

                        )}
                            <div class="insert">
                                <a href="" onClick={this.editOpenOptions} ><span ><img src={smallPlusLogo}/></span> Insert {this.state.TemporaryBlockStorageEdit.length > 0 ?" Another" : ""  }</a>
                                {this.state.openEditOption 
                                ?
                                <div class="insertdropdown">
                                    <ul>
                                        <li><a onClick={this.editOpenOptionsSegment} href="#">Message Segment</a>
                                        {this.state.openEditOptionSegment ?
                                            <div  class="insertdropdown inserone">
                                                <ul>
                                                    {this.state.DefaultSegments && this.state.DefaultSegments.map((data, index) =>
                                                        <li><a onClick={(event) => this.insertBlockIntoTempStoreEdit(1,data._id,data.title,event)}  href="#">{data.title}</a></li>                                                
                                                    )}
                                                </ul>
                                            </div>
                                        :
                                        ""
                                        }
                                        </li>                                  
                                        <li><a onClick={this.editOpenOptionsText} href="#">Static Text</a>
                                            {this.state.openEditOptionStaticText ?
                                                <div class="insertdropdown insertwo">
                                                    <label>Title</label>
                                                    <textarea name="default_message_text_edit" value={this.state.default_message_text_edit} onChange={this.inputChangeHandller} id="default_message_text_edit" className="withtag otherstyle" placeholder="Please Provide Your Static Text"></textarea>
                                                    <button  onClick={(event) => this.insertBlockIntoTempStoreEdit(2,"",this.state.default_message_text_edit,event)} class="blue_btn" type="submit">Done</button> 
                                                </div>
                                            :
                                            ""
                                            }
                                        </li>
                                        <li><a onClick={this.editOpenOptionsKeyword} href="#">Keywords</a>
                                        {this.state.openEditOptionKeyWord ?
                                            <div class="insertdropdown inserthree">
                                                <ul>
                                                    <li><a onClick={(event) => this.insertBlockIntoTempStoreEdit(3,"","{first_name}",event)} href="#">[ First Name ]</a></li>
                                                    <li><a onClick={(event) => this.insertBlockIntoTempStoreEdit(3,"","{last_name}",event)} href="#">[ Last Name ]</a></li>
                                                    <li><a onClick={(event) => this.insertBlockIntoTempStoreEdit(3,"","{date}",event)} href="#">[ Todays Date ]</a></li>
                                                </ul>
                                            </div>
                                        :
                                        ""
                                        }
                                        </li>
                                    </ul>
                                </div>
                                :
                                ""
                                }
                            </div>
                            {this.state.showEditButton
                            ?
                                <a href="#" onClick={this.storeInMessageBlockEdit} className="add">Add</a>
                            :
                                ""
                            }
                        </div>
                        {this.state.isGroupList && (
                        <div className="error"> Please Provide Message Group message block *</div>
                        )}
                        <button onClick={this.submitEditGroup} class="blue_btn" type="submit">Update Message Group</button>
                    </form>
                </div>
            :
            ""
            }

        </div>
        )
      }
}
export default  group;