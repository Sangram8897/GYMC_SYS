import {SafeAreaView, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { ColorThemeContext } from '../../context/theme_context'
import { useDispatch, useSelector } from 'react-redux'
import FloatingActionButton from '../../components/FloatingActionButton'
import data from '../test_data/list'

const Item = ({item,mobile_number,title,address}) => {
  const theme = useContext(ColorThemeContext)
  const addItem = () => {
    firestore()
      .collection('Users')
      .add(item)
      .then(() => {
        console.log('User added!');
      });
  }
  return (
    <View style={{ margin: 10 }}>
      <TouchableOpacity>
        <View style={{padding:20, backgroundColor: theme.Colors.COLOR_CARD}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{item.name}</Text>
            <Text>34 Left</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Mob:{mobile_number}</Text>
            <Text>Addre : {`Pimpali Chiplun`}</Text>
          </View>
        </View>

      </TouchableOpacity>

    </View>

  )
}


const people = ({navigation}) => {
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
        onPress={() => navigation.navigate('AddPeople')} />
    </SafeAreaView>
  );
}


export default people

const styles = StyleSheet.create({})