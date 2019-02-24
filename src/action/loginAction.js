
import {fetchData} from '../utils/fetchServe'
import {notification} from "antd";

export const LOGIN_SUCC = 'LOGIN_SUCC';
export const LOGIN_OUT_SUCC = 'LOGIN_OUT_SUCC';


export function login(params) {
    return dispatch => {
        fetchData(`/login`, params).then(res => {
            if(res.data){
                dispatch({
                    type: LOGIN_SUCC,
                    data: res.data
                });
            }else{
                notification.warning({
                    message: '登录消息',
                    description: '登录失败',
                });
            }
        })
    }
}
export function loginout() {
    return{
        type:LOGIN_OUT_SUCC
    }
}