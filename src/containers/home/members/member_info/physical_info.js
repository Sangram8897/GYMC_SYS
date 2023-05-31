
import { StyleSheet, Text, View,TouchableOpacity, Keyboard, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Container, DatePicker, Header, Button, Input } from 'components'
import { useDispatch } from 'react-redux';
import { ColorThemeContext } from '../../../../context/theme_context';

const PhysicalInfo = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { Colors, ToggleTheme } = useContext(ColorThemeContext);
    const [start_date, set_start_date] = useState(new Date())
    const [packages_list, set_packages_list] = useState(null)
    const [selected_package, set_selected_package] = useState(null)

    return (
        <Container >

            <View style={{ padding: 18,margin:10,borderRadius:10, alignItems: 'center',backgroundColor:'#FFF'}}>
                <Text style={styles.title}>{'40.9'}</Text>
                <Text style={styles.sub_title}>{'BMI '}
                <Text style={styles.addre}>{'Overweight'}</Text></Text>

                <View style={{ padding: 18,width:'100%',borderRadius:10,backgroundColor:'#FFF'}}>
            
                <Text style={styles.addre}>{'Height   '}
                <Text style={styles.sub_title}>{'158`2 cm'}</Text></Text>

                <Text style={styles.addre}>{'Weight   '}
                <Text style={styles.sub_title}>{'94 KG'}</Text></Text>

                <Text style={styles.addre}>{'Age     '}
                <Text style={styles.sub_title}>{'25 Years'}</Text></Text>
            </View>
            </View>
            
        </Container>
    )
}

export default PhysicalInfo

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        fontFamily: 'Montserrat-Medium',
        color: '#222',
    },
    sub_title: {
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        color: '#222',
    },
    item: {
        backgroundColor: '#FFF',
        padding: 20,
        marginVertical: 6,
        marginHorizontal: 12,
        borderRadius: 10,
    },
    addre: {
        marginTop: 3,
        fontSize: 18,
        fontFamily: 'Montserrat-Medium',
        color: '#222',
    },
})