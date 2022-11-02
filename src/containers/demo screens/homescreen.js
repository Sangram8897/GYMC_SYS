import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, Button, Image, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { ColorThemeContext } from '../../context/theme_context';
import data from '../test_data/list';
import Themes from "../../style/AppThemeColors";
import firestore from '@react-native-firebase/firestore';
import ACTIONS from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { FloatingActionButton } from 'components'

const Item = ({ item, title, mobile_number, deleteItem }) => {
  const theme = useContext(ColorThemeContext)

  const addItem = () => {
    firestore()
      .collection('Users')
      .add(item)
      .then(() => {
        console.log('User added!');
      });
  }



  return (<TouchableOpacity style={[styles.item]}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ height: 61, width: 61, borderRadius: 30, overflow: 'hidden', zIndex: 999, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.Colors.COLOR_BACKGROUND }}>
        <Image
          style={{ height: 46, width: 46, borderRadius: 30, overflow: 'hidden', zIndex: 999 }}
          source={require('../../assets/images/image2.jpg')}
        />
      </View>

      <View style={{ flex: 1, marginLeft: -30, paddingVertical: 20, paddingLeft: 33, paddingRight: 10, borderRadius: 6, backgroundColor: theme.Colors.COLOR_CARD }}>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
          <Text style={[styles.title, { color: theme.Colors.COLOR_FONT }]}>{item.name}</Text>
          <Text style={[styles.count, { color: theme.Colors.COLOR_FONT }]}>34 Left</Text>
        </View>

        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
          <Text style={[styles.sub_title, { color: theme.Colors.COLOR_FONT }]}>Mob : {mobile_number}</Text>
          <Text style={[styles.sub_title, { color: theme.Colors.COLOR_FONT }]}>Addre : {`Pimpali Chiplun`}</Text>
        </View>
      </View>

    </View>
  </TouchableOpacity>
  )
}


const Homescreen = ({ navigation }) => {

  const theme = useContext(ColorThemeContext)
  const dispatch = useDispatch();
  const members_list = useSelector(state => state.MembersListReducer.members_list);

  const renderItem = ({ item }) => (
    <Item item={item} deleteItem={deleteItem} title={item.title} mobile_number={item.mobile_number_primary} />
  );

  const getData = async () => {
    //get_members_list
    dispatch(ACTIONS.get_members_list())
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
  }, [])

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.Colors.COLOR_BACKGROUND }]}>
      <FlatList
        data={members_list}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <FloatingActionButton
        buttonClor={theme.Colors.COLOR_ACTIVE_RED}
        onPress={() => navigation.navigate('AddItem2')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    // marginLeft:-46,
    paddingVertical: 5, paddingHorizontal: 10, borderRadius: 6
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
});

export default Homescreen;