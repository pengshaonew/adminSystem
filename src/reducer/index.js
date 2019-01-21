/**
 * Created by zsp on 2018/1/8.
 */
import {combineReducers, applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import {commodity} from './commodity/commodity'
import {login} from './login/login'

let store = createStore(combineReducers({
    login,
    commodity,
}), applyMiddleware(thunk));
window.store = store;
export default store;