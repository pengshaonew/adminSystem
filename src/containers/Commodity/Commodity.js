import React from 'react';
import {connect} from 'react-redux'
import {Table,Spin, Popconfirm, Button, Divider} from 'antd'
import {
    addCommodity,delCommodity, updateCommodity,getCommodity,
} from '../../action/commodityAction'
import AddUser from "../../component/commodity/AddCommodity";
import './user.less'

class Commodity extends React.Component {
    constructor() {
        super();
        let _this = this;
        this.state = {
            isAddUser: false,
            updateRecord: false,
            columns: [
                {
                    title: '序号',
                    dataIndex: 'id',
                    render(text){
                        return text+1
                    }
                },
                {
                    title: '商品名称',
                    dataIndex: 'name'
                },
                {
                    title: '操作',
                    key: 'operation',
                    render(text, record){
                        return (
                            <span>
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
            ]
        }
    }

    componentWillMount() {
        let {getCommodity} = this.props;
        getCommodity();
    }
    componentWillReceiveProps(newProps){
        let {loading,getCommodity}=newProps;
        if(loading && loading !==this.props.loading){
            getCommodity();
        }
    }

    handleOk = attr => {
        this.setState({
            [attr]: true
        })
    };
    handleCancel = () => {
        this.setState({
            isAddUser: false,
            updateRecord: false
        })
    };

    handleUpdate = record => {
        this.handleOk('isAddUser');
        this.setState({updateRecord: record});
    };

    handleDel = record => {
        this.props.delCommodity({id: record.id});
    };

    render() {
        let {loading,users, addCommodity, updateCommodity} = this.props;
        let title = () => {
            return <Button type="primary" onClick={this.handleOk.bind(null, 'isAddUser')}>新建商品</Button>
        };
        return (
            <div className={'box'}>
                <Spin spinning={loading}>
                    <Table
                        size="small"
                        rowKey={record => record.id}
                        title={title}
                        columns={this.state.columns}
                        dataSource={users}
                    />
                </Spin>
                <AddUser
                    isAddUser={this.state.isAddUser}
                    updateRecord={this.state.updateRecord}
                    handleCancel={this.handleCancel}
                    add={addCommodity}
                    update={updateCommodity}
                />
            </div>
        );
    }
}

let mapStateToAppProps = state => {
    let testState = state.commodity;
    return {
        loading: testState.loading,
        users: testState.users,
    }
};
export default connect(mapStateToAppProps, {
    addCommodity,delCommodity, updateCommodity, getCommodity,
})(Commodity);
