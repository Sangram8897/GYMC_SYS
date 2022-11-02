import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from 'style';
import Size from '../../style/Size';
import { IS_IPHONE_X } from '../../utils';


const _headerTextStyle = {
    fontSize: 18,
    fontFamily: "Montserrat-Medium"
}

export default function Header({
    hasBackButton = true,
    onBackbuttonPress = () => { },
    backgroundcolor = 'blue',
    headerTitle = 'Header',
    headerTextStyle = _headerTextStyle,
}) {
    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: backgroundcolor, paddingTop: IS_IPHONE_X ? 45 : 0 }}>
            {
                hasBackButton == true && <Icon name={'arrow-back'} color={Colors.COLOR_GRAY_DARK} size={Size.OF7 / 2} style={{ alignSelf: 'center', paddingHorizontal: Size.OF1, marginTop: Size.OF1 / 3 }} />
            }
            <View style={{ flex: 1, paddingHorizontal: hasBackButton == true ? Size.OF1 : Size.OF2 }}>

                <Text
                    numberOfLines={1}
                    style={headerTextStyle}>{headerTitle}</Text>
            </View>
            <Icon name={'notifications'} color={Colors.COLOR_GRAY_DARK} size={Size.OF3} style={{ alignSelf: 'center', paddingHorizontal: Size.OF1 }} />
            <Icon name={'search'} color={Colors.COLOR_GRAY_DARK} size={Size.OF3} style={{ alignSelf: 'center', paddingHorizontal: Size.OF1 }} />
        </View>
    )
}
