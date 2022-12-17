import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, Button, Image, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { ColorThemeContext } from '../../context/theme_context';
import data from '../test_data/list';
import Themes from "../../style/AppThemeColors";
import firestore from '@react-native-firebase/firestore';
import ACTIONS from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { FloatingActionButton } from 'components'
import moment from 'moment';
import IsEmpty from '../../utils/IsEmpty';
import { Container, DatePicker, Header } from 'components'

const Item = ({ item, title, mobile_number, deleteItem, onItemPress }) => {
  const theme = useContext(ColorThemeContext)
  const [diff_in_dates, set_diff_in_dates] = React.useState({
    ends_on: '',
    days_remain: ''
  });

  const calculateDates = async (start_date, end_date) => {
    let result = -await moment(start_date).diff(end_date, 'days')
    console.log('result', result)
    return getFormatedStringFromDays(result + 1)
  }

  function getFormatedStringFromDays(numberOfDays) {
    let years = Math.floor(numberOfDays / 365);
    let months = Math.floor(numberOfDays % 365 / 30);
    let days = Math.floor(numberOfDays % 365 % 30);

    let years_ = (!IsEmpty(years) && years>0) ? `${years}Y ` : '';
    let months_ = (!IsEmpty(months) && months>0) ? `${months}M ` : '';
    let days_ = (!IsEmpty(days) && days>0) ? `${days} Days` : '';

    let newDatesString = years_ + months_ + days_

    return newDatesString;
  }

  const calculateNextDate = async (start_date, days) => {
    return await moment(start_date).add(days, "days").format("YYYY-MM-DD");
  }

  const calculateDiff = async () => {

    console.log('calculateDiff durationInDays', item.start_date, item.selected_package.package_duration_rates.durationInDays)
    let start_date = await moment(item.start_date).format('YYYY-MM-DD');
    console.log('calculateDiff start_date', start_date)
    let current_date = await moment(new Date()).format('YYYY-MM-DD');
    let next_date = await calculateNextDate(start_date, item.selected_package.package_duration_rates.durationInDays - 1)
    console.log('calculateDiff next_date', next_date)
    const diff = await calculateDates(current_date, next_date)
    console.log('calculateDiff diff', diff)
    set_diff_in_dates({
      ends_on: next_date,
      days_remain: diff
    })
  }

  useEffect(() => {
    if (item.is_package_selected == true) calculateDiff()
  }, [])

  return (<TouchableOpacity
    onPress={onItemPress}
    style={[styles.item]}>
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
          <Text style={[styles.count, { color: theme.Colors.COLOR_FONT }]}>{diff_in_dates.days_remain} Left</Text>
        </View>

        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
          <Text style={[styles.sub_title, { color: theme.Colors.COLOR_FONT }]}>{item?.selected_package?.package_name}</Text>
          <Text style={[styles.sub_title, { color: theme.Colors.COLOR_FONT }]}>Ends On : {diff_in_dates.ends_on}</Text>
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
  const [selected_filter_index, set_selected_filter_index] = React.useState(0);
  const { Colors, ToggleTheme } = useContext(ColorThemeContext);

  const renderItem = ({ item }) => (
    <Item item={item}
      deleteItem={deleteItem} title={item.title}
      mobile_number={item.mobile_number_primary}
      onItemPress={() => onItemPress(item)}
    />
  );

  const getData = async () => {
   
    // if (selected_filter_index == 0) {
    //   dispatch(ACTIONS.get_members_list())
    // } if (selected_filter_index == 1) {
    //   dispatch(ACTIONS.get_members_sortBy_active())
    // }

    dispatch(ACTIONS.get_members_sortBy_active())
    // let my=await 
    // console.log('munneshwar kuku',my)
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
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.COLOR_BACKGROUND }]}>
      <Header
                    showBackButton={false}
                    onBackButtonPress={() => navigation.goBack()}
                    showPlusButton={true}
                    onPlusButtonPress={() => ToggleTheme()}
                />
      <ListFilter onSelect={(index) => set_selected_filter_index(index)} />
      <FlatList
        data={members_list}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <FloatingActionButton
        buttonClor={Colors.COLOR_ACTIVE_RED}
        onPress={() => navigation.navigate('AddItem')} />
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
  filter_text: {
    fontSize: 13, fontFamily: 'Montserrat-Medium', marginHorizontal: 4, padding: 4, borderWidth: 1, borderColor: 'skyblue', borderRadius: 5
  },
});

export default Homescreen;

const _filter_data = [
  { id: 1, name: 'All', selected: true },
  { id: 2, name: 'active', selected: false },
  { id: 3, name: 'Dates overs', selected: false },
  { id: 4, name: 'In active', selected: false }
]

const ListFilter = ({ onSelect }) => {
  const [filter_data, set_filter_data] = React.useState(_filter_data);

  const onFilterSelected = (_index) => {
    const array = [...filter_data];
    array.map((item, placeindex) =>
      placeindex === _index
        ? item.selected = true
        : item.selected = false
    );
    set_filter_data(array)
    onSelect(_index)
    console.log(array)
  }

  const renderItem = ({ item, index }) => {
    return <TouchableOpacity key={item.id} onPress={() => onFilterSelected(index)}>
      <Text style={[styles.filter_text, { backgroundColor: item.selected ? 'orange' : 'yellow' }]}>{item.name}</Text>
    </TouchableOpacity>
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      <FlatList
        style={{ margin: 8 }}
        horizontal={true}
        data={filter_data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

