import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { connect } from 'react-redux';
import auth from '../../Services/authService'
import * as authAction from '../../store/actions/Auth/authAction'
import { Route } from 'react-router'

class ProtectedRoute extends Component {
    loadPermissions = () => {
        const { permissions, profileInfo } = this.props.decodedPermissions;
        console.log(profileInfo);
        if (profileInfo) {
            
                return true
            
        }
    }

    componentDidMount() {
        this.loadPermissions()
    }

    render() {
        return (
            <div >
                <Route>
                    {this.loadPermissions() ? <this.props.component {...this.props} /> : <Redirect to='/' />}
                </Route>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        decodedPermissions: state.auth.payload != null
            ? state.auth.payload
            : ''
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setPermissions: (load) => dispatch(authAction.addPermissionsFunc(load)),
        setProfileInfo: (load) => dispatch(authAction.addProfileInfo(load))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)
