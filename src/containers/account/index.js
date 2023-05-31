import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Container, DatePicker, Header } from 'components'
import Header1 from '../../components/Header/AnimatedHeader';

const DATA = [
  {
    id: '1111',
    title: 'View profile',
    icon: 'person-outline',
    navigation: 'Profile'
  },
  {
    id: '1116',
    title: 'Graphs & Calculations',
    icon:'bar-chart-outline',
    navigation: 'Graphs'

  },
  {
    id: '1112',
    title: 'Saved Item',
  },
  {
    id: '1113',
    title: 'Settings',
    icon:'construct-outline',
  },

  {
    id: '1114',
    title: 'Change Password',
    icon:'refresh-circle-outline'
  },
  {
    id: '1115',
    title: 'Logout',
    icon:'log-out-outline'
  },
];

const Item = ({ item, onPress }) => (
  <TouchableOpacity
    onPress={item?.navigation ? () => onPress(item?.navigation) : null}
    style={styles.item}>
    {item?.icon ? <Icon name={item.icon} size={22} color="gray"></Icon>
      : <Icon name="nutrition-outline" size={25} color="gray"></Icon>}
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const Account = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <Item item={item} onPress={onPress} />
  );
  const onPress = (route) => {
    navigation.navigate(route)
  }
  return (
    <Container>
      <View style={{ padding: 8, flexDirection: 'row', }}>

        <View style={{ height: 70, width: 70, backgroundColor: '#00E3BA', padding: 8, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
          <Text style={{ fontSize: 35, color: '#FFF' }}>S</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: '#E5E5E5', marginLeft: 8, paddingHorizontal: 12, justifyContent: 'center' }}>
          <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold', }}>SB fitness Hub</Text>
          <Text style={{ fontSize: 18, fontFamily: 'Montserrat-Medium', }}>Active</Text>
        </View>
      </View>
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
    backgroundColor: '#FFFFFF'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 3,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: '#222',
    marginLeft: 12
  },
});

export default Account;
