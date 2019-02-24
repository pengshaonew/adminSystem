import React from 'react';
import {connect} from 'react-redux'
import {Table, Spin, Popconfirm, Button, Divider, Popover} from 'antd';
import {
    addCommodity, delCommodity, updateCommodity, getCommodity, changeLoading, init, changeSearchFormData
} from '../../action/commodityAction'
import AddCommodity from "../../component/commodity/AddCommodity";
import CommoditySearchForm from "../../component/commodity/CommoditySearchForm";
import './Commodity.less'
import ClassList from "../../component/commodity/ClassList";
import QRCode from 'qrcode.react';
import history from '../../history';

class Commodity extends React.Component {
    constructor() {
        super();
        let _this = this;
        this.state = {
            columns: [
                {
                    title: '构件名称',
                    dataIndex: 'name'
                },
                {
                    title: '分类',
                    dataIndex: 'parentName'
                },
                {
                    title: '操作',
                    key: 'operation',
                    render(text, record) {
                        return (
                            <span>
                                 <Popover content={<QRCode className={'QRCode'} value="http://www.baidu.com" size={200}/>} trigger="click">
                                      <a>查看二维码</a>
                                 </Popover>
                                <Divider type="vertical"/>
                                <a onClick={_this.handleUpdate.bind(null, record)}>修改</a>
                                <Divider type="vertical"/>
                                <Popconfirm
                                    title="确定要删除这条数据吗?"
                                    onConfirm={_this.handleDel.bind(null, record)}>
                                    <a>删除</a>
                                </Popconfirm>
                            </span>
                        )
                    }
                }
            ],
            isAddCommodity: false,
            updateRecord: false
        }
    }

    componentWillMount() {
        let {getCommodity, init, searchFormData, pagination} = this.props;
        init();
        getCommodity({
            pageNum: pagination.get('current'),
            pageSize: pagination.get('pageSize'),
            ...searchFormData.toJS()
        });
    }

    componentWillReceiveProps(newProps) {
        let {loading, getCommodity, searchFormData, pagination,userId} = newProps;
        if(!userId){
            history.push({
                pathname:'/'
            })
        }
        if (loading && loading !== this.props.loading) {
            getCommodity({
                pageNum: pagination.get('current'),
                pageSize: pagination.get('pageSize'),
                ...searchFormData.toJS()
            });
        }
    }

    handleOk = attr => {
        this.setState({
            [attr]: true
        })
    };
    handleCancel = () => {
        this.setState({
            isAddCommodity: false,
            isClassList: false,
            updateRecord: false
        })
    };

    handleUpdate = record => {
        this.setState({isAddCommodity: true, updateRecord: record});
    };

    handleDel = record => {
        this.props.delCommodity({id: record.id});
    };


    handleChangePage = (pagination) => {
        let {changeLoading} = this.props;
        changeLoading(true, pagination.current, pagination.pageSize);
    };

    setRowClassName = (record, index) => {
        if (index % 2 === 0) {
            return 'table-even-row';
        } else {
            return 'table-odd-row';
        }
    };

    render() {
        let {
            loading, projectName, classList, dataList, addCommodity, updateCommodity, changeLoading, searchFormData, changeSearchFormData,
            pagination, init
        } = this.props;
        let title = () => {
            return <div>
                <Button type="primary" onClick={this.handleOk.bind(null, 'isAddCommodity')}
                        style={{marginRight: 20}}>新增构件</Button>
                {/*<Button type="primary" onClick={this.handleOk.bind(null, 'isClassList')}>分类管理</Button>*/}
            </div>
        };
        return (
            <div className={'box'} style={{padding:20}}>
                <h4 style={{minHeight:60,lineHeight:'60px',marginLeft:'20px',fontSize:'24px'}}>项目名称：{projectName}</h4>
                <Spin spinning={loading}>
                    <CommoditySearchForm
                        classList={classList}
                        changeLoading={changeLoading}
                        searchFormData={searchFormData}
                        changeSearchFormData={changeSearchFormData}
                    />
                    <Table
                        size="small"
                        rowKey={record => record.id}
                        title={title}
                        columns={this.state.columns}
                        dataSource={dataList.toJS()}
                        pagination={pagination.toJS()}
                        onChange={this.handleChangePage}
                        rowClassName={this.setRowClassName}
                    />
                </Spin>
                {
                    this.state.isAddCommodity &&
                    <AddCommodity
                        updateRecord={this.state.updateRecord}
                        handleCancel={this.handleCancel}
                        add={addCommodity}
                        update={updateCommodity}
                        classList={classList}
                    />
                }
                {
                    this.state.isClassList &&
                    <ClassList
                        classList={classList}
                        changeLoading={changeLoading}
                        init={init}
                        handleCancel={this.handleCancel}
                    />
                }
            </div>
        );
    }
}

let mapStateToAppProps = state => {
    let testState = state.commodity;
    return {
        loading: testState.get('loading'),
        dataList: testState.get('dataList'),
        classList: testState.get('classList'),
        projectName: testState.get('projectName'),
        searchFormData: testState.get('searchFormData'),
        pagination: testState.get('pagination'),
        userId: state.login.get('userId'),
    }
};
export default connect(mapStateToAppProps, {
    addCommodity, delCommodity, updateCommodity, getCommodity, changeLoading, init, changeSearchFormData
})(Commodity);
