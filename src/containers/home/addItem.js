import { StyleSheet, Text, View, Keyboard } from 'react-native'
import React, { useReducer, useState, useContext, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { ColorThemeContext } from '../../context/theme_context';
import { Container, DatePicker, Header, Button } from 'components'
import InputScrollView from 'react-native-input-scroll-view';
import ScreenA from './ScreenA';
import firestore from '@react-native-firebase/firestore';
import ACTIONS from '../../store/actions';
import moment from 'moment';

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
        mobile_number_primary: '9021010551',
    },
    inputValidities: {
        name: false,
        address: false,
        start_date: false,
        mobile_number_primary: false,
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
        console.log('formState',formState)
        Keyboard.dismiss()
        let member_id;
        await firestore()
        .collection('Members')
        .add({
            name: formState.inputValues.name,
            address:formState.inputValues.address,
            mobile_number_primary:formState.inputValues.mobile_number_primary,
            is_package_selected: false,
        })
        .then(async(querySnapshot) => {
            const currentRef =await JSON.parse(JSON.stringify(querySnapshot._documentPath._parts));
            member_id=await currentRef[1]
        });
        navigation.navigate('SelectPackage', { member_id :member_id})
        //  
        // await dispatch(ACTIONS.get_members_list())
        // navigation.goBack()
        // return
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
                <View style={{ flex: 1, margin: 12 }}>
                    <InputScrollView>
        
                        <ScreenA />

                    </InputScrollView>
                </View>

                <View style={{ width: '100%', flexDirection: 'row',justifyContent:'center',alignItems:'center' }}>
                   
                        <Button
                            onPress={onSubmit}
                            label={'SAVE & CONTINUE'}
                            textColor={Colors.COLOR_WHITE}
                            backgroundColor={Colors.COLOR_PINK}
                            borderColor={Colors.COLOR_INACTIVE}
                            borderWidth={0} />
                    
                </View>
            </Container>
        </StateContext.Provider>
    )
}

export default AddItem

const styles = StyleSheet.create({})