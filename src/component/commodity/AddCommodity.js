import React from 'react';
import {Modal, Form, Input} from 'antd';
import {fetchData} from '../../utils/fetchServe'

const FormItem = Form.Item;
const createForm = Form.create;

class AddCommodity extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '新建商品',
            name: '',
            message: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAddUser && nextProps.isAddUser !== this.props.isAddUser) {
            this.initForm(nextProps);
        }
        if (!nextProps.isAddUser) {
            this.props.form.resetFields();
        }
    }

    initForm = props => {
        let {updateRecord} = props;
        if (updateRecord) {
            let values = {
                name: updateRecord.name
            };
            this.props.form.setFieldsValue(values);
        }
    };

    handSubmit = () => {
        this.props.form.validateFields(
            (err, values) => {
                if (!err) {
                    let {add, update, updateRecord, handleCancel} = this.props;
                    if (updateRecord) {
                        values.id = updateRecord.id;
                        update(values);
                    } else {
                        // values.id = Date.now() + '';
                        add(values);
                    }
                    handleCancel();
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
                let {updateRecord} = this.props;
                let params={
                    name:value,
                    id:updateRecord.id
                };
                fetchData(`/commodity/checkCommodityName`, params).then(res => {
                    if (res.data) {
                        callback();
                    } else {
                        callback(new Error('商品名称重复,请重新输入'));
                    }
                });

            }
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        let {isAddUser, handleCancel} = this.props;
        const formItemLayout1 = {
            labelCol: {span: 8},
            wrapperCol: {span: 10}
        };
        return (
            <Modal
                title={this.state.title}
                visible={isAddUser}
                onCancel={handleCancel}
                onOk={this.handSubmit}
            >
                <Form>
                    <FormItem {...formItemLayout1} label="用户名称">
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: '请输入用户名称'},
                                {validator: this.nameExists}],
                        })(
                            <Input placeholder="请输入用户名称"/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default createForm({})(AddCommodity);
