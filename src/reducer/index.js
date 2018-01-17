/**
 * Created by zsp on 2018/1/8.
 */
import {combineReducers, applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import {test} from './test'
let store = createStore(combineReducers({
    test
}), applyMiddleware(thunk));
window.store = store;
export default store;