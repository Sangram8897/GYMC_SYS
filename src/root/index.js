import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import ColorThemeProvider from '../context/theme_context'
import { Provider } from 'react-redux'
import store from '../store/confugure_store'
import App from './App'

const Start = () => {
    return (
        <Provider store={store}>
            <ColorThemeProvider><App /></ColorThemeProvider>
        </Provider>
    )
}

export default Start
