import React from 'react';
import {Modal, Form, Input, Select, Row, Col, Upload, notification, Icon, Popover} from 'antd';
import {fetchData} from '../../utils/fetchServe';

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;

class AddCommodity extends React.Component {
    constructor() {
        super();
        this.state = {
            imgUrl: '',
        }
    }

    componentDidMount() {
        this.initForm();
    }

    initForm = () => {
        let {updateRecord} = this.props;
        if (updateRecord) {
            this.setState({imgUrl: updateRecord.imgUrl});
            this.props.form.setFieldsValue(updateRecord);
        }
    };

    handSubmit = () => {
        this.props.form.validateFields(
            (err, values) => {
                if (!err) {
                    let {add, update, updateRecord, handleCancel, classList} = this.props;
                    values.createDate = new Date().toLocaleDateString().replace(/(\d+)[-/](\d+)[-/](\d+)/,function(){
                        return arguments[1]+"-"+(arguments[2]<10?"0"+arguments[2]:arguments[2])+"-"+(arguments[3]<10?"0"+arguments[3]:arguments[3]);
                    });
                    values.parentName = classList.find(item => item.get('id')+'' === values.parentId+'').get('name');
                    values.imgUrl = this.state.imgUrl;
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
        let parentId = this.props.form.getFieldValue('parentId');
        if (!value) {
            callback();
        } else {
            if (false) {
                callback(new Error('名称必须是由数字、字母、下划线或文字组成'));
            } else {
                let {updateRecord} = this.props;
                let params = {
                    parentId,
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

    propsFun = () => {
        const typeCode = ['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG'];
        const self = this;
        const props = {
            accept: 'image/*',
            action: `/chinaRailway/upload/commodityImg`,
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
                const isSIZE = file.size / 1024 / 1024 <= 10;
                if (!isSIZE) {
                    notification.warning({
                        placement: 'bottomLeft',
                        message: '图片大小',
                        description: '请选择小于10M图片！',
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
                            imgUrl: response.url,
                            fileError: ''
                        });
                    }
                }
            }
        };
        return props;
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        let {
            handleCancel, updateRecord, classList
        } = this.props;
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 14}
        };
        let title = updateRecord ? '修改构件' : '新增构件';

        return (
            <Modal
                width={'1200px'}
                title={title}
                visible
                onCancel={handleCancel}
                onOk={this.handSubmit}
                className={'modals'}
            >
                <Form>
                    <Row>
                        <Col sm={8}>
                            <FormItem label='所属分类' {...formItemLayout}>
                                {getFieldDecorator('parentId', {
                                    rules: [{required: true, message: '请选择分类'}],
                                })(
                                    <Select placeholder="请选择分类" allowClear={true}>
                                        {
                                            classList.toJS().map(opt => {
                                                return (<Option key={opt.id + ''}
                                                                value={opt.id + ''}>
                                                    {opt.name}</Option>);
                                            })
                                        }
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="构件名称">
                                {getFieldDecorator('name', {
                                    rules: [{required: true, message: '请输入构件名称'},
                                        {validator: this.nameExists}],
                                })(
                                    <Input placeholder="请输入构件名称"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="构件尺寸">
                                {getFieldDecorator('size')(
                                    <Input placeholder="请输入构件尺寸"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="ZZL1">
                                {getFieldDecorator('ZZL1')(
                                    <Input placeholder="请输入ZZL1"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="构件重量">
                                {getFieldDecorator('weight')(
                                    <Input placeholder="请输入构件重量"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="构件板厚">
                                {getFieldDecorator('thickness')(
                                    <Input placeholder="请输入构件板厚"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="构件长度">
                                {getFieldDecorator('length')(
                                    <Input placeholder="请输入构件长度"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="构件宽度">
                                {getFieldDecorator('width')(
                                    <Input placeholder="请输入构件宽度"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="构件高度">
                                {getFieldDecorator('height')(
                                    <Input placeholder="请输入构件高度"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="下料">
                                {getFieldDecorator('blanking')(
                                    <Input placeholder="请输入下料信息"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="钢板信息">
                                {getFieldDecorator('steelPlate')(
                                    <Input placeholder="请输入钢板信息"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="单元件合格情况">
                                {getFieldDecorator('singleElement')(
                                    <Input placeholder="请输入单元件合格情况"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="组装">
                                {getFieldDecorator('assemble')(
                                    <Input placeholder="请输入组装信息"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="构件焊缝">
                                {getFieldDecorator('weldLine')(
                                    <Input placeholder="请输入构件焊缝信息"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="焊接方法">
                                {getFieldDecorator('weldingMethod')(
                                    <Input placeholder="请输入焊接方法信息"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="焊工信息">
                                {getFieldDecorator('welderInfo')(
                                    <Input placeholder="请输入焊工信息"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="焊缝检测方法">
                                {getFieldDecorator('testMethod')(
                                    <Input placeholder="请输入焊缝检测方法"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="焊缝检测人员信息">
                                {getFieldDecorator('testingPersonnelInfo')(
                                    <Input placeholder="请输入焊缝检测人员信息"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="焊缝合格情况">
                                {getFieldDecorator('qualification')(
                                    <Input placeholder="请输入焊缝合格情况"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="姓名证件号">
                                {getFieldDecorator('idNum')(
                                    <Input placeholder="请输入姓名证件号"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="涂装情况">
                                {getFieldDecorator('paintingSituation')(
                                    <Input placeholder="请输入涂装情况"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="涂装人员信息">
                                {getFieldDecorator('coatingPersonnel')(
                                    <Input placeholder="请输入涂装人员信息"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="漆膜厚度检测">
                                {getFieldDecorator('qmhdjc')(
                                    <Input placeholder="请输入漆膜厚度检测"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="底中面">
                                {getFieldDecorator('dzm')(
                                    <Input placeholder="请输入底中面信息"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="制孔">
                                {getFieldDecorator('zhikong')(
                                    <Input placeholder="请输入制孔信息"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="制孔设备">
                                {getFieldDecorator('zksb')(
                                    <Input placeholder="请输入制孔设备信息"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="制孔人员信息">
                                {getFieldDecorator('zkryxx')(
                                    <Input placeholder="请输入制孔人员信息"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...formItemLayout} label="构件进度图片">
                                <Upload {...this.propsFun()}><a>开始上传</a></Upload>&nbsp;
                                {
                                    this.state.imgUrl &&
                                    <Popover content={<img src={this.state.imgUrl} style={{maxWidth: 600}}/>} title=""
                                             trigger="click" placement="bottom">
                                        <a><Icon type="picture"/></a>
                                    </Popover>
                                }
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}

export default createForm({})(AddCommodity);
