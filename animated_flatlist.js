import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, Animated, Button, Image, View, FlatList, StyleSheet, Text, StatusBar,Platform } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { FloatingActionButton } from 'components'
import { Container, DatePicker, Header } from 'components'
import { ColorThemeContext } from '../../../../context/theme_context';
import ACTIONS from '../../../../store/actions';
import IsEmpty from '../../../../utils/IsEmpty';
import MemberListItem from './member_list_item';
import Header1 from '../../../../components/Header/AnimatedHeader';



export const HEADER_HEIGHT = Platform.OS == 'ios' ? 50 : 30 + StatusBar.currentHeight;
const MemberList = ({ navigation }) => {

    const theme = useContext(ColorThemeContext)
    const dispatch = useDispatch();
    const members_list = useSelector(state => state.MembersListReducer.members_list);
    const [selected_filter_index, set_selected_filter_index] = React.useState(0);
    const { Colors, ToggleTheme } = useContext(ColorThemeContext);

    const scrollY = new Animated.Value(0);
    const diffClampScrollY = new Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
    const headerHeight = diffClampScrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [0, -HEADER_HEIGHT],
        extrapolate: 'clamp',
    });

    const renderItem = ({ item }) => (
        <MemberListItem item={item}
            deleteItem={deleteItem} title={item.title}
            mobile_number={item.mobile_number_primary}
            onItemPress={() => onItemPress(item)}
        />
    );

    const getData = async () => {
        dispatch(ACTIONS.get_members_sortBy_active())
    }

    const deleteItem = (item) => {
        firestore()
            .collection('Users')
            .doc(item.id)
            .delete()
            .then(() => {
                console.log('User deleted!');
            });
    }

    useEffect(() => {
        getData()

    }, [selected_filter_index])

    const onItemPress = (item) => {
        navigation.navigate('SelectPackage', { selected_member: item })
    }

    return (
        <View style={[styles.container, { backgroundColor: Colors.COLOR_BACKGROUND }]}>

            <Animated.View
                style={[styles.header, { transform: [{ translateY: headerHeight }], }]}>
                <Header1
                     activeColor={'#61DAFB'}
                     inActiveColor={'#6C6C6C'}
                     backgroundColor={'#FFF'}
                    showBackButton={false}
                    onBackButtonPress={() => navigation.goBack()}
                    showPlusButton={false}
                    onPlusButtonPress={() => { }}
                />
            </Animated.View>
            {/* <ListFilter onSelect={(index) => set_selected_filter_index(index)} /> */}
            <FlatList
            style={{ flex: 1, marginHorizontal: 5, marginTop: 5, paddingTop: HEADER_HEIGHT, zIndex: 0, backgroundColor: '$FFFFFF' }}
                bounces={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { y: scrollY, }, } },
                ], {
                    useNativeDriver: false,
                })}
                data={members_list}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
            <FloatingActionButton
                buttonClor={Colors.COLOR_ACTIVE_RED}
                onPress={() => navigation.navigate('AddItem')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_HEIGHT,
        zIndex: 1000,
        elevation: 1000,
    },
    item: {
        flex: 1,
        paddingVertical: 150, paddingHorizontal: 10, borderRadius: 6
    },
    title: {
        fontSize: 16, fontFamily: 'Montserrat-Medium'
    },
    sub_title: {
        fontSize: 13, fontFamily: 'Montserrat-Regular'
    },
    count: {
        fontSize: 14, fontWeight: '400', fontFamily: 'Montserrat-Regular'
    },
    filter_text: {
        fontSize: 13, fontFamily: 'Montserrat-Medium', marginHorizontal: 4, padding: 4, borderWidth: 1, borderColor: 'skyblue', borderRadius: 5
    },
});

export default MemberList;






