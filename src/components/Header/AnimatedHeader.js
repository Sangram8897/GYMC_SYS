import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Title from '../Title'

import Icon from 'react-native-vector-icons/Ionicons';
import { ColorThemeContext } from '../../context/theme_context';
import Colors from '../../style/Colors';

const Header1 = ({
    activeColor,
    backgroundColor,
    inActiveColor,
    showBackButton = false,
    onBackButtonPress = () => { },
    showPlusButton = false,
    onPlusButtonPress = () => { },
}) => {
    // const { Colors } = useContext(ColorThemeContext);
    const Theme = useContext(ColorThemeContext).Colors;
    return (
        <View style={{
            height: 50,
            width: '100%',
            backgroundColor: backgroundColor,
            // borderBottomWidth: 1,
            zIndex: 1000,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 8,
            // width:'110%',
            // alignSelf:'center',
            // elevation:5
        }}>
            <View style={styles.left} >
                {showBackButton &&
                    <Icon
                        onPress={onBackButtonPress}
                        name={'chevron-back'}
                        size={30}
                        color={Colors.COLOR_INACTIVE} />
                }
            </View>
            <Title activeColor={activeColor} inActiveColor={inActiveColor} />
            <View style={styles.right} >
                {showPlusButton &&
                    <Icon
                        onPress={onPlusButtonPress}
                        name={Theme.THEME_TYPE == 'light' ? 'ri-sun-fill' : 'ri-moon-fill'}
                        size={25}
                        color={activeColor} />
                }
            </View>
        </View>
    )
}
export default Header1
const styles = StyleSheet.create({
    left: {
        height: 35, width: 35, justifyContent: 'flex-end', alignItems: 'center'
    },
    right: {
        // backgroundColor: 'red',
        height: 25, width: 25, justifyContent: 'flex-end', alignItems: 'center', alignSelf: 'center'
    }
})