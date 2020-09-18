import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Details from '../pages/Details';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Upload from '../pages/Upload';
import Subscribedvids from '../pages/Subscribedvids';
import { useSelector } from 'react-redux';

export default function Router() {
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    return (
        <Switch>
            <Route path="/" component={Homepage} exact />
            <Route path="/video/:id" component={userInfo ? Details : Signin} exact />
            <Route path="/signup" component={Signup} exact />
            <Route path="/signin" component={Signin} exact />
            <Route path="/uploadvideo" component={userInfo ? Upload : Signin } exact />
            <Route path="/subcribed" component= {userInfo ? Subscribedvids : Signin} exact />
        </Switch>
    )
}
