import React, { Component } from "react";
import plusLogo from  "../../../../../images/plus.svg";
import editLogo from  "../../../../../images/edit.svg";
import deleteLogo from  "../../../../../images/delete.svg";
import EmptyFileLogo from "../../../../../images/empty_file.svg";
import LoaderLogo from "../../../../../images/Loader.gif"
import backArrowLogo from "../../../../../images/arrow2.svg";
import GroupLogo    from    "../../../../../images/ic1.svg";
import TextLogo from    "../../../../../images/ic2.svg";
import AutoResponderService from  "../../../../../services/autoResponderServices";
import GroupServices from "../../../../../services/groupServices";
import { WithContext as ReactTags } from 'react-tag-input';
import { GetData } from "../../../../../helper/helper";
import Select from 'react-select';
const options = [
    {value:0,label:"Text  Message"},
    {value:1,label:"Message Group"}
  ];
const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  
const delimiters = [KeyCodes.comma, KeyCodes.enter];
class responseSetting extends Component {
    constructor(props) {
        super(props)
        this.state = {
                selectedOption:  {value:0,label:"Text  Message"},
                selectedGPL:null,
                GPL:[],
                GPLEdit:[],
                MessageGroupListEdit:null,
                selectedOptionEdit:  {value:0,label:"Text  Message"},
                autoreponder_message_group:"",
                edit_group_id:"",
                autoreponder_message_type:0,
                autoreponder_message_type_edit:0,
                autoResponsederList:1,
                autoResponsederCreate:0,
                autoResponsederEdit:0,
                autoresponderListValue:[],
                auto_responder_name:"",
                auto_responder_keywords: [],
                auto_responder_message:"",
                auto_responder_status:1,
                loader:false,
                auto_responder_id_edit:"",
                auto_responder_name_edit:"",
                auto_responder_message_edit:"",
                auto_responder_status_edit:1,
                auto_responder_keywords_edits:[],
                loader:false,
                notifier:false,
                notifier_head:"",
                notifier_message:"",
                isName : false,
                isRespMessage :false,
                iskeyword :false,
                isGroup : false
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);

        this.handleEditDelete = this.handleEditDelete.bind(this);
        this.handleEditAddition = this.handleEditAddition.bind(this);
    }
    autoSetting = () => {
        // console.log("hiyy",this.state.auto_responder_status )
        if(this.state.auto_responder_status === 0){
            this.setState({auto_responder_status:1})
        }else{
            this.setState({auto_responder_status:0})
        }
    }
    autoSettingEdit = () => {
        // console.log("hiyy",this.state.auto_responder_status_edit )
        if(this.state.auto_responder_status_edit === 0){
            this.setState({auto_responder_status_edit:1})
        }else{
            this.setState({auto_responder_status_edit:0})
        }
    }
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        // console.log(`Option selected:`, selectedOption);
        // console.log(`Opppppppppppp`, selectedOption.value);
        this.setState({autoreponder_message_type:selectedOption.value});
    };
    handleChangeEdit = selectedOptionEdit => {
        this.setState({ selectedOptionEdit });
        
        this.setState({autoreponder_message_type_edit:selectedOptionEdit.value});
    };
    handleChangeGPL = selectedGPL =>  {
        this.setState({ selectedGPL });
        // console.log(`Option selected:`, selectedGPL);
        // console.log(`Opppppppppppp`, selectedGPL.value);
        this.setState({autoreponder_message_group:selectedGPL.value});
    }
    handleChangeGPLEdit = MessageGroupListEdit =>  {
        this.setState({ MessageGroupListEdit });
        
        this.setState({edit_group_id:MessageGroupListEdit.value});
    }
    handleDelete(i) {
        const { auto_responder_keywords } = this.state;
        this.setState({
            auto_responder_keywords: auto_responder_keywords.filter((auto_responder_keyword, index) => index !== i),
        });
    }
    handleEditDelete(i) {
        const { auto_responder_keywords_edits } = this.state;
        this.setState({
            auto_responder_keywords_edits: auto_responder_keywords_edits.filter((auto_responder_keywords_edit, index) => index !== i),
        });
    }
    handleAddition(auto_responder_keyword) {
        this.setState(state => ({ auto_responder_keywords: [...state.auto_responder_keywords, auto_responder_keyword] }));
    }
    handleEditAddition(auto_responder_keywords_edit) {
        this.setState(state => ({ auto_responder_keywords_edits: [...state.auto_responder_keywords_edits, auto_responder_keywords_edit] }));
    }
    addAutoResponderHandler  = async (event) =>  {
        this.setState({loader:true});
    event.preventDefault();
    this.setState({
        autoResponsederList:0,
        autoResponsederCreate:1,
        autoResponsederEdit:0,
        loader:false
    })
    
    }

    addAutoResponderHandlerNew = async (event) =>  {
        // console.log("I am Called here");
        event.preventDefault();
        this.setState({
            autoResponsederList:0,
            autoResponsederCreate:1,
            autoResponsederEdit:0,
            loader:false
        })
        
    }
    listAutoResponderHandler  = async (event) =>  {
        event.preventDefault();
        this.setState({
            autoResponsederList:1,
            autoResponsederCreate:0,
            autoResponsederEdit:0,
        })
    }
    /**
     * @insertTagAtMessageSegments
     * in this function we are managing the tag in welcome message area
    */
    insertTagAtMessageSegments(areaId, text) {
        // console.log("Yo");
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
        if(areaId == "auto_responder_message"){
            this.setState({ auto_responder_message: txtarea.value});
        }else{
            this.setState({ auto_responder_message_edit: txtarea.value});
        }
        
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
     /**
        * @inputChangeHandller 
        * getting input field values
    */
    inputChangeHandller = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    createAutoResponderGroupHandler = async (event) =>{
        event.preventDefault();
        const gfs = chrome.storage.local;
        console.log("hue hue");
        this.setState({loader:true});
        let Token = await GetData('kyubi_user_token');
        if(this.state.auto_responder_name==""){
            this.setState({loader:false, isName:true})
        }else{
            this.setState({isName:false})
        }
        if(this.state.autoreponder_message_type == 0 && this.state.auto_responder_message==""){
            this.setState({loader:false, isRespMessage:true})
        }else{
            this.setState({isRespMessage:false})
        }
        if(this.state.auto_responder_keywords==""){
            this.setState({loader:false, iskeyword:true})
        }else{
            this.setState({iskeyword:false})
        }
        if(this.state.autoreponder_message_type == 1 && this.state.autoreponder_message_group==""){
            this.setState({loader:false, isGroup:true})
        }else{
            this.setState({isGroup:false})
        }
        let payload;
        if(this.state.auto_responder_name!="" && this.state.auto_responder_message!="" && this.state.auto_responder_keywords!="" && this.state.autoreponder_message_type==0){
            payload = {
                user_id:Token,
                auto_responder_name:this.state.auto_responder_name,
                auto_responder_keywords:this.state.auto_responder_keywords,
                auto_responder_message:this.state.auto_responder_message,
                auto_responder_status:this.state.auto_responder_status,
                autoreponder_message_type:this.state.autoreponder_message_type,
                autoreponder_message_group:""
            }
            console.log("payload : ", payload);
            AutoResponderService.createAutoResponder(payload).then(async response =>{
                // console.log("This I gottttt AFTER CREATING AR",payload);
            if(response.data.code == 1){
                // const gfs = chrome.storage.local;
                let UserTokenNew = await GetData('kyubi_user_token');
                let payloadNew ={
                    user_id:UserTokenNew
                }
                AutoResponderService.listAutoResponder(payloadNew).then(async responsex =>{
                    if(responsex.data.payload !=  "" ){
                        // console.log("This is what i Got",responsex.data.payload);
                        if(responsex.data.payload.autokey.length>0){
                            // console.log("This is what i Got",responsex.data.payload.autokey);
                            // console.log("This is what i Got the  List",responsex.data.payload.listkey);
                            gfs.set({'keywordsTally': JSON.stringify(responsex.data.payload.listkey)});
                            this.setState({
                                            autoresponderListValue:responsex.data.payload.autokey,
                                            autoResponsederList:1,
                                            autoResponsederCreate:0,
                                            autoResponsederEdit:0,
                                            auto_responder_name:"",
                                            auto_responder_keywords: [],
                                            auto_responder_message:"",
                                            auto_responder_status:1,
                                            loader:false,
                                            notifier:true,
                                            notifier_head:"Well Done !",
                                            notifier_message:"Awesome, you successfully create an AutoResponder"
                            });
                            setInterval(() => {
                                        this.setState({
                                                notifier:false,
                                                notifier_head:"",
                                                notifier_message:""
                                        });
                            },2000);
    
                        }
                    }
                })
            }
            // console.log("This Is I Got ====== ",response);
            });
        }else
        if(this.state.auto_responder_name!="" && this.state.autoreponder_message_group!="" && this.state.auto_responder_keywords!="" && this.state.autoreponder_message_type==1){
            payload = {
                user_id:Token,
                auto_responder_name:this.state.auto_responder_name,
                auto_responder_keywords:this.state.auto_responder_keywords,
                auto_responder_message:"",
                auto_responder_status:this.state.auto_responder_status,
                autoreponder_message_type:this.state.autoreponder_message_type,
                autoreponder_message_group:this.state.autoreponder_message_group
            }
            console.log("payload : ", payload);
            AutoResponderService.createAutoResponder(payload).then(async response =>{
                // console.log("This I gottttt AFTER CREATING AR",payload);
            if(response.data.code == 1){
                // const gfs = chrome.storage.local;
                let UserTokenNew = await GetData('kyubi_user_token');
                let payloadNew ={
                    user_id:UserTokenNew
                }
                AutoResponderService.listAutoResponder(payloadNew).then(async responsex =>{
                    if(responsex.data.payload !=  "" ){
                        // console.log("This is what i Got",responsex.data.payload);
                        if(responsex.data.payload.autokey.length>0){
                            // console.log("This is what i Got",responsex.data.payload.autokey);
                            // console.log("This is what i Got the  List",responsex.data.payload.listkey);
                            gfs.set({'keywordsTally': JSON.stringify(responsex.data.payload.listkey)});
                            this.setState({
                                            autoresponderListValue:responsex.data.payload.autokey,
                                            autoResponsederList:1,
                                            autoResponsederCreate:0,
                                            autoResponsederEdit:0,
                                            auto_responder_name:"",
                                            auto_responder_keywords: [],
                                            auto_responder_message:"",
                                            auto_responder_status:1,
                                            loader:false,
                                            notifier:true,
                                            notifier_head:"Well Done !",
                                            notifier_message:"Awesome, you successfully create an AutoResponder"
                            });
                            setInterval(() => {
                                        this.setState({
                                                notifier:false,
                                                notifier_head:"",
                                                notifier_message:""
                                        });
                            },2000);
    
                        }
                    }
                })
            }
            // console.log("This Is I Got ====== ",response);
            });
        
        }
        
        
        
    }
    createAutoResponderGroupHandlerEdit =  async (event) =>{
        event.preventDefault();
        this.setState({loader:true})
        let Token = await GetData('kyubi_user_token');
        
        let payload = {
            user_id:Token,
            auto_responder_id:this.state.auto_responder_id_edit,
            auto_responder_name:this.state.auto_responder_name_edit,
            auto_responder_keywords:this.state.auto_responder_keywords_edits,
            auto_responder_message:this.state.auto_responder_message_edit,
            auto_responder_status:this.state.auto_responder_status_edit,
            edit_group_id:this.state.edit_group_id,
            autoreponder_message_type:this.state.autoreponder_message_type_edit
        }
        // console.log("This I am Getting",payload)
      
        AutoResponderService.updateAutoResponder(payload).then(async response =>{
            // console.log("This I gottttt",payload);
          if(response.data.code == 1){
            const gfs = chrome.storage.local;
            let UserTokenNew = await GetData('kyubi_user_token');
            
            let payloadNew ={
                user_id:UserTokenNew
            }
            AutoResponderService.listAutoResponder(payloadNew).then(async responsex =>{
                if(responsex.data.payload !=  "" ){
                    // console.log("This is what i Got",responsex.data.payload);
                    if(responsex.data.payload.autokey.length>0){
                        // console.log("This is what i Got",responsex.data.payload.autokey);
                        gfs.set({'keywordsTally': JSON.stringify(responsex.data.payload.listkey)});
                        this.setState({
                                        autoresponderListValue:responsex.data.payload.autokey,
                                        autoResponsederList:1,
                                        autoResponsederCreate:0,
                                        autoResponsederEdit:0,
                                        auto_responder_id_edit:"",
                                        auto_responder_name_edit:"",
                                        auto_responder_keywords_edits:[],
                                        auto_responder_message_edit:"",
                                        auto_responder_status_edit:1,
                                        loader:false,
                                        notifier:true,
                                        notifier_head:"Well Done !",
                                        notifier_message:"Awesome, you successfully Edited an AutoResponder"
                        });
                        setInterval(() => {
                            this.setState({
                                    notifier:false,
                                    notifier_head:"",
                                    notifier_message:""
                            });
                        },2000);
                    }
                  }
            })
          }else{
            this.setState({
                loader:false,
                notifier:true,
                notifier_head:"OOhh Snap !",
                notifier_message:"Something went Wrong  Please try again after sometime"
              });
              setInterval(() => {
                this.setState({
                        loader:false,
                        notifier:false,
                        notifier_head:"",
                        notifier_message:""
                });
              },2000);
          }
          // console.log("This Is I Got ====== ",response);
        });
    }
    editAutoResponder(autoresponder_id,event){
        this.setState({loader:true})
        event.preventDefault();
        let payload = { 
            Id: autoresponder_id 
        }; 
        let GPDID="";
        AutoResponderService.editAutoResponder(payload).then(async response=>{
            // console.log("O)OO)O)O",response);
            if(response.data.code === 1){
                let newKey=[];
                await response.data.payload[0].autoresponderkeywords.map(async (result, i) => {
                    // console.log(result.keywords);
                    newKey.push({"id":result.keywords,"text":result.keywords})
                });
                let opt= {};
                let edopt = 0;
                if(response.data.payload[0].type == "0"){
                    
                    opt= {value:0,label:"Text  Message"}
                    edopt = 0;
                }else{
                   
                    opt= {value:1,label:"Message Group"}
                    edopt = 1;
                }
                this.setState({
                    auto_responder_id_edit:response.data.payload[0]._id,
                    auto_responder_name_edit:response.data.payload[0].auto_responder_name,
                    auto_responder_message_edit:response.data.payload[0].message,
                    auto_responder_status_edit:response.data.payload[0].status,
                    auto_responder_keywords_edits:newKey,
                    autoResponsederList:0,
                    autoResponsederCreate:0,
                    autoResponsederEdit:1,
                    selectedOptionEdit:opt,
                    autoreponder_message_type_edit:edopt,
                    loader:false
                  })
                  GPDID=response.data.payload[0].message_group;
                  let user_id = await GetData('user_id');
                  
                  let GroupParams = {
                    user_id    :   user_id
                  }
                  await GroupServices.getGroup(GroupParams).then(async resultu=>{
                    if(resultu.data.code == 1){
                        let resultGroupList =  [];
                        
                        resultu.data.payload.map(datax=>{
                          
                          resultGroupList.push({value:datax._id,label:datax.title})
                          // console.log("This is GPID",GPDID);
                          if(GPDID != "" && GPDID==datax._id){
          
                            this.setState({
                                MessageGroupListEdit:{value:datax._id,label:datax.title}
                            });
                          }
                        });
                        this.setState({
                        edit_group_id:GPDID,
                          GPLEdit:resultGroupList
                        })
                        
                        
                    }
                    
                  }).catch(error=>{
                    // console.log("This I got From DDDDBBBBBB EROOOOOO",error);
                  })
            }
        }).catch(error=>{

        })
        
    }
    editAutoResponderStatus(autoresponder_id,prestatus){
        this.setState({loader:true})
        let status =1;
        if(prestatus == 1){
            status=0;
        }else{
            status=1;
        }
        let payload = {
            autoresponder_id:autoresponder_id,
            status:status
        };
        // console.log("This is a Seeeee====>",payload);
        AutoResponderService.updateAutoResponderStatus(payload).then(async response =>{
            // console.log("This I gottttt",payload);
          if(response.data.code == 1){
            const gfs = chrome.storage.local;
            let UserTokenNew = await GetData('kyubi_user_token');
            
            let payloadNew ={
                user_id:UserTokenNew
            }
            AutoResponderService.listAutoResponder(payloadNew).then(async responsex =>{
                if(responsex.data.payload !=  "" ){
                    // console.log("This is what i Got",responsex.data.payload);
                    if(responsex.data.payload.autokey.length>0){
                        // console.log("This is what i Got",responsex.data.payload.autokey);
                        gfs.set({'keywordsTally': JSON.stringify(responsex.data.payload.listkey)});
                        this.setState({
                                        autoresponderListValue:responsex.data.payload.autokey,
                                        autoResponsederList:1,
                                        autoResponsederCreate:0,
                                        autoResponsederEdit:0,
                                        loader:false,
                                        notifier:true,
                                        notifier_head:"Well Done !",
                                        notifier_message:"Awesome, you successfully Updated the Status of an AutoResponder"
                                        
                        })
                        setInterval(() => {
                            this.setState({
                                    notifier:false,
                                    notifier_head:"",
                                    notifier_message:""
                            });
                        },2000);
                    }
                  }else{
                    this.setState({
                        loader:false,
                        notifier:true,
                        notifier_head:"OOhh Snap !",
                        notifier_message:"Something went Wrong  Please try again after sometime"
                      });
                      setInterval(() => {
                        this.setState({
                                loader:false,
                                notifier:false,
                                notifier_head:"",
                                notifier_message:""
                        });
                      },2000);
                  }
            })
          }
          // console.log("This Is I Got ====== ",response);
        });
    }
    deleteAutoResponder = async (autoresponder_id,event) => {
        this.setState({loader:true})
        event.preventDefault();
        const gfs = chrome.storage.local;
        let user_id = await GetData('user_id');
        
        let payload = { 
            Id: autoresponder_id ,
            user_id:user_id
        }; 
        // console.log("O)OO)O)O",payload);
        AutoResponderService.deleteAutoResponderStatus(payload).then(async response =>{
            // console.log("This I gottttt",response);
          if(response.data.code == 1){
            let UserTokenNew = await GetData('kyubi_user_token');
            
            let payloadNew ={
                user_id:UserTokenNew
            }
        // console.log("O)OO)O)O",payloadNew);

            AutoResponderService.listAutoResponder(payloadNew).then(async responsex =>{
                if(responsex.data.payload !=  "" ){
                    console.log("responsex.data.payload.listkey : ", responsex.data.payload.listkey);
                    gfs.set({'keywordsTally': responsex.data.payload.listkey});
                        this.setState({
                                        autoresponderListValue:responsex.data.payload.autokey,
                                        autoResponsederList:1,
                                        autoResponsederCreate:0,
                                        autoResponsederEdit:0,
                                        loader:false,  
                                        notifier:true,
                                        notifier_head:"Well Done !",
                                        notifier_message:"Awesome, you successfully Deleted an AutoResponder"
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
                        notifier:true,
                        notifier_head:"OOhh Snap !",
                        notifier_message:"Something went Wrong  Please try again after sometime"
                      });
                      setInterval(() => {
                        this.setState({
                                loader:false,
                                notifier:false,
                                notifier_head:"",
                                notifier_message:""
                        });
                      },2000);
                  }
            })
          }
          // console.log("This Is I Got ====== ",response);
        });
    }
    componentDidMount = async () => {
        this.setState({loader:true});
        const gfs = chrome.storage.local;
        let UserToken = await GetData('kyubi_user_token');
        
        //this.setState({autoresponderList:autoresponderList})
        let payload ={
            user_id:UserToken
        }
        AutoResponderService.listAutoResponder(payload).then(async response =>{
            // console.log("This is what i Got",response);
            
          if(response.data.payload !=  "" ){
            // console.log("This is what i Got",response.data.payload);
            if(response.data.payload.autokey.length>0){
                // console.log("This is what i Got",response.data.payload.autokey);
                this.setState({autoresponderListValue:response.data.payload.autokey,loader:false})
            }
            
          }
          this.setState({loader:false});
        }).catch(error=>{
            this.setState({loader:false});
            this.setState({autoresponderListValue:[],loader:false})
        });
        // const gfs = chrome.storage.local;
        let user_id = await GetData('user_id');
        
        let GroupParams = {
            user_id    :   user_id
          }
          GroupServices.getGroup(GroupParams).then(async result=>{
            if(result.data.code == 1){
                let resultGroupList =  [];
                
                result.data.payload.map(data=>{
                  
                  resultGroupList.push({value:data._id,label:data.title})
                  
                });
                this.setState({
                  GPL:resultGroupList
                })
                
                
            }
            
          }).catch(error=>{
            // console.log("This I got From DDDDBBBBBB EROOOOOO",error);
          })
    }
      render() {
        const { selectedOption,selectedGPL,GPL,auto_responder_keywords,auto_responder_keywords_edits,selectedOptionEdit,GPLEdit,MessageGroupListEdit} = this.state;
        return (
        <>
                {this.state.autoResponsederList ?
                
                <div id="tabautoResponder" className="subtabcontent">
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
                    
                    { this.state.autoresponderListValue.length != 0 ?

                        <div>
                            <div className="headding">
                                <span>Auto Responder Lists</span> <a href="" onClick={this.addAutoResponderHandler} className="createbtn"><img alt="" src={plusLogo}/> Create New</a>
                            </div>
                            <div className="listingholder">

                            {this.state.autoresponderListValue.map((data, i) => {
                                return(
                                    
                                    <div className={data.status === 1  ?  "listing_card" :"listing_card inactive"}>
                                        <div className="head">
                                            <div className="txt">
                                            {data.type=="1"
                                                ?
                                                <img src={GroupLogo} alt=""/>
                                                
                                                :
                                                <img src={TextLogo} alt=""/>
                                                
                                            }       
                                                {data.auto_responder_name}</div>
                                            <div className="action">
                                                <label className="switch_box box_2">
                                                <input type="checkbox" onChange={() => this.editAutoResponderStatus(data._id,data.status)} className="switch_2" id="" name="" checked={data.status === 1  ?  "checked" :""}  />
                                                <div className="toogler"></div>
                                                </label>
                                                <a href="#" onClick={(event) => this.editAutoResponder(data._id,event)} ><img src={editLogo} alt=""/></a> 
                                                <a href="#"  onClick={(event) => this.deleteAutoResponder(data._id,event)} ><img src={deleteLogo} alt=""/></a>
                                            </div>
                                        </div>
                                        <div className="body">
                                                {data && data.type=="1"
                                                ?
                                                <p className="qn">{data && data.messageGroup[0] &&data.messageGroup[0].title}</p>
                                                :
                                                <p className="qn">{data && data.message}</p>
                                                }
                                                
                                                
                                            <div className="listfooter">
                                                <p>Keywords:</p>
                                                {   data.autoresponderkeywords.map((result, i) => {
                                                        return (
                                                            <span class="tags">{result.keywords}</span>
                                                        )
                                                    })
                                                }
                                                
                                            </div>
                                        </div>
                                        
                                    </div>                                  

                                )
                            })}
                            </div>
                        </div>
                            
                    :
                    <div className="list_no_record">
                        <img src={EmptyFileLogo} alt=""/>
                        <p>You haven’t created any Auto Responder yet.</p>
                        <a href="" onClick={this.addAutoResponderHandlerNew} className="createbtn"><img alt="" src={plusLogo}/> Create New</a>
                        
                    </div>
                    }
                </div> 
                :
                ""
                }
                {this.state.autoResponsederCreate ?
                <div id="tabautoResponder" className="subtabcontent">
                    {this.state.loader && (   
                                <div className="after_login_refresh"><img src={process.kyubi.loader.preLoader} alt=""/></div>
                    )}
                    <div className="headding gap1">
                            <span className="big">Create a Auto Responder</span> 
                            <a  onClick={this.listAutoResponderHandler} href="#" className="roundarrow"><img src={backArrowLogo}/></a>
                        </div>
                    <form>
                        <label>
                            Auto Responder Name
                        </label>
                            <input type="text" 
                            name="auto_responder_name" 
                            id="auto_responder_name" 
                            placeholder="Auto-Responder Name" 
                            value={this.state.auto_responder_name}
                            onChange={this.inputChangeHandller}/>
                            {this.state.isName && (
                            <div className="error"> Please Provide Auto Responder Name *</div>
                            )}
                        <label>
                            Keywords
                        </label>
                            <ReactTags 
                            placeholder="Press enter Or Press , to Create Autoresponder Keywords"
                            tags={auto_responder_keywords}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            allowUnique={true}
                            delimiters={delimiters} />
                            {this.state.iskeyword && (
                                <div className="error"> Please Provide keyword *</div>
                            )}
                            <div className="selectbox">
                                <Select
                                
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={options}
                                />
                            </div>
                            {this.state.autoreponder_message_type ? 
                                <div className="selectbox">
                                    <Select
                                    
                                    value={selectedGPL}
                                    onChange={this.handleChangeGPL}
                                    options={GPL}
                                    />
                                {this.state.isGroup && (
                                    <div className="error"> Please Select a group *</div>
                                )}
                                </div>
                                
                            : 
                                <div>
                                    <label>Auto Response Message</label>
                                    <textarea className="withtag" 
                                    name="auto_responder_message"
                                    id="auto_responder_message"
                                    rows="3"  
                                    placeholder="Please enter the response message...."
                                    value={this.state.auto_responder_message}
                                    onChange={this.inputChangeHandller}
                                    ></textarea>
                                    {this.state.isRespMessage && (
                                        <div className="error"> Please Provide Auto Responder messages *</div>
                                    )}
                                    <button type="button" onClick={() => this.insertTagAtMessageSegments('auto_responder_message', '{first_name}')} className="formtag">[ First Name ]</button> 
                                    <button type="button" onClick={() => this.insertTagAtMessageSegments('auto_responder_message', '{last_name}')} class="formtag">[ Last Name ]</button>
                                    <button type="button" onClick={() => this.insertTagAtMessageSegments('auto_responder_message', '{date}')} class="formtag">[ Todays Date ]</button>
                                </div>
                            }
                            
                        <label>
                            {this.state.auto_responder_status ?
                                <input className="checking" type="checkbox" id="checkboxPrimary3" name="auto_responder_status" onChange={this.autoSetting} checked/>
                            :
                                <input className="checking" type="checkbox" id="checkboxPrimary3" name="auto_responder_status" onChange={this.autoSetting}/>
                            }
                            Activate this Auto Responder
                        </label>
    
                        <button className="blue_btn" onClick={this.createAutoResponderGroupHandler} type="submit">Save Auto Responder</button>
                    </form>
                </div>
                :
                ""
                }
                {this.state.autoResponsederEdit?
                <div id="tabautoResponder" className="subtabcontent">
                    {this.state.loader && (   
                                <div className="after_login_refresh"><img src={process.kyubi.loader.preLoader} alt=""/></div>
                    )}
                    <div className="headding gap1">
                            <span className="big">Edit a Auto Responder</span> 
                            <a  onClick={this.listAutoResponderHandler} href="#" className="roundarrow"><img src={backArrowLogo}/></a>
                        </div>
                    <form>
                        <label>
                            Auto Responder Name
                                </label>
                                    <input type="text" 
                                    name="auto_responder_name_edit" 
                                    id="auto_responder_name_edit" 
                                    placeholder="Auto-Responder Name" 
                                    value={this.state.auto_responder_name_edit}
                                    onChange={this.inputChangeHandller}/>
                                <label>
                            Keywords
                                </label>
                                <ReactTags 
                                placeholder="Press enter Or Press , to Create Autoresponder Keywords"
                                tags={auto_responder_keywords_edits}
                                handleDelete={this.handleEditDelete}
                                handleAddition={this.handleEditAddition}
                                allowUnique={true}
                                delimiters={delimiters} />
                                <div className="selectbox">
                                    
                                        <Select
                                        
                                        value={selectedOptionEdit}
                                        onChange={this.handleChangeEdit}
                                        options={options}
                                        />
                                </div>
                            {this.state.autoreponder_message_type_edit ? 
                                <div className="selectbox">
                                    <Select
                                    
                                    value={MessageGroupListEdit}
                                    onChange={this.handleChangeGPLEdit}
                                    options={GPLEdit}
                                    />
                                </div>
                            : 
                                <div>
                                    <label>Auto Response Message</label>
                                    <textarea className="withtag" 
                                    name="auto_responder_message_edit"
                                    id="auto_responder_message_edit"
                                    rows="3"  
                                    placeholder="Please enter the response message...."
                                    value={this.state.auto_responder_message_edit}
                                    onChange={this.inputChangeHandller}
                                    ></textarea>
                                    <button type="button" onClick={() => this.insertTagAtMessageSegments('auto_responder_message_edit', '{first_name}')} className="formtag">[ First Name ]</button> 
                                    <button type="button" onClick={() => this.insertTagAtMessageSegments('auto_responder_message_edit', '{last_name}')} class="formtag">[ Last Name ]</button>
                                    <button type="button" onClick={() => this.insertTagAtMessageSegments('auto_responder_message_edit', '{date}')} class="formtag">[ Todays Date ]</button>
                                </div>
                        }
                        <label>
                            {this.state.auto_responder_status_edit ?
                                <input className="checking" type="checkbox" id="checkboxPrimary3" name="auto_responder_status_edit" onChange={this.autoSettingEdit} checked/>
                            :
                                <input className="checking" type="checkbox" id="checkboxPrimary3" name="auto_responder_status_edit" onChange={this.autoSettingEdit}/>
                            }
                            Activate this Auto Responder
                        </label>
                        <button className="blue_btn" onClick={this.createAutoResponderGroupHandlerEdit} type="submit">Update Auto Responder</button>

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
