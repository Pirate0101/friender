import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {  GetData,OpenPortalInTab } from '../../../helper/helper'
import Header from "../Common/header";
import Footer from "../Common/footer";
import biglogo from "../../../images/128X128.png";
import RefreshLogo from "../../../images/layer1.svg";
import FaceBookLogo from "../../../images/fb_blue.svg";
import IconLogo from "../../../images/icon.svg";
import LoaderLogo from "../../../images/Loader.gif";
import * as authAction from '../../../store/actions/Auth/authAction';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Button from '@mui/material/Button';
let port = chrome.runtime.connect({name: "time to send message"});


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      biglogo: biglogo,
      fb_name: "XXXXX",
      fb_username: "",
      fb_id: "",
      fb_logged_id: "",
      autoresponder: "0",
      default_message: "0",
      loader: false,
      is_user_logged_in_facebook: "false",
      headerText:"Hi Friend !!!"
    }
  }

  componentDidMount = async () => {
    let array = ["Friendship is the hardest thing in the world to explain. It’s not something you learn in school. But if you haven’t learned the meaning of friendship, you really haven’t learned anything. — Muhammad Ali"
    ,"Don’t make friends who are comfortable to be with. Make friends who will force you to lever yourself up. — Thomas J. Watson"
    ,"The most beautiful discovery true friends make is that they can grow separately without growing apart. — Elisabeth Foley"
    ,"Each friend represents a world in us, a world possibly not born until they arrive, and it is only by this meeting that a new world is born. — Anais Nin"
    ,"Life is partly what we make it, and partly what it is made by the friends we choose. — Tennessee Williams"
    ,"They may forget what you said, but they will never forget how you made them feel. — Carl W. Buechner"
    ,"Find a group of people who challenge and inspire you; spend a lot of time with them, and it will change your life. — Amy Poehler"
    ,"For beautiful eyes, look for the good in others; for beautiful lips, speak only words of kindness; and for poise, walk with the knowledge that you are never alone. — Audrey Hepburn"
    ,"The best and most beautiful things in the world cannot be seen or even touched — they must be felt with the heart. — Helen Keller"
    ,"Happiness can be found even in the darkest of times, if one only remembers to turn on the light. — Dumbledore"
    ,"A real friend is one who walks in when the rest of the world walks out. — Walter Winchell"
    ,"A friend is someone who understands your past, believes in your future, and accepts you just the way you are. — Unknown"
    ,"Growing apart doesn’t change the fact that for a long time we grew side by side; our roots will always be tangled. I’m glad for that. — Ally Condie"
    ,"Let us be grateful to the people who make us happy; they are the charming gardeners who make our souls blossom. — Marcel Proust"
    ,"Lots of people want to ride with you in the limo, but what you want is someone who will take the bus with you when the limo breaks down. — Oprah Winfrey"
    ,"In the sweetness of friendship let there be laughter, for in the dew of little things the heart finds its morning and is refreshed. — Khalil Gibran"
    ,"It’s not what we have in life, but who we have in our life that matters. — Unknown"
    ,"To the world you may be just one person, but to one person you may be the world. — Dr. Seuss"
    ,"A friend is one who overlooks your broken fence and admires the flowers in your garden. — Unknown"
    ,"A friend who understands your tears is much more valuable than a lot of friends who only know your smile. — Unknown"
    ,"We weren’t sisters [or brothers] by birth, but we knew from the start…fate brought us together to be sisters [or brothers] by heart. — Unknown"
    ,"A friend is one of the best things you can be and the greatest things you can have. — Sarah Valdez"
    ,"Best friends are the people in your life who make you laugh louder, smile brighter and live better. — Unknown"
    ,"Time doesn’t take away from friendship, nor does separation. — Tennessee Williams"
    ,"When the world is so complicated, the simple gift of friendship is within all of our hands. — Maria Shriver"],
    intervalDurationMs = 5000,
    currentIndex = 0,
    maxNumTimes = -1,
    numTimesRan = 0;
    let interval = setInterval(function() {
      if (maxNumTimes !== 0) {
          this.setState({
              headerText: array[currentIndex]
          });
          currentIndex++;
          if (currentIndex > array.length-1) {
              if (maxNumTimes === -1) {
                  currentIndex = 0;
              } else {
                  numTimesRan++;
                  if (numTimesRan === maxNumTimes) {
                      clearInterval(interval);
                  } else {
                      currentIndex = 0;
                  }
              }
          }
      } else {
          clearInterval(interval);
      }
  }.bind(this), intervalDurationMs);
  }
  fbHandler = async (event) => {
    event.preventDefault();
    
    let kyubi_user_token = await GetData('kyubi_user_token');
    if(kyubi_user_token){
      console.log("You Are Loged in ksjhdfgbkjhtdfg", kyubi_user_token);
      OpenPortalInTab();
    }
     
  }
  render() {
    return (
      <div>
        {this.state.loader && (
          <div className="after_login_refresh"><img src={process.kyubi.loader.preLoader} alt="" /></div>
        )}
        <div className="dashboard">
          <Header selectedtab="dashboard"></Header>

          <div className="after_log_profile">
            <img src={this.state.biglogo} alt="" />
            <p><h3>Welcome to Friender, Friend !!!</h3></p>
            
          </div>
          <div className="fb_login_request">
            
         
              <div className="login_caution">
                
                {this.state.headerText}
                
                </div>
                <Button variant="outlined" size="large" onClick={this.fbHandler} startIcon={<RocketLaunchIcon />}>
                Portal
                </Button>
           
          </div>
          <Footer></Footer>
        </div>
      </div>
    );
  }
}
/**
 * @mapStateToProps
 * grab the values from redux store
 */
const mapStateToProps = state => {
  return {
    ProfileInfo: state.auth.payload
  };
};
/**
* @mapDispatchToProps 
* sending the values to redux store
*/

const mapDispatchToProps = (dispatch) => {
  return {
    setProfileInfo: (load) => dispatch(authAction.addProfileInfo(load))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));