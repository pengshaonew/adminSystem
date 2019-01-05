/**
 * Created by zsp on 2018/1/8.
 */
import {
    ADD,
    DEL,
    UPDATE,
    USER_GET_DATA_LIST,
    CHANGE_LOADING,
} from '../../action/commodityAction'
let initState = {
    loading: false,
    users: []
};
export function commodity(state = initState, action) {
    let {type,data} = action;
    switch (type) {
        case CHANGE_LOADING:
            return {...state,loading:true};
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
        case USER_GET_DATA_LIST:
            return {...state, users: [...data], loading: false};
        default:
            return state;
    }
}