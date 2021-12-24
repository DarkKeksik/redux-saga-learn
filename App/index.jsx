import React from 'react'
import { render } from 'react-dom'
import {Provider} from "react-redux";
import store from './src/redux/index'
import App from './src/App'


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('reactRoot')
)