import React from 'react';
import {
    Modal,
    Form,
    Input,
    Button,
    Table, notification,
} from 'antd';
import {fetchData} from '../../utils/fetchServe';

const FormItem = Form.Item;
const createForm = Form.create;

class ClassList extends React.Component {
    constructor() {
        super();
        let _this = this;
        this.state = {
            columns: [
                {
                    title: '名称',
                    dataIndex: 'name'
                },
                {
                    title: '操作',
                    key: 'operation',
                    render(text, record) {
                        return (
                            <span>
                                <a onClick={_this.handleUpdate.bind(null, record)}>修改</a>
                                {/*<Divider type="vertical"/>
                                <Popconfirm
                                    title="确定要删除这条数据吗?"
                                    onConfirm={_this.handleDel.bind(null, record)}>
                                    <a>删除</a>
                                </Popconfirm>*/}
                            </span>
                        )
                    }
                }
            ],
        }
    }

    handleUpdate = record => {
        this.setState({
            isClassUpdate: true,
            updateRecord: record
        })
    };
    handleCancel = () => {
        this.setState({
            isClassUpdate: false,
            className: false
        })
    };
    handleChange = e => {
        this.setState({
            className: e.target.value
        })
    };
    handSubmit = () => {
        let {updateRecord, className} = this.state;
        if (!className) {
            notification.warning({
                placement: 'bottomLeft',
                message: '请输入分类名称',
                className: 'notification-warning'
            });
        }
        updateRecord.name = className;
        fetchData(`/commodity/checkCommodityName`, updateRecord).then(res => {

        });
    };

    setRowClassName = (record, index) => {
        if (index % 2 === 0) {
            return 'table-even-row';
        } else {
            return 'table-odd-row';
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        let {
            handleCancel, classList
        } = this.props;
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 10}
        };
        return (
            <Modal
                width={'1200px'}
                title={'分类管理'}
                visible
                footer={<Button onClick={handleCancel}>取消</Button>}
                className={'modals'}
            >
                <Table
                    size="small"
                    rowKey={record => record.id}
                    columns={this.state.columns}
                    dataSource={classList}
                    pagination={false}
                    rowClassName={this.setRowClassName}
                />
                <Modal width={600}
                       visible={this.state.isClassUpdate}
                       onCancel={this.handleCancel}
                       onOk={this.handSubmit}
                       title={'修改分类'}>
                    <FormItem label='名称' {...formItemLayout}>
                        <Input onChange={this.handleChange}/>
                    </FormItem>
                </Modal>
            </Modal>
        );
    }
}

export default createForm({})(ClassList);
