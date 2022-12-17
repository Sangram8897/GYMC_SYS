import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import Moment from 'moment';
import IsEmpty from '../utils/IsEmpty';

export default function BarChart({
  graphdata, max = 4,
  recomended = 2,
  isPersentage = false,
  numColumns,
  graphHeight = 90,
  titleText,
  maerginBetweenBars = '20%'
}) {

  const manageColor = (count) => {
    return '#35B3FF'
    if (count < 30) return 'red'
    else if (count < 60) return 'orange'
    else return 'green'
  }

  return (
    <View style={[styles.container, { minHeight: (graphHeight + 40) }]}>
      <View style={{
        position: 'absolute', bottom: 20,
        left: 0, right: 0, height: graphHeight * (recomended / max),
        backgroundColor: '#35B3FF1A'
      }} />
      <FlatList
        numColumns={numColumns}
        data={graphdata}
        style={{ flex: 1 }}
        renderItem={({ item }) => (
          <View style={[styles.item, { height: graphHeight + 40 }]}>
            <View style={{ height: 20, justifyContent: 'flex-end' }}>
              <Text style={[styles.valueText, { color: item.displayvalue == 0 ? '#CCCCCC' : '#35B3FF' }]}>{item.displayvalue}{isPersentage == true && '%'}</Text>
            </View>

            <View style={{ height: graphHeight * (item.value / max), borderRadius: 5, marginHorizontal: maerginBetweenBars, overflow: 'hidden', backgroundColor: manageColor(item.value) }}>

              {(!IsEmpty(item.helthyValue) && !IsEmpty(item.unhelthyValue)) &&
                <View style={{ flex: 1 }}>
                  <View style={{ flex: parseInt(item.unhelthyValue), backgroundColor: '#35B3FF99', overflow: 'hidden' }}></View>
                  <View style={{ flex: parseInt(item.helthyValue), backgroundColor: '#35B3FF' }}></View>
                </View>
              }

            </View>

            <View style={{ height: 20, justifyContent: 'flex-end' }}>
              <Text style={styles.dayText}>
                {item?.[titleText]}
              </Text>
            </View>

          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  item: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  dayText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 10,
    color: '#222222',
    textAlign: 'center'
  },
  valueText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 11,
    color: '#35B3FF',
    textAlign: 'center'
  },
});