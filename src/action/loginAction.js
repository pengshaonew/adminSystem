
import {fetchData} from '../utils/fetchServe'
import {notification} from "antd";
import history from '../history';

export const LOGIN_SUCC = 'LOGIN_SUCC';


export function login(params) {
    return dispatch => {
        fetchData(`/login`, params).then(res => {
            if(res.data){
                dispatch({
                    type: LOGIN_SUCC,
                    data: res.data
                });
                history.push({
                    pathname:'/bridge/commodity'
                })
            }else{
                notification.warning({
                    message: '登录消息',
                    description: '登录失败',
                });
            }
        })
    }
}