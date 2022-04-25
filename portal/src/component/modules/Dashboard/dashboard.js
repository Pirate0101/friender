
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails,  updateUserProfiles } from "../../../redux/actions";
import { Panel,Steps,Button, ButtonGroup } from 'rsuite';
import GearIcon from '@rsuite/icons/Gear';
import PeoplesUploadedIcon from '@rsuite/icons/PeoplesUploaded';
import PeopleFliterIcon from '@rsuite/icons/PeopleFliter';
import UserInfoIcon from '@rsuite/icons/UserInfo';
import "rsuite/dist/rsuite.min.css";
const Dashboard = (props) => {
    const [step, setStep] = React.useState(0);
    const onChange = nextStep => {
      setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };
  
    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);
  
        return (
            <div className="content-wrapper">
                <div className="page-header">
              <h3 className="page-title"> Dashboard </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  
                  <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                </ol>
              </nav>
            </div>
            <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                  
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Connect Your Accounts</h4>
                    <Steps current={step}>

                    <Steps.Item title="Install The Extension" description="Description"  icon={<GearIcon style={{ fontSize: 20 }} />} />
                    <Steps.Item title="Connect Your Profile" description="Description"  icon={<UserInfoIcon style={{ fontSize: 20 }} />} />
                    <Steps.Item title="Sync Your Friends" description="Description"  icon={<PeoplesUploadedIcon style={{ fontSize: 20 }} />} />
                    <Steps.Item title="Annalise Your Connection" description="Description"  icon={<PeopleFliterIcon style={{ fontSize: 20 }} />} />
                    </Steps>
                    <hr />
                    <Panel header={`Step: ${step + 1}`}>
                    
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