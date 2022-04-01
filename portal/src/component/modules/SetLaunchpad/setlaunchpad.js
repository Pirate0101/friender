import React,{useState, useEffect} from 'react';
import { Panel,Steps,Button, ButtonGroup,ButtonToolbar,IconButton } from 'rsuite';
import GearIcon from '@rsuite/icons/Gear';
import PeoplesUploadedIcon from '@rsuite/icons/PeoplesUploaded';
import PeopleFliterIcon from '@rsuite/icons/PeopleFliter';
import UserInfoIcon from '@rsuite/icons/UserInfo';
import "rsuite/dist/rsuite.min.css";
import { useDispatch, useSelector } from "react-redux";
import { updateFirstName, updateLastName } from "../../../redux/actions";
import Logo from "../../../images/logo.svg";
import AuthServices from "../../../Services/authService"
const Dashboard = (props) => {
    const [step, setStep] = React.useState(1);
    const [worldid, setWorldId] = React.useState(props.worldid);
    const dispatch = useDispatch();
    
    const onChange = nextStep => {
      setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };

    const ConnectFacebookAccounts = async   ()  =>  {
        console.log("Helloooooo",worldid);
        //console.log("Helloooooo",props);
    }
  const SyncFacebookFriends =   async   ()  => {

  }
  
  const nameReducer = useSelector((state) => state.nameReducer);
  const { firstName, lastName, message } = nameReducer;
  const handleFirstName = () => {
    dispatch(updateFirstName("Jason"));
  };
  const handleLastName = () => {
    dispatch(updateLastName("Stathan"));
  };
  const handleReset = () => {
    dispatch({ type: "", action: {} });
  };
    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);
    useEffect(async () => {
        let Worlvariable={worlid:props.worldid}
        await AuthServices.getuserInfoTosetWorld(Worlvariable);
    },[props.worldid])

        return (
                
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="container">
        <label>First Name : {firstName}</label>
        <button onClick={handleFirstName}>Update First Name</button>
        <br />
        <br />
        <label>Last Name : {lastName}</label>
        <button type="submit" onClick={handleLastName}>
          Update First Name
        </button>

        <br />
        <br />
        <br />
        {message && (
          <label style={{ background: "lightgreen" }}>{message}</label>
        )}
        <br />
        <button
          style={{ background: "red" }}
          type="submit"
          onClick={handleReset}
        >
          Reset
        </button>
        
      </div>
                        <div className="content-wrapper d-flex align-items-center auth">
                        <div className="row flex-grow">
                        <div className="col-lg-12 mx-auto">
                            <div className="auth-form-light text-left p-5">
                            <div className="brand-logo">
                                <img src={Logo}/>
                            </div>
                            <h4>Hello! let's get started</h4>
                            
                    <Steps current={step}>

                    <Steps.Item title="Install The Extension" description="Description"  icon={<GearIcon style={{ fontSize: 20 }} />} />
                    <Steps.Item title="Connect Your Profile" description="Description"  icon={<UserInfoIcon style={{ fontSize: 20 }} />} />
                    <Steps.Item title="Sync Your Friends" description="Description"  icon={<PeoplesUploadedIcon style={{ fontSize: 20 }} />} />
                    <Steps.Item title="Annalise Your Connection" description="Description"  icon={<PeopleFliterIcon style={{ fontSize: 20 }} />} />
                    </Steps>
                    <hr />
                    <Panel header={`Step: ${step + 1}`}>
                    {(() => {
        switch(step) {
        case 0:
          return "Please Connect Your Extension"
        case 1:
            return (
            
                <ButtonToolbar>
                    <h1>Please Connect Your FaceBook Account</h1>
                <IconButton appearance="primary" onClick={ConnectFacebookAccounts} color="blue" icon={<UserInfoIcon />}>
                  Connect Facebook Account
                </IconButton>
                
              </ButtonToolbar>)
        case 2:
           return (
            
            <ButtonToolbar>
                <h1>Please Sync Your FaceBook Friends</h1>
            <IconButton appearance="primary"  onClick={SyncFacebookFriends} color="blue" icon={<PeoplesUploadedIcon />}>
              Sync Friends
            </IconButton>
            
          </ButtonToolbar>)
        default:
          return "Please Annalyse Your Friends"}
        })()}
                    </Panel>
                    <hr />
                    <ButtonGroup>
                    <Button onClick={onPrevious} disabled={step === 0}>
                    Previous
                    </Button>
                    <Button onClick={onNext} disabled={step === 3}>
                    Next
                    </Button>
                    </ButtonGroup>
                    </div>
                    </div>
                    </div>
                    </div>
                            
                </div>
                

                )
    
            }


export default Dashboard;