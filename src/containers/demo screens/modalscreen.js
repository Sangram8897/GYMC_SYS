import React from 'react';
import { SafeAreaView,TouchableOpacity,Button, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ title,onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const ModalScreen = ({navigation}) => {

  const renderItem = ({ item }) => (
    <Item title={item.title} 
    onPress={() => navigation.goBack()}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
      style={{flex:1}}
      horizontal={true}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item,index) => index}
      />
        <Button
        onPress={() => navigation.goBack()}
        title="close Modal"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    
  },
  title: {
    fontSize: 32,
  },
});

export default ModalScreen;