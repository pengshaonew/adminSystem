import React from 'react';
import {connect} from 'react-redux'
import {
    add, init,
} from '../action/userAction'
import './test.less'
class Test extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            message: ''
        }
    }

    componentWillMount() {
        let {init} = this.props;
        init();
    }

    handleAdd = () => {
        let {add, users} = this.props;
        let {userName} = this.state;
        if(!!userName){
            let flag = users.some(item => {
                return item.userName === userName;
            });
            if (!flag) {
                add(userName);
            } else {
                this.setState({
                    message: '用户名已存在'
                })
            }
        }
    };
    handleChange = (e) => {
        let val = e.target.value.replace(/\s*/g, '');
        this.setState({
            userName: val
        }, () => {
            if (!/[a-z|A-Z]\w*/i.test(val)) {
                this.setState({
                    message: '用户名必须开头由数字、字母和下划线组成'
                })
            } else {
                this.setState({
                    message: ''
                })
            }
        })
    };

    render() {
        let {users, loginStatus} = this.props;
        return (
            <div className="App">
                <input type="text" onChange={this.handleChange} value={this.state.userName}/>
                <button onClick={this.handleAdd}>新增</button>
                <span style={{color: 'red'}}>
                    {
                        this.state.message
                    }
                </span>
                <div>{ loginStatus }</div>
                {
                    users.length > 0 && users.map((item, index) => {
                        return <dl key={index}>
                            <dt>
                                用户名:{item.userName}
                            </dt>
                            <dd>
                                ID:{item.id}
                            </dd>
                        </dl>
                    })
                }
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
})(Test);
