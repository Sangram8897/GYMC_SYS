import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from '../../containers/home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Account from '../../containers/account';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ColorThemeProvider, { ColorThemeContext } from '../../context/theme_context';
import Dashboard from '../../containers/dashboard';
import Notifications from '../../containers/notifications';
import AddItem from '../../containers/home/addItem';
import { TouchableOpacity, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import Title from '../../components/Title';

{/* <IonIcon name="C" size={16} color="blue"></IonIcon> */ }
const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity onPress={onPress}
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'red' }}>
      {children}
    </View>

  </TouchableOpacity>
)

function TabBar() {
  const theme = useContext(ColorThemeContext)

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'boat'
              : 'boat';
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'layers' : 'layers';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications-sharp' : 'notifications-sharp';
          }
          else if (route.name === 'Account') {
            iconName = focused ? 'person-circle' : 'person-circle';
            return <Ionicons name={iconName} size={29} color={color} />;
          }
          else if (route.name === 'AddItem') {
            iconName = focused ? 'add-outline' : 'add';
            return <Ionicons name={iconName} size={34} color={color} />;
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        // tabBarShowLabel: false,
        tabBarStyle: {
          // height:70,
          paddingBottom: 4,
          backgroundColor: theme.Colors.COLOR_CARD,//color you want to change
        },
        tabBarLabelStyle: {
          fontFamily: 'Montserrat-Medium'
        },

        headerTitleStyle: {
          // color: '#61DAFB',
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: theme.Colors.COLOR_CARD,
        },

        // screenOptions: { headerMode: 'none' },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard}
        options={{
          title: 'GYMC',
          headerShown: false,
          headerTitleStyle: {
            color: '#00E3BA',
            fontFamily: 'Montserrat-ExtraBold',
            fontSize: 22,
          },
          headerStyle: {
            backgroundColor: theme.Colors.COLOR_CARD,
          },
        }} />

      <Tab.Screen name="Home" component={Homescreen}
        options={{
          //  headerTitle: (props) => <Title  /> ,
          title: 'Members',

          //headerShown: true,

        }} />

      {/* <Tab.Screen name="AddItem" component={ModalScreen}

        options={{
          tabBarButton:(props)=>(
            <CustomTabBarButton {...props}/>
          ),
          title: 'Dashboard',
          headerShown: false,
          headerTitleStyle: {
            color: theme.Colors.COLOR_FONT,
            fontFamily: 'Montserrat-Medium'
          },
          headerStyle: {
            backgroundColor: theme.Colors.COLOR_CARD,
          },
        }} /> */}
      <Tab.Screen name="Notifications" component={Notifications}
        options={{
          title: 'Notify',

          // headerShown: false,
          // headerTitleStyle: {
          //   color: theme.Colors.COLOR_FONT,
          //   fontFamily: 'Montserrat-Medium'
          // },
          // headerStyle: {
          //   backgroundColor: theme.Colors.COLOR_CARD,
          // },
        }} />
      <Tab.Screen name="Account" component={Account}
        options={{
          title: 'Account',


        }} />

    </Tab.Navigator>

  );
}

export default TabBar;