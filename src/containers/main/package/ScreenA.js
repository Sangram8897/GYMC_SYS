import React, { useContext, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Container, Input, Header, Button, DatePicker } from 'components'
import { StateContext } from './addPackage'
import SingleSelectionDropdown from '../../../components/single_selection_dropdown'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'
const duration = [
    { id: 1, name: '1 Month', periodIndays: 30 },
    { id: 2, name: '3 Month', periodIndays: 90 },
    { id: 3, name: '6 Month', periodIndays: 180 },
    { id: 4, name: '1 Year', periodIndays: 360 },
]

const ScreenA = () => {
    const stateContext = useContext(StateContext)
    return (
        <View>
            <DatePicker
                selectedDate={new Date()}
                onDateChange={(current_date) => stateContext.dispatch('start_date', current_date, true)}

            />

            <Input
                id='name'
                labal='Package Name'
                errorText='Wrong Title'
                initialValue={''}
                initialValid={true}
                onInputChange={stateContext.dispatch}
                required
            />

            <Input
                id='amount'
                labal='Amount'
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
            <SingleSelectionDropdown
                queTitle={"Lavf=="}
                data={duration}
                // itemStyle={CStyles.singleSlectDropDown}
                _dropdownValue={''}
                set_dropdownValue={(item) => { }} />

        </View>
    )
}
export default ScreenA
const styles = StyleSheet.create({})