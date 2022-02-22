import React, { Component } from 'react';
import {MessageSegment} from './MessageSegment';
export class Addbutton extends Component {
constructor(props){
super(props)
this.state={
name:'',
comments:'',
nameError:"",
commentError:""
}
}

validate(){
if(!this.state.name.includes("s") && this.state.comments.length<10 &&this.state.name.includes(" ")){
this.setState({nameError:"Invalid name",commentError:"Comment length should be more than 5"}
)
}
else if(!this.state.name.includes("s")){
this.setState({nameError:"Please include s in the name"})
}
else if( this.state.name.includes(" ")){
this.setState({nameError:"Please remove space from the name"})
}
if(this.state.comments.length<10){
this.setState({commentError:"Comment length should be more than 5"})
}
else{
return true;
}
}
storeData = (event) => {
event.preventDefault();
this.setState({nameError:"",commentError:""})

    if(this.validate()){
        chrome.storage.local.set({'comments': this.state.name});

    }
}
 render() {
return (
<div>
<h2>Create Message Segment</h2>
<form >
<label>Name</label>
<input type="text" name="name" onChange={(event)=>{this.setState({name:event.target.value})}} />
<span className="nameErr">{this.state.nameError}</span>
<br/>
<label>Comments</label>
<textarea name="comments" onChange={(event)=>{this.setState({comments:event.target.value})}}/>
<span className="commentErr">{this.state.commentError}</span>
<br/>

  <button type="submit" onClick={this.storeData}>submit </button>
  <button >Reset</button>
    <div>{this.state.name}</div>
    <div>{this.state.comments}</div>
    </form>
        </div>
    )
}
}

export default Addbutton
