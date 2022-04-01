import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import {Route} from 'react-router'
import auth from '../../Services/authService'

class UnProtectedRoute extends Component {
    render () {
        return(
                <div >
                    <Route>
                    {!auth.checkLogin()? <this.props.component {...this.props} /> : <Redirect to='/dashboard'/>}
                    </Route>
                </div>
                )
    }
}
export default UnProtectedRoute
