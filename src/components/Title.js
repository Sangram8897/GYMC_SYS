import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ColorThemeContext } from '../context/theme_context';

const Title = ({ activeColor, inActiveColor }) => {
    const Theme = useContext(ColorThemeContext).Colors;
    return (
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
            <Text style={[styles.textstyl1, { color: inActiveColor }]}>GY</Text>
            <Text style={[styles.textstyl1, { color: activeColor }]}>MC</Text>
            <Text style={styles.textstyl3}></Text>
        </View>
    )
}

export default Title

const styles = StyleSheet.create({
    textstyl1: {
        fontFamily: 'Montserrat-ExtraBold',
        fontSize: 22,
        // fontStyle: 'italic',
        // color: Colors.COLOR_BLACK

    },
    textstyl2: {
        fontFamily: 'Montserrat-SemiBoldItalic',
        fontSize: 24,
        // fontStyle: 'italic',
        // color: Colors.COLOR_INACTIVE
    },
    textstyl3: {
        fontFamily: 'Montserrat-BoldItalic',
        fontSize: 24,
        // fontStyle: 'italic',

        color: '#61dafb'//Colors.COLOR_PRIMARY


    },
})
//{'#FF0B46'}        {'#3360A0'}