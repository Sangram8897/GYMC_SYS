import React, { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Button } from 'react-native';
import IsEmpty from '../../../utils/IsEmpty';
import RF from '../../../themes/ResponsiveFontSize/RF';

const _textStyle = {
  color: '#fff',
  fontSize: RF(5.3),
  fontFamily: 'Montserrat-Bold',
};

const TimePicker = ({
  selectedDate = new Date(),
  format = 'HH-MM',
  onDateChange,
  textStyle = _textStyle,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [current_date, set_current_date] = useState(new Date(selectedDate));
  const [date_main, set_date_main] = useState(new Date(selectedDate));
  const [show, set_show] = useState(false);

  const onChange = (event, selectedDate) => {
    set_show(false);

    if (Platform.OS === 'android') {
      set_date_main(selectedDate);
      return;
    }

    const currentDate = selectedDate || current_date;
    set_current_date(currentDate);
  };

  useEffect(() => {
    if (selectedDate !== current_date) {
      onDateChange(date_main);
    }
  }, [date_main]);

  useEffect(() => {
    if (!IsEmpty(selectedDate)) {
      set_current_date(selectedDate);
    }
  }, [selectedDate]);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={styles.centeredView2}>
          <View style={styles.modalView}>
            <ScrollView style={{ width: '100%' }}>
              <DateTimePicker
                testID="dateTimePicker"
                value={current_date}
                onChange={onChange}
                style={{ flex: 1, width: '100%', marginTop: 20 }}
                display='spinner'
                mode={'time'}
                dateFormat={format}
                placeholderText="select date"
              />

              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <Button
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  title={'Cancel'}
                />
                <Button
                  onPress={() => {
                    set_date_main(current_date);
                    setModalVisible(!modalVisible);
                  }}
                  title={'Confirm'}
                />
              </View>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      <Text
        onPress={() => {
          if (Platform.OS === 'android') {
            set_show(true);
            return;
          }
          setModalVisible(true);
        }}
        style={textStyle}>
        {moment(selectedDate)
          .format('hh:mm A')
          .toUpperCase()}
      </Text>

      {show && (
        <DateTimePicker
          value={selectedDate}
          is24Hour={false}
          onChange={onChange}
          placeholderText="select date"
          style={{ flex: 1, paddingTop: 10, width: 350 }}
          dateFormat={format}
          mode={'time'}
          display={'spinner'}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({

  centeredView2: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  modalView: {
    backgroundColor: 'red',
    width: '100%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 35,
    paddingBottom: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Montserrat-Bold',
  },
});

export default TimePicker;
