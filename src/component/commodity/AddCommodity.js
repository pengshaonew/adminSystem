import React from 'react';
import {Modal, Form, Input, Select, Row, Col,Upload,notification} from 'antd';
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
                    values.createDate = new Date().toLocaleDateString().replace(/\//g,"-");
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
        let parentId=this.props.form.getFieldValue('parentId');
        if (!value) {
            callback();
        } else {
            if (!(/^[\w|\u4e00-\u9fa5]+$/.test(value))) {
                callback(new Error('名称必须是由数字、字母、下划线或文字组成'));
            } else {
                let {updateRecord} = this.props;
                let params = {
                    parentId:parentId,
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

        const typeCode =['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG'];
        const self = this;
        const props = {
            action: `/upload/commodityImg`,
            beforeUpload(file) {
                const suffix = file.name.slice(file.name.lastIndexOf('.') + 1);
                const isTYPE = typeCode.includes(suffix);
                if (!isTYPE) {
                    notification.warning({
                        placement: 'bottomLeft',
                        message: '图片格式',
                        description: `请选择${typeCode.join('/')}格式图片！`,
                        className: 'notification-warning'
                    });
                    return isTYPE;
                }
                const isSIZE = file.size / 1024 / 1024 <= 5;
                if (!isSIZE) {
                    notification.warning({
                        placement: 'bottomLeft',
                        message: '图片大小',
                        description: '请选择小于5M图片！',
                        className: 'notification-warning'
                    });
                    return isSIZE;
                }
                return new Promise((resolve, reject) => {
                    let image = new Image();
                    image.src = window.URL.createObjectURL(file);
                    image.onload = () => {
                        resolve();
                    };
                });
            },
            onChange(info) {
                if (info.file.status === 'error') {
                    notification.error({
                        placement: 'bottomLeft',
                        message: '上传状态',
                        description: '上传文件失败，请联系管理员！',
                        className: 'notification-failed'
                    });
                } else if (info.file.status === 'done') {
                    let response = info.file.response;
                    if (typeof response === 'undefined' || response === null) {
                        notification.error({
                            placement: 'bottomLeft',
                            message: '上传状态',
                            description: '上传文件失败，请联系管理员！',
                            className: 'notification-failed'
                        });
                    } else {
                        console.log(response.data);
                        self.setState({
                            fileUrl: response.data,
                            fileError: ''
                        });
                    }
                }
            }
        };
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
                    <Row>
                        <Col sm={12}>
                            <FormItem {...formItemLayout} label="构件进度图片">
                                <Upload {...props}><a>开始上传</a></Upload>
                            </FormItem>

                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}

export default createForm({})(AddCommodity);
