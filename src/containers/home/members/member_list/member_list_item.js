import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, Animated, Button, Image, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';


import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { FloatingActionButton } from 'components'
import moment from 'moment';
import { Container, DatePicker, Header } from 'components'
import { ColorThemeContext } from '../../../../context/theme_context';
import ACTIONS from '../../../../store/actions';
import IsEmpty from '../../../../utils/IsEmpty';

const MemberListItem = ({ item, title, mobile_number, deleteItem, onItemPress }) => {
  const theme = useContext(ColorThemeContext)
  const [diff_in_dates, set_diff_in_dates] = React.useState({
    ends_on: '',
    days_remain: ''
  });

  const calculateDates = async (start_date, end_date) => {
    let result = -await moment(start_date).diff(end_date, 'days')
    console.log('cal_date diff', result)
    return getFormatedStringFromDays(result + 1)
  }

  function getFormatedStringFromDays(numberOfDays) {
    let negative=false;
    if (numberOfDays<0){
      negative=true;
      numberOfDays=-(numberOfDays)
    }
      let years = Math.floor(numberOfDays / 365);
      let months = Math.floor(numberOfDays % 365 / 30);
      let days = Math.floor(numberOfDays % 365 % 30);
  
      let years_ = (!IsEmpty(years) && years > 0) ? `${years}Y ` : '';
      let months_ = (!IsEmpty(months) && months > 0) ? `${months}M ` : '';
      let days_ = (!IsEmpty(days) && days > 0) ? `${days} Days` : '';
  
      let newDatesString = years_ + months_ + days_
     
      return {days_remain:newDatesString,overdue:negative};
    
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
    console.log('cal_date diff', diff)
    set_diff_in_dates({
      ends_on: next_date,
      ...diff,
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
          source={require('../../../../assets/images/image2.jpg')}
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      flex: 1,
      paddingVertical: 3, paddingHorizontal: 10, borderRadius: 6
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
export default MemberListItem;