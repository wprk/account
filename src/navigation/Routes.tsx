import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'

import ComingSoon from '../pages/ComingSoon'
import Login from '../pages/Login'
import LoginCallback from '../pages/LoginCallback'
import Logout from '../pages/Logout'
import NotFound from '../pages/NotFound'
import TeamRegistration from '../pages/TeamRegistration'
import UserRegistration from '../pages/UserRegistration'

const Routes = () => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/profile" />} />
    <ProtectedRoute exact path="/profile" component={ComingSoon} />
    <ProtectedRoute exact path="/team/create" component={TeamRegistration} />
    
    <Route exact path="/login/callback/:token" component={LoginCallback} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/logout" component={Logout} />
    <Route exact path="/register" component={UserRegistration} />
    <Route path="*" component={NotFound} />
  </Switch>
)

export default Routes
