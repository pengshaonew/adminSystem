/**
 * Created by zsp on 2018/1/8.
 */
import {combineReducers, applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import {commodity} from './commodity/commodity'
let store = createStore(combineReducers({
   commodity
}), applyMiddleware(thunk));
window.store = store;
export default store;