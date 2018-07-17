/**
 * Created by zsp on 2018/1/8.
 */
import {combineReducers, applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import {user} from './user/user'
let store = createStore(combineReducers({
   user
}), applyMiddleware(thunk));
window.store = store;
export default store;