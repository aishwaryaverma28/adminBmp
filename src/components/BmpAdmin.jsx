import React from 'react'
import { Provider } from 'react-redux'
import store from './utils/store'
import BmpHeader from './BmpHeader'
import { Outlet } from 'react-router-dom'
const BmpAdmin = () => {
    return (
        <div>
            <Provider store={store}>
                <BmpHeader />
                <Outlet />
            </Provider>
        </div>
    )
}

export default BmpAdmin