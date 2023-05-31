import React, { useContext } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { Container, DatePicker, Header } from 'components'
import { ColorThemeContext } from '../../context/theme_context';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Total Members',
    value: 200,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Overdue Members',
    value: 5,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Recently Added',
    value: 15,
  },
  {
    id: '588694a0f-3d0a1-471f-bd96-145571e29d72',
    title: 'Personal Trainings',
    value: 8,
  },
  {
    id: '588694a0f-39da1-471f-bd96-145571e29d72',
    title: 'Packages',
    value: 8,
  },
  {
    id: '588694a0f-39da1-471f-bd96-145571e29d72',
    title: 'Trainers',
    value: 4,
  },
];

const Item = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.value}>{item.value}</Text>
    <Text style={styles.title}>{item.title}</Text>
  </View>
);

const Dashboard = () => {

  const theme = useContext(ColorThemeContext)
  
  const renderItem = ({ item }) => (
    <Item item={item} />
  );

  return (
    <Container>
      <View style={{ flex: 1, backgroundColor: theme.Colors.COLOR_BACKGROUND }}>
   
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 35,
    margin: 5,
    borderRadius: 8,
    elevation: 4
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium'
  },
  value: {
    color: '#00E3BA',
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold'
  },
});

export default Dashboard;