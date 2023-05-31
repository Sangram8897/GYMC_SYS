import React from 'react';
import { SafeAreaView, Image, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { Container, DatePicker, Header } from 'components'
import Header1 from '../../components/Header/AnimatedHeader';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Goutami Patil',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Disha Patni',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Mrunal shetty',
  },
  {
    id: '3ac698afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Disha Patni',
  },
  {
    id: '586949a0f-3da1-471f-bd96-145571e29d72',
    title: 'Mrunal shetty',
  },
];
const d_text = `Watch Salman Khan & Karisma Kapoor in the song 'Biwi No. 1' from the movie 'Biwi No. 1'.Sung by Abhijeet & Poornima, Composed by Anu Malik.`
const Item = ({ title }) => (
  <View style={styles.item}>
    <Image
      style={{ height: 40, width: 40, borderRadius: 30 }}
      source={require('../../assets/images/image2.jpg')}
    />
    <View style={{ flex: 1, paddingHorizontal: 8 }}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.sub_title}>{d_text}</Text>
    </View>
  </View>
);

const Notifications = () => {
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <Container>
      {/* <Header1
         activeColor={'#61DAFB'}
         inActiveColor={'#6C6C6C'}
         backgroundColor={'#FFF'}
        showBackButton={false}
        onBackButtonPress={() => navigation.goBack()}
        showPlusButton={false}
        onPlusButtonPress={() => { }}
      /> */}
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 12,
    marginVertical: 2,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#222',
  },
  sub_title: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: 'gray',
  },
});

export default Notifications;
