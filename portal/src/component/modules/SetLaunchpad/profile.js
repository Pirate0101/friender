import { Fragment } from "react";
const timestamp = require('unix-timestamp');
const Profile = (props)=>{
    let ProfileData=JSON.parse(localStorage.getItem("Profile"));
    console.log(ProfileData);
    return (
        <Fragment>
            <div className="col-md-4 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="d-xl-flex flex-row">
                            <img src={props.profileInfo.UserFacebookImage} className="img-lg rounded" alt="profile icon" />
                            <div className="ml-xl-3 mt-2 mx-xl-4">
                                <h6 className="text-dark">{props.profileInfo.UserFacebookName}</h6>
                                <p className="text-muted">{props.profileInfo.UserFacebookUsername}</p>
                                <p className="mt-2 text-success font-weight-bold">Profile Connection Window : {Date(props.profileInfo.UserdtsgExpire)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
        
    );
}
export default Profile;