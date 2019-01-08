import React from 'react';
import {connect} from 'react-redux'
import {Table, Spin, Popconfirm, Button, Divider} from 'antd'
import {
    addCommodity, delCommodity, updateCommodity, getCommodity,changeLoading,init,changeSearchFormData
} from '../../action/commodityAction'
import AddCommodity from "../../component/commodity/AddCommodity";
import CommoditySearchForm from "../../component/commodity/CommoditySearchForm";

class Commodity extends React.Component {
    constructor() {
        super();
        let _this = this;
        this.state = {
            columns: [
                {
                    title: '序号',
                    dataIndex: 'id',
                    render(text,record,index) {
                        return index + 1
                    }
                },
                {
                    title: '商品名称',
                    dataIndex: 'name'
                },
                {
                    title: '操作',
                    key: 'operation',
                    render(text, record) {
                        return (
                            <span>
                                <a onClick={_this.handleUpdate.bind(null, record)}>查看二维码</a>
                                <Divider type="vertical"/>
                                <a onClick={_this.handleUpdate.bind(null, record)}>修改</a>
                                <Divider type="vertical"/>
                                <Popconfirm
                                    title="确定要删除该账户吗?"
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
        let {getCommodity,init,searchFormData} = this.props;
        init();
        getCommodity(searchFormData);
    }

    componentWillReceiveProps(newProps) {
        let {loading, getCommodity,searchFormData} = newProps;
        if (loading && loading !== this.props.loading) {
            getCommodity(searchFormData);
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
            updateRecord: false
        })
    };

    handleUpdate = record => {
        this.setState({isAddCommodity: true, updateRecord: record});
    };

    handleDel = record => {
        this.props.delCommodity({id: record.id});
    };

    render() {
        let {
            loading,projectName, classList,dataList,addCommodity, updateCommodity,changeLoading, searchFormData,changeSearchFormData
        } = this.props;
        let title = () => {
            return <Button type="primary" onClick={this.handleOk.bind(null, 'isAddCommodity')}>新增构件</Button>
        };
        return (
            <div className={'box'}>
                <h1>项目名称：{projectName}</h1>
                <Spin spinning={loading}>
                    {/*<CommoditySearchForm
                        classList={classList}
                        changeLoading={changeLoading}
                        searchFormData={ searchFormData}
                        changeSearchFormData={ changeSearchFormData}
                    />*/}
                    <Table
                        size="small"
                        rowKey={record => record.id}
                        title={title}
                        columns={this.state.columns}
                        dataSource={dataList}
                    />
                </Spin>
                <AddCommodity
                    isAddCommodity={this.state.isAddCommodity}
                    updateRecord={this.state.updateRecord}
                    handleCancel={this.handleCancel}
                    add={addCommodity}
                    update={updateCommodity}
                    classList={classList}
                />
            </div>
        );
    }
}

let mapStateToAppProps = state => {
    let testState = state.commodity;
    return {
        loading: testState.loading,
        dataList: testState.dataList,
        classList: testState.classList,
        projectName: testState.projectName,
        searchFormData: testState.searchFormData,
    }
};
export default connect(mapStateToAppProps, {
    addCommodity, delCommodity, updateCommodity, getCommodity,changeLoading,init,changeSearchFormData
})(Commodity);
