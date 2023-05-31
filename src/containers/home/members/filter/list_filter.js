import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, Animated, Button, Image, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';


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
  export default ListFilter;