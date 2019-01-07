import  React from 'react'
import {Form, Button, Select, Row, Col} from 'antd'
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
class CommoditySearchForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit=(e)=> {
        e.preventDefault();
        this.props.changeLoading(true);
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        let {classList} = this.props;
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16}
        };
        return (
            <Form layout='horizontal' style={{padding: '10px 0'}}>
                <Row gutter={1}>
                    <Col sm={8}>
                        <FormItem label='分类名称' {...formItemLayout}>
                            {getFieldDecorator('classId')(
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

                    <Col sm={16} style={{textAlign: 'right'}}>
                        <Button style={{marginRight: 10}} type="primary" onClick={this.handleSubmit}>查询</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}
CommoditySearchForm = createForm({
    onFieldsChange: (props, fields) => {
        const {changeSearchFormData} = props;
        changeSearchFormData(fields);
    },
    mapPropsToFields: (props) => {
        const {searchFormData} = props;
        let defaultFormValues = {};
        for(var key in searchFormData){
            defaultFormValues[key] = Form.createFormField({
                value:searchFormData[key]
            })
        }
        return defaultFormValues;
    }
})(CommoditySearchForm);
export default CommoditySearchForm;