import React, { useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import RemixIcon from 'react-native-remix-icon'
import { ColorThemeContext } from '../context/theme_context';

const FloatingActionButton = ({ buttonClor, onPress = () => { } }) => {
    const Theme = useContext(ColorThemeContext).Colors;
    return <RemixIcon
        style={styles.button}
        onPress={onPress}
        name={'ri-add-circle-fill'}
        size={55}
        color={buttonClor} />

}

export default FloatingActionButton

const styles = StyleSheet.create({
    button: {
        // elevation: 5,
        borderRadius: 30,
        position: 'absolute',
        bottom: 20,
        right: 20,
    }
})
