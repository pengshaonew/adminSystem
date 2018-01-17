/**
 * Created by zsp on 2018/1/8.
 */
import {
    LOGIN_STATUS,
    ADD
} from '../action/testAction'
let initState = {
    users: [],
    loginStatus: '登录中...'
};
export function test(state = initState, action) {
    switch (action.type) {
        case ADD:
            return {users: [...state.users, action.data]};
        case LOGIN_STATUS:
            let loginState = state;
            return {...loginState, loginStatus: action.status};
        default:
            return state;
    }
}