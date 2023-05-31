import React, { useContext, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Container, Input, Header, Button, DatePicker } from 'components'
import { StateContext } from './addItem'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'
const ScreenA = () => {
    const stateContext = useContext(StateContext)
    return (
        <View>
           

            <Input
                id='name'
                labal='User Name'
                errorText='Wrong Title'
                initialValue={''}
                initialValid={true}
                onInputChange={stateContext.dispatch}
                required
            />
        
            <Input
                id='mobile_number_primary'
                labal='Mobile Number'
                errorText='Wrong Title'
                initialValue={''}
                initialValid={true}
                onInputChange={stateContext.dispatch}
                required
            />

            <Input
                id='address'
                labal='Address'
                errorText='Wrong Password'
                initialValue={''}
                initialValid={true}
                numberOfLines={5}
                onInputChange={stateContext.dispatch}
                required
            />


        </View>
    )
}
export default ScreenA
const styles = StyleSheet.create({})