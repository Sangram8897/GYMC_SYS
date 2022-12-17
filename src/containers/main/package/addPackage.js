import { StyleSheet, Text, View, Keyboard, FlatList, TextInput, ToastAndroid, Button as Button2 } from 'react-native'
import React, { useReducer, useState, useContext, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { ColorThemeContext } from '../../../context/theme_context';
import { Container, DatePicker, Header, Button, Input } from 'components'
import InputScrollView from 'react-native-input-scroll-view';
import ScreenA from './ScreenA';
import firestore from '@react-native-firebase/firestore';
import ACTIONS from 'store/actions';
import InputType2 from '../../../components/Input_type_2';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

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
        package_image_url:null
    },
    inputValidities: {
        name: false,
        package_image_url:false,
    },
    formIsValid: false
}

const DATA = [
    {
        id: '1',
        title: '1 Month',
        durationInDays: 30,
        value: ''
    },
    {
        id: '2',
        title: '3 Month',
        durationInDays: 90,
        value: ''
    },
    {
        id: '3',
        title: '6 Months',
        durationInDays: 180,
        value: ''
    },
    {
        id: '4',
        title: '1 year',
        durationInDays: 360,
        value: ''
    },
];

const AddPackage = ({ navigation }) => {
    const dispatch = useDispatch();
    const [durationAndRates, onChangeDurationAndRates] = React.useState(DATA);
    const [formState, dispatchFormState] = useReducer(formReducer, inintialState);
    const { Colors, ToggleTheme } = useContext(ColorThemeContext);


    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                input: inputIdentifier,
                isValid: inputValidity,
            })
        }, [dispatchFormState]);

    const onSubmit = async () => {
        console.log('formState',formState)
        Keyboard.dismiss()
        await firestore()
            .collection('Packages')
            .add({
                name: formState.inputValues.name,
                durationAndRates: durationAndRates,
                package_image_url: formState.inputValues.package_image_url
            })
            .then(() => {
                console.log('Package added!');
            });
        //   await dispatch(ACTIONS.get_members_list())
        navigation.goBack()
        return
    }
    const handleInputChange = (text, index) => {
        const array = [...durationAndRates];
        array.map((item, placeindex) =>
            placeindex === index
                ? item.value = text
                : null
        );
        onChangeDurationAndRates(array)
        console.log(array)
    }

    const openCamera = async () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(async response => {

            let path = await getPlatformPath(response).value;
            console.log(path);
            let fileName = await getFileName(response.fileName, path);
            uploadImageToStorage(path, fileName);
        });
    }

    const getPlatformPath = ({ path, uri }) => {
        return Platform.select({
            android: { "value": path },
            ios: { "value": uri }
        })
    }

    const getFileName = (name, path) => {
        if (name != null) { return name; }

        if (Platform.OS === "ios") {
            path = "~" + path.substring(path.indexOf("/Documents"));
        }
        return path.split("/").pop();
    }

    const uploadImageToStorage = async (path, name) => {
        try {
            let reference =await storage().ref(name);
            await reference.putFile(path);
            const download_url = await reference.getDownloadURL().catch((error) => { throw error });
            console.log('image', download_url)
            ToastAndroid.show("Image uploaded successfully ! with url", ToastAndroid.SHORT);
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: download_url,
                input:'package_image_url',
                isValid: true,
            })
        } catch (err) {
            console.log('mithun', err)
            ToastAndroid.show("Something went wrong !", ToastAndroid.SHORT);
        }
    }




    const renderItem = ({ item, index }) => (
        <View style={styles.item}>
            <Text style={[styles.title, { flex: 0.4, alignSelf: 'center', textAlign: 'center' }]}>{item.title}</Text>
            <View style={{ flex: 1 }}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleInputChange(text, index)}
                    value={item.value}
                    placeholder="Enter Duration Rate"
                    keyboardType="numeric"
                />
            </View>

        </View>
    );

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
                    <Button2 title="camera" onPress={openCamera}></Button2>
                    <Input
                        id='name'
                        labal='Package Name'
                        errorText='Wrong Title'
                        initialValue={formState.inputValues.name}
                        initialValid={true}
                        onInputChange={inputChangeHandler}
                        required
                    />
                    <FlatList
                        data={durationAndRates}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
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
                </View>
            </Container>
        </StateContext.Provider>
    )
}

export default AddPackage

const styles = StyleSheet.create({
    item: {
        padding: 8,
        marginVertical: 4,
        marginHorizontal: 8,
        flexDirection: 'row'
    },
    title: {
        fontSize: 16,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
})