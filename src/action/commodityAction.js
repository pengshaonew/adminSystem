/**
 * Created by zsp on 2018/1/8.
 */
import 'isomorphic-fetch'
import {fetchData} from '../utils/fetchServe'

export const CHANGE_LOADING = 'CHANGE_LOADING';
export const ADD = 'ADD';
export const DEL = 'DEL';
export const UPDATE = 'UPDATE';
export const COMMODITY_GET_DATA_LIST = 'COMMODITY_GET_DATA_LIST';
export const COMMODITY_GET_CLASS_DATA = 'COMMODITY_GET_CLASS_DATA';
export const COMMODITY_CHANGE_SEARCH_FORM_DATA = 'COMMODITY_CHANGE_SEARCH_FORM_DATA';

export function changeLoading(flag, pageNum, pageSize) {
    return {
        type: CHANGE_LOADING,
        flag,
        pageNum: pageNum || 1,
        pageSize: pageSize || 10
    }
}

export function init() {
    return dispatch => {
        fetchData(`/class/classList`,{}).then(res => {
            dispatch({
                type: COMMODITY_GET_CLASS_DATA,
                data: res
            })
        })
    }
}
export function getCommodity(params) {
    return dispatch => {
        fetchData(`/commodity/commodityList`, params).then(res => {
            dispatch({
                type: COMMODITY_GET_DATA_LIST,
                data: res
            })
        })
    }
}

export function addCommodity(params) {
    return dispatch => {
        fetchData(`/commodity/addCommodity`, params).then(res => {
            if (res.flag) {
                dispatch(changeLoading(true));
            }
        })
    }
}

export function delCommodity(params) {
    return dispatch => {
        fetchData(`/commodity/deleteCommodity`, params).then(res => {
            if (res.flag) {
                dispatch(changeLoading(true));
            }
        })
    }
}

export function updateCommodity(params) {
    return dispatch => {
        fetchData(`/commodity/updateCommodity`, params).then(res => {
            if (res.flag) {
                dispatch(changeLoading(true));
            }
        })
    }
}
/**
 * 修改查询表单数据
 */
export function changeSearchFormData(fields) {
    return {
        type: COMMODITY_CHANGE_SEARCH_FORM_DATA,
        fields: fields
    }
}
