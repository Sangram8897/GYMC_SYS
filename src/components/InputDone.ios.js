import React from 'react';
import { InputAccessoryView, Keyboard, View, Button } from 'react-native';
import { Container, Input, Header } from 'components'


const InputDone = () => {
    return (
        <InputAccessoryView nativeID={'uniqueID'} >
            <View style={{ width: '100%', alignItems: 'flex-end', backgroundColor: '#FFFFFF' }}>

                {
                    //     <View style={{ width: '100%', flexDirection: 'row' }}>
                    //     <View style={{ flex: 1 }}>
                    //         <Button
                    //             onPress={() => {
                    //                 Keyboard.dismiss()
                    //                 // onSubmit()
                    //             }}
                    //             label={1 == 3 ? 'UPDATE' : 'DISCARD'}
                    //             backgroundColor={'#FF0B46'}        
                    //             borderColor={Colors.COLOR_INACTIVE}
                    //             borderWidth={0} />
                    //     </View>
                    //     <View style={{ flex: 1 }}>
                    //         <Button
                    //             onPress={() => {
                    //                 Keyboard.dismiss()
                    //                 // onSubmit()
                    //             }}
                    //             label={1 == 3 ? 'UPDATE' : 'SAVE'}
                    //             backgroundColor={'#3360A0'}
                    //             borderColor={Colors.COLOR_INACTIVE}
                    //             borderWidth={0} />
                    //     </View>
                    // </View>
                }


                <Button
                    onPress={() => {
                        Keyboard.dismiss();
                    }}
                    title="Done"
                />

            </View>
        </InputAccessoryView>
    )
}

export default InputDone
