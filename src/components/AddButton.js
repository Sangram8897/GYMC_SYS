import React, { useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import RemixIcon from 'react-native-remix-icon'
import { ColorThemeContext } from '../context/theme_context';

const AddButton = ({ buttonClor, onPress = () => { } }) => {
    const Theme = useContext(ColorThemeContext).Colors;
    return <RemixIcon
        style={styles.button}
        onPress={onPress}
        name={'ri-add-circle-fill'}
        size={55}
        color={buttonClor} />

}

export default AddButton

const styles = StyleSheet.create({
    button: {
        elevation: 5,
        borderRadius: 30,
        backgroundColor: '#fff',
    }
})
