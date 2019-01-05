import React, {Component} from 'react';
import {Switch,Router, Route} from 'react-router-dom';
import createBrowserHistory  from 'history/createBrowserHistory'
import Commodity from './containers/Commodity/Commodity'
import './App.less';
export default class App extends Component {
    render() {
        return (
            <Router history={createBrowserHistory()}>
                <div style={{padding:10}}>
                    <Switch>
                        <Route path="/" component={Commodity} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
