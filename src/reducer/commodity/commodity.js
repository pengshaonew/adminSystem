/**
 * Created by zsp on 2018/1/8.
 */
import {
    ADD,
    DEL,
    UPDATE,
    COMMODITY_GET_DATA_LIST,
    COMMODITY_GET_CLASS_DATA,
    CHANGE_LOADING,
    COMMODITY_CHANGE_SEARCH_FORM_DATA,
} from '../../action/commodityAction'
let initState = {
    loading: false,
    searchFormData:{},
    dataList: [],
    classList:[],
    projectName:""
};
export function commodity(state = initState, action) {
    let {type,data} = action;
    switch (type) {
        case CHANGE_LOADING:
            return {...state,loading:true};
        case ADD:
            return {...state, dataList: [...state.dataList, data], loading: false};
        case DEL:
            let delCommodity = state.dataList;
            delCommodity = delCommodity.filter(item => item.id !== data.id);
            return {...state, dataList: [...delCommodity], loading: false};
        case UPDATE:
            let dataListNew = state.dataList;
            dataListNew = dataListNew.map(item => {
                if (item.id === data.id) {
                    item.name = data.name;
                }
                return item;
            });
            return {...state, dataList: [...dataListNew], loading: false};
        case COMMODITY_GET_DATA_LIST:
            return {...state, dataList: [...data], loading: false};
        case COMMODITY_GET_CLASS_DATA:
            return {...state, classList: data.classList,projectName:data.projectName, loading: false};
        case COMMODITY_CHANGE_SEARCH_FORM_DATA:
            let fields = action.fields;
            let searchFormData = state.searchFormData;
            for (let key in fields) {
                if (fields.hasOwnProperty(key)) {
                    searchFormData[key]= fields[key].value;
                }
            }
            return {...state,searchFormData};
        default:
            return state;
    }
}