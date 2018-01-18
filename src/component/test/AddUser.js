import React from 'react';
import {Modal, Form, Input} from 'antd';
const FormItem = Form.Item;
const createForm = Form.create;
class AddUser extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '新建账号',
            userName: '',
            message: ''
        }
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.isAddUser){
            this.props.form.resetFields();
        }
    }

    handSubmit = () => {
        this.props.form.validateFields(
            (err, values) => {
                if (!err) {
                    let {add, users, handleCancel} = this.props;
                    let {userName} = values;
                    if (!!userName) {
                        let flag = users.some(item => {
                            return item.userName === userName;
                        });
                        if (!flag) {
                            values.id = Date.now();
                            add(values);
                            handleCancel('isAddUser');
                        }
                    }
                }
            }
        );

    };
    // 校验名称是否重复
    nameExists = (rule, value, callback) => {
        if (!value) {
            callback();
        } else {
            if (!(/^[\w|\u4e00-\u9fa5]+$/.test(value))) {
                callback(new Error('名称必须是由数字、字母、下划线或文字组成'));
            } else {
                let flag = this.props.users.some(item => {
                    return item.userName === value;
                });
                if (flag) {
                    callback(new Error('用户名重复,请重新输入'));
                } else {
                    callback();
                }
            }
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        let {loginStatus, isAddUser, handleCancel} = this.props;
        const formItemLayout1 = {
            labelCol: {span: 8},
            wrapperCol: {span: 10}
        };
        return (
            <Modal
                title={this.state.title}
                visible={isAddUser}
                onCancel={handleCancel.bind(null, 'isAddUser')}
                onOk={this.handSubmit}
            >
                <Form >
                    <FormItem {...formItemLayout1} label="用户名称">
                        {getFieldDecorator('userName', {
                            rules: [{required: true, message: '请输入用户名称'},
                                {validator: this.nameExists}],
                        })(
                            <Input placeholder="请输入用户名称"/>
                        )}
                    </FormItem>
                </Form>
                <div>{ loginStatus }</div>
            </Modal>
        );
    }
}

export default createForm({})(AddUser);
