/**
 * Created by zsp on 2018/1/8.
 */
import {
    LOGIN_STATUS,
    ADD,
    DEL,
    UPDATE,
} from '../../action/userAction'
let initState = {
    loading: false,
    users: [],
    loginStatus: '登录中...'
};
export function test(state = initState, action) {
    let {data} = action;
    switch (action.type) {
        case LOGIN_STATUS:
            return {...state, loginStatus: action.status};
        case ADD:
            return {...state, users: [...state.users, data], loading: false};
        case DEL:
            let delUsers = state.users;
            delUsers = delUsers.filter(item => item.id !== data.id);
            return {...state, users: [...delUsers], loading: false};
        case UPDATE:
            let updateUsers = state.users;
            updateUsers = updateUsers.map(item => {
                if (item.id === data.id) {
                    item.userName = data.userName;
                }
                return item;
            });
            return {...state, users: [...updateUsers], loading: false};
        default:
            return state;
    }
}