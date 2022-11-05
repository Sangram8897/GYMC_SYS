import { StyleSheet, Text, View, Keyboard } from 'react-native'
import React, { useReducer, useState, useContext, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { ColorThemeContext } from '../../context/theme_context';
import { Container, DatePicker, Header, Button } from 'components'
import InputScrollView from 'react-native-input-scroll-view';
import ScreenA from '../demo screens/ScreenA';

import firestore from '@react-native-firebase/firestore';
import ACTIONS from '../../store/actions';
import AddPeople from './addPeople';
import { Screen } from 'react-native-screens';
import ScreenB from './ScreenB';
import FloatingActionButton from '../../components/FloatingActionButton';

export const StateContext2 = React.createContext();
const FORM_INPUT_UPDATE2 = 'FORM_INPUT_UPDATE2';

const formReducer2 = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE2) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value,
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid,
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities,
        }
    }
    return state;
}
const inintialState = {
    inputValues: {
        name: 'Sundar kumar',
        start_date: '',
        address: '',
        amount: 3000,
        category: 'soft',
        type: 'NORMAL',
        dependant: true,
        isTaken: null,
        source: 'direct',
        mobile_number_primary: '9021010551',
    },
    inputValidities: {
        name: false,
        address: false,
        start_date: false,
        amount: false,
        category: false,
        type: false,
        dependant: false,
        isTaken: false,
        source: false,
        mobile_number_primary: false,

        title: false,
        short_desc: false,
        description: false
    },
    formIsValid: false
}

const AddItem2 = ({ navigation }) => {
    const dispatch = useDispatch();
    const [formState2, dispatchFormState2] = useReducer(formReducer2, inintialState);
    const { Colors, ToggleTheme } = useContext(ColorThemeContext);


    const inputChangeHandler2 = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState2({
                type: FORM_INPUT_UPDATE2,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            })
        }, [dispatchFormState2]);

    const onSubmit = async () => {
        Keyboard.dismiss()
        await firestore()
            .collection('Users')
            .add({
                name: formState2.inputValues.name,
                start_date: formState2.inputValues.start_date,
                amount: formState2.inputValues.amount,
                address: formState2.inputValues.address,
                category: 'soft',
                type: 'NORMAL',
                maxCapacity: 50000,
                minCapacity: 1000,
                dependant: true,
                isTaken: null,
                source: 'direct',
                mobile_number_primary: formState2.inputValues.mobile_number_primary,
            })
            .then(() => {
                console.log('User added!');
            });
        await dispatch(ACTIONS.get_members_list())
        navigation.goBack()
        return


    }

    return (
        <StateContext2.Provider value={{ state: formState2, dispatch: inputChangeHandler2 }}>
            <Container>
                <Header
                    showBackButton={true}
                    onBackButtonPress={() => navigation.goBack()}
                    showPlusButton={true}
                    onPlusButtonPress={() => ToggleTheme()}
                />
                <View style={{ flex: 1, marginTop: 20 }}>
                    <InputScrollView>

                        <ScreenB />

                    </InputScrollView>
                </View>
       

                <View style={{ width: '100%', flexDirection: 'row' }}>
                   
                    <View style={{ flex: 1 }}>
                        <Button
                            onPress={() => navigation.navigate('AddItem2')}

                            label={'RESET'}
                            textColor={Colors.COLOR_PINK}
                            backgroundColor={Colors.COLOR_BLACK}
                            // borderColor={Colors.COLOR_INACTIVE}
                            borderWidth={0} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button
                            onPress={onSubmit}
                            label={'SAVE'}
                            textColor={Colors.COLOR_WHITE}
                            backgroundColor={Colors.COLOR_PINK}
                            borderColor={Colors.COLOR_INACTIVE}
                            borderWidth={0} />
                    </View>
                </View>
            </Container>
        </StateContext2.Provider>
    )
}

export default AddItem2

const styles = StyleSheet.create({})