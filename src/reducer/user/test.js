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
    users: [],
    loginStatus: '登录中...'
};
export function test(state = initState, action) {
    let {data} = action;
    switch (action.type) {
        case LOGIN_STATUS:
            let loginState = state;
            return {...loginState, loginStatus: action.status};
        case ADD:
            return {...state, users: [...state.users, data]};
        case DEL:
            let delUsers = state.users;
            delUsers = delUsers.filter(item => item.id !== data.id);
            return {...state, users: [...delUsers]};
        case UPDATE:
            let updateUsers = state.users;
            updateUsers = updateUsers.map(item => {
                if(item.id === data.id){
                    item.userName=data.userName;
                }
                return item;
            });
            return {...state, users: [...updateUsers]};
        default:
            return state;
    }
}