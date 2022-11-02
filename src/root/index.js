import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import ColorThemeProvider from '../context/theme_context'
import { Provider } from 'react-redux'
import store from '../store/confugure_store'
import Profile from '../containers/profile'
import App from '../../App'
import Main from './navigation/app_stack'



const Start = () => {
    return (
        <Provider store={store}>
            <ColorThemeProvider><Main /></ColorThemeProvider>
        </Provider>
    )
}

export default Start

const styles = StyleSheet.create({})

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const Satrt = () => {
//   return (
//     <View>
//       <Text>Satrt</Text>
//     </View>
//   )
// }

// export default Satrt

// const styles = StyleSheet.create({})