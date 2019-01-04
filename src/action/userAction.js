/**
 * Created by zsp on 2018/1/8.
 */
import 'isomorphic-fetch'
import {fetchData} from '../utils/fetchServe'
export const ADD = 'ADD';
export const DEL = 'DEL';
export const UPDATE = 'UPDATE';
export const USER_GET_DATA_LIST = 'USER_GET_DATA_LIST';

export function getCommodity(params) {
    return dispatch => {
        fetchData(`/userList`,params).then(res=>{
            dispatch({
                type:USER_GET_DATA_LIST,
                data:res
            })
        })
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
