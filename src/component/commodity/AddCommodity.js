import React from 'react';
import {Modal, Form, Input, Select, Row, Col} from 'antd';
import {fetchData} from '../../utils/fetchServe'

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;

class AddCommodity extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            message: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAddUser && nextProps.isAddUser !== this.props.isAddUser) {
            this.props.form.resetFields();
            this.initForm(nextProps);
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
                    values.createDate = new Date().toLocaleDateString();
                    if (updateRecord) {
                        values.id = updateRecord.id;
                        update(values);
                    } else {
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
                let params = {
                    name: value,
                    id: updateRecord.id
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
        let {
            isAddCommodity, handleCancel, updateRecord,classList
        } = this.props;
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 10}
        };
        let title = updateRecord ? '修改构件' : '新增构件';
        return (
            <Modal
                width={'1200px'}
                title={title}
                visible={isAddCommodity}
                onCancel={handleCancel}
                onOk={this.handSubmit}
            >
                <Form>
                    <Row>
                        <Col sm={6}>
                            <FormItem label='所属分类' {...formItemLayout}>
                                {getFieldDecorator('parentId', {
                                    rules: [{required: true, message: '请选择分类'}],
                                })(
                                    <Select placeholder="请选择分类" allowClear={true}>
                                        {
                                            classList.map(opt => {
                                                return (<Option key={opt.id + ''}
                                                                value={opt.id + ''}>
                                                    {opt.name}</Option>);
                                            })
                                        }
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={6}>
                            <FormItem {...formItemLayout} label="构件名称">
                                {getFieldDecorator('name', {
                                    rules: [{required: true, message: '请输入构件名称'},
                                    {validator: this.nameExists}],
                                })(
                                    <Input placeholder="请输入构件名称"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={6}>

                        </Col>
                        <Col sm={6}>

                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}

export default createForm({})(AddCommodity);
