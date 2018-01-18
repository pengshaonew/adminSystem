import React from 'react';
import {connect} from 'react-redux'
import {Table, Button} from 'antd'
import {
    add, init,
} from '../../action/userAction'
import AddUser from "../../component/test/AddUser";
class User extends React.Component {
    constructor() {
        super();
        this.state = {
            isAddUser: false,
            columns: [
                {
                    title: 'ID',
                    dataIndex: 'id'
                },
                {
                    title: '用户名',
                    dataIndex: 'userName'
                }
            ]
        }
    }

    componentWillMount() {
        let {init} = this.props;
        init();
    }


    handleOk = (attr) => {
        this.setState({
            [attr]:true
        })
    };
    handleCancel = (attr) => {
        this.setState({
            [attr]:false
        })
    };

    render() {
        let {users, add, loginStatus} = this.props;
        let title = () => {
            return <Button type="primary" onClick={this.handleOk.bind(null,'isAddUser')}>新建账户</Button>
        };
        return (
            <div>
                <Table
                    size="small"
                    title={title}
                    columns={this.state.columns}
                    dataSource={users}
                />
                <AddUser
                    isAddUser={this.state.isAddUser}
                    handleCancel={this.handleCancel}
                    users={users}
                    add={add}
                />
            </div>
        );
    }
}

let mapStateToAppProps = state => {
    let testState = state.test;
    return {
        users: testState.users,
        loginStatus: testState.loginStatus
    }
};
export default connect(mapStateToAppProps, {
    add, init
})(User);
