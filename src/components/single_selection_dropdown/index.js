

import React, { useRef, useState } from 'react'
import { Image, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Dropdown from './dropdown'
import { useSelector } from 'react-redux';
import IsEmpty from '../../utils/IsEmpty';
import Icon from 'react-native-vector-icons/FontAwesome';

const SingleSelectionDropdown = ({ queTitle = '', _dropdownValue, set_dropdownValue, data, itemStyle, textStyle }) => {
    const childRef = useRef();

    return (
        <TouchableOpacity
            onPress={() => {
                Keyboard.dismiss()
                childRef.current.onClickModalize()
            }}
            style={styles1.container}>
            <View style={{ flex: 1 }}>
                <Text style={styles1.formQueText}>{queTitle}</Text>
                <Text style={[styles1.formAnsText, { marginVertical: 8 }]}>{_dropdownValue}</Text>
            </View>
            <View style={{ alignSelf: 'center' }}>
                <Icon name="rocket" style={[styles1.iconStyle, { color: '#979797' }]}
                    onPress={() => {
                        childRef.current.onClickModalize()
                    }} />

            </View>
            <Dropdown
                DATA={data}
                itemStyle={itemStyle}
                textStyle={textStyle}
                ref={childRef}
                onPress={(item) => {
                    set_dropdownValue(item)
                    childRef.current.onClickModalizeItem()

                }}
            />

        </TouchableOpacity>
    )
}

export default SingleSelectionDropdown

const styles1 = StyleSheet.create({
    iconStyle: { fontSize: 13, color: '#0f0f0f', textAlign: 'center', paddingHorizontal: 10 },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        marginVertical: 8,
    },
    labelText: {
        fontFamily: "RobotoCondensed-Regular",
        color: '#979797',
        fontSize: 11,

    },
    valueText: {
        paddingVertical: 10,

        fontFamily: 'Montserrat-Bold',
        color: '#353638'
    },
    formQueText: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 10,
        color: '#979797'
    },
    formAnsText: {
        fontSize: 15,
        fontFamily: 'Montserrat-Medium',
        color: 'black',
        marginTop: 5,
    },
})
