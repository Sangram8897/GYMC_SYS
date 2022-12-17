import { View, StyleSheet, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import IsEmpty from '../../utils/IsEmpty';

const Dropdown = React.forwardRef((props, ref) => {
    const {
        DATA,
        modalHeight = 'auto',
        showImage = false,
        navigation,
        onPress,
        itemStyle,
        textStyle
    } = props;

    const modalizeRef = useRef(null);

    React.useImperativeHandle(ref, () => ({
        onClickModalize() {
            modalizeRef.current?.open();
        },
        onClickModalizeItem() {
            modalizeRef.current?.close();
        },
    }));



    const renderItem = ({ item }) => (
        <Item item={item} onPress={onPress} showImage={showImage} itemStyle={itemStyle} textStyle={textStyle} />
    );
    return (
        <Portal>
            <Modalize
                ref={modalizeRef}
                modalHeight={300}
                closeOnOverlayTap={true}
                handleStyle={{ display: 'none' }}>
                    
                <View style={styles.container}>
                    <View style={styles.strip} />
                    { <FlatList
                        scrollEnabled={false}
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />}
                </View>
            </Modalize>
        </Portal>
    );
});

export default Dropdown;

const Item = ({ item, onPress, showImage, itemStyle = {}, textStyle = {} }) => (
    <TouchableOpacity
        onPress={() => onPress(item)}
        style={[styles.item, itemStyle]}>

        {(showImage && !IsEmpty(item) && !IsEmpty(item.image)) &&
            <Image source={item.image} style={{ width: 60, resizeMode: 'contain', marginHorizontal: 10, tintColor: '#35B3FF' }}></Image>}

        <Text style={[styles.title, textStyle]}>{item.name}</Text>

    </TouchableOpacity>
);

const styles = StyleSheet.create({
    strip: {
        height: 5,
        backgroundColor: '#CCCCCC',
        width: '10%',
        alignSelf: 'center',
        borderRadius: 15,
        marginTop: 10
    },
    container: {
        flex: 1,
        width: '95%',
        alignSelf: 'center',
        paddingVertical: 1,
        backgroundColor: '#FFFFFF'
    },
    item: {
        width: '100%',
        flexDirection: 'row',
        height: 60,
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5'
    },
    title: {
        fontSize: 13,
        fontFamily: 'Montserrat-Bold',
        color: '#35B3FF'
    },
});