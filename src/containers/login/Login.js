import React from 'react';
import {Form, Input, Button} from 'antd';
import loginbg from '../../image/loginbg.jpg';
import {connect} from 'react-redux';
import {
    login
} from '../../action/loginAction'
import history from "../../history";

const FormItem = Form.Item;
const createForm = Form.create;

class Login extends React.Component {
    constructor() {
        super();
        this.state={
            err:''
        }
    }

    componentWillReceiveProps(newProps){
        let {userId}=newProps;
        if(userId && userId !== this.props.userId){
            history.push({
                pathname:'/bridge/commodity'
            })
        }
    }

    handleSubmit = () => {
        this.props.form.validateFields((errors,values) => {
            if (!!errors) {
                return;
            }
            this.props.login(values);
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        let {err}=this.state;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 16}
        };
        return <div style={{
            height: "100%",
            background: `url(${loginbg})`,
            backgroundSize:'100% 100%',
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
        }}>
            <Form style={{width: 360,background:'#fff',borderRadius:'5px',
                padding:'50px 20px'}}>
                {
                    err && <div style={{color:'#f00',fontSize:'12px',marginLeft:80}}>{err}</div>
                }
                <FormItem {...formItemLayout} label="账号">
                    {getFieldDecorator('account', {
                        rules: [{required: true, message: '请输入账号'}],
                    })(
                        <Input placeholder="请输入账号"/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="密码">
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码'}],
                    })(
                        <Input placeholder="请输入密码" type={"password"}/>
                    )}
                </FormItem>
                <div style={{textAlign: 'center'}}>
                    <Button onClick={this.handleSubmit} type={'primary'} style={{width: 100}}>登录</Button>
                </div>

            </Form>
        </div>
    }
}

let mapStateToAppProps = state => {
    let testState = state.login;
    return {
        userId:testState.get('userId')
    }
};

Login=createForm({})(Login);

export default connect(mapStateToAppProps, {login})(Login);