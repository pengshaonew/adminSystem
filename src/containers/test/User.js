import React from 'react';
import {connect} from 'react-redux'
import {Table,Spin, Popconfirm, Button, Divider} from 'antd'
import {
    add, init, delUser, updateUser,
} from '../../action/userAction'
import AddUser from "../../component/test/AddUser";
import './user.less'

class User extends React.Component {
    constructor() {
        super();
        let _this = this;
        this.state = {
            isAddUser: false,
            updateRecord: false,
            columns: [
                {
                    title: 'ID',
                    dataIndex: 'id'
                },
                {
                    title: '用户名',
                    dataIndex: 'userName'
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
        let {init} = this.props;
        init();
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
        this.props.delUser({id: record.id});
    };

    render() {
        let {loading,users, add, updateUser,loginStatus} = this.props;
        let title = () => {
            return <Button type="primary" onClick={this.handleOk.bind(null, 'isAddUser')}>新建账户</Button>
        };
        return (
            <div className={'box'}>
                <div>
                    {loginStatus}
                </div>
                <Spin spinning={loading}>
                    <Table
                        size="small"
                        title={title}
                        columns={this.state.columns}
                        dataSource={users}
                    />
                </Spin>
                <AddUser
                    isAddUser={this.state.isAddUser}
                    updateRecord={this.state.updateRecord}
                    handleCancel={this.handleCancel}
                    users={users}
                    add={add}
                    updateUser={updateUser}
                />
            </div>
        );
    }
}

let mapStateToAppProps = state => {
    let testState = state.user;
    return {
        loading: testState.loading,
        users: testState.users,
        loginStatus: testState.loginStatus
    }
};
export default connect(mapStateToAppProps, {
    add, init, delUser, updateUser,
})(User);
