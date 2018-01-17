/**
 * Created by zsp on 2018/1/8.
 */
import {Modal} from 'antd'
import 'isomorphic-fetch'
export const ADD = 'ADD';
export const LOGIN_STATUS = 'LOGIN_STATUS';

export function init() {
    return dispatch => {
        fetch('/msp-war/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: 'zhaoadmin', password: '1234'})
        }).then(response => {
            if (response.status == '200') {
                dispatch({
                    type: LOGIN_STATUS,
                    status: '请求成功'
                });
                Modal.success({
                    title: '请求成功',
                    content: ''
                })
            }
        });
    }
}

export function add(val) {
    return {
        type: ADD,
        data: {
            userName: val,
            id: Date.now()
        }
    }
}
