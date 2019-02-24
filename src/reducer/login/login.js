import {fromJS} from 'immutable';
import {LOGIN_SUCC,LOGIN_OUT_SUCC} from '../../action/loginAction';

let initState = fromJS({
    userId: ''
});

export function login(state = initState, action) {
    let {type, data} = action;
    switch (type) {
        case LOGIN_SUCC:
            return state.set('userId',data);
        case LOGIN_OUT_SUCC:
            return state.set('userId',false);
        default:
            return state;
    }
}