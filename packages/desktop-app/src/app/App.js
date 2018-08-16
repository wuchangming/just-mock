import React from 'react'
import { Provider } from 'react-redux'
import Root from './containers/Root'
import store from './store'
export default () => {
    return (
        <Provider store={store}>
            <Root />
        </Provider>
    )
}
