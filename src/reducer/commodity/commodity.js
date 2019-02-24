import {fromJS} from 'immutable';
import {
    COMMODITY_ADD,
    COMMODITY_DEL,
    COMMODITY_UPDATE,
    COMMODITY_GET_DATA_LIST,
    COMMODITY_GET_CLASS_DATA,
    CHANGE_LOADING,
    COMMODITY_CHANGE_SEARCH_FORM_DATA,
} from '../../action/commodityAction'

let initState = fromJS({
    loading: false,
    searchFormData: {},
    dataList: [],
    classList: [],
    projectName: "",
    pagination: {
        current: 0,
        total: 0,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '50', '100'],
    },
});

export function commodity(state = initState, action) {
    let {type, data} = action;
    switch (type) {
        case CHANGE_LOADING:
            let loadingState = state;
            loadingState = loadingState.set('loading', action.flag);
            if (action.pageSize) {
                loadingState = loadingState.setIn(['pagination', 'current'], action.current);
                loadingState = loadingState.setIn(['pagination', 'pageSize'], action.pageSize);
            }
            return loadingState;
        case COMMODITY_GET_DATA_LIST:
            let queryState = state;
            queryState = queryState.set('loading', false);
            queryState = queryState.set('dataList', fromJS(data.list));
            queryState = queryState.setIn(['pagination', 'current'], data.pageNum);
            queryState = queryState.setIn(['pagination', 'pageSize'], data.pageSize);
            queryState = queryState.setIn(['pagination', 'total'], data.total);
            return queryState;
        case COMMODITY_GET_CLASS_DATA:
            let classState = state;
            classState = classState.set('loading', false);
            classState = classState.set('classList', fromJS(data.classList));
            classState = classState.set('projectName', fromJS(data.projectName));
            return classState;
        case COMMODITY_CHANGE_SEARCH_FORM_DATA:
            let fields = action.fields;
            let formState = state;
            for (let key in fields) {
                if (fields.hasOwnProperty(key)) {
                    formState = formState.setIn(['searchFormData', key], fields[key].value);
                }
            }
            return formState;
        default:
            return state;
    }
}