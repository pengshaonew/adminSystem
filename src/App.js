import React, {Component} from 'react';
import {Switch,Router, Route} from 'react-router-dom';
import createBrowserHistory  from 'history/createBrowserHistory'
import Commodity from './containers/Commodity/Commodity';
import Login from './containers/login/Login';
export default class App extends Component {
    render() {
        return (
            <Router history={createBrowserHistory()}>
                <div style={{height:"100%"}}>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/commodity" component={Commodity} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
