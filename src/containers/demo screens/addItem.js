import { StyleSheet, Text, View, Keyboard } from 'react-native'
import React, { useReducer, useState, useContext, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { ColorThemeContext } from '../../context/theme_context';
import { Container, DatePicker, Header, Button } from 'components'
import InputScrollView from 'react-native-input-scroll-view';
import ScreenA from './ScreenA';
import firestore from '@react-native-firebase/firestore';
import ACTIONS from '../../store/actions';

export const StateContext = React.createContext();
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
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

const AddItem = ({ navigation }) => {
    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, inintialState);
    const { Colors, ToggleTheme } = useContext(ColorThemeContext);

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            })
        }, [dispatchFormState]);

    const onSubmit = async () => {
        Keyboard.dismiss()
        await firestore()
        .collection('Users')
        .add({
            name: formState.inputValues.name,
            start_date:formState.inputValues.start_date,
            amount:formState.inputValues.amount,
            address:formState.inputValues.address,
            category:'soft',
            type:'NORMAL',
            maxCapacity:50000,
            minCapacity:1000,
            dependant:true,
            isTaken:null,
            source:'direct',
            mobile_number_primary:formState.inputValues.mobile_number_primary,
        })
        .then(() => {
          console.log('User added!');
        });
        await dispatch(ACTIONS.get_members_list())
        navigation.goBack()
        return
    }

    return (
        <StateContext.Provider value={{ state: formState, dispatch: inputChangeHandler }}>
            <Container>
                <Header
                    showBackButton={true}
                    onBackButtonPress={() => navigation.goBack()}
                    showPlusButton={true}
                    onPlusButtonPress={() => ToggleTheme()}
                />
                <View style={{ flex: 1, marginTop: 20 }}>
                    <InputScrollView>
        
                        <ScreenA />

                    </InputScrollView>
                </View>

                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Button
                            onPress={onSubmit}
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
        </StateContext.Provider>
    )
}

export default AddItem

const styles = StyleSheet.create({})