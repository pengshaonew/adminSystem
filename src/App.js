import React, {Component} from 'react';
import {Switch,Router, Route,BrowserRouter} from 'react-router-dom';
import createBrowserHistory  from 'history/createBrowserHistory'
import User from './containers/test/User'
import './App.css';
export default class App extends Component {
    render() {
        return (
            <Router history={createBrowserHistory()}>
                <div style={{padding:10}}>
                    <Switch>
                        <Route path="/" component={User} ></Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}
