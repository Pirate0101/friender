import React, { Component } from "react";
import { Redirect } from 'react-router-dom'

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


export default ProtectedRoute