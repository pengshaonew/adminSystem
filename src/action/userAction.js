/**
 * Created by zsp on 2018/1/8.
 */
import 'isomorphic-fetch'
export const ADD = 'ADD';
export const DEL = 'DEL';
export const UPDATE = 'UPDATE';
export const LOGIN_STATUS = 'LOGIN_STATUS';

export function init() {
    return dispatch => {
        setTimeout(()=>{
            dispatch({
                type: LOGIN_STATUS,
                status: '请求成功'
            });
        },2000)
    }
}

export function add(data) {
    return {
        type: ADD,
        data
    }
}

export function delUser(data) {
    return {
        type: DEL,
        data
    }
}

export function updateUser(data) {
    return {
        type: UPDATE,
        data
    }
}
