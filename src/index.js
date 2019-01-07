import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import store from './reducer/index';
import {LocaleProvider} from 'antd';
import registerServiceWorker from './registerServiceWorker';
import zhCN from 'antd/lib/locale-provider/zh_CN';

ReactDOM.render(<Provider store={store}>
    <LocaleProvider locale={zhCN}>
        <App />
    </LocaleProvider>
</Provider>, document.getElementById('root'));
registerServiceWorker();
