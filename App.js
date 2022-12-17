import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ModalScreen from './src/containers/demo screens/modalscreen';
import Homescreen from './src/containers/demo screens/homescreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './src/containers/profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ColorThemeProvider, { ColorThemeContext } from './src/context/theme_context';
import { Provider } from 'react-redux';
import AddItem from './src/containers/demo screens/addItem';
import Package_List from './src/containers/main/package/package_list';
{/* <IonIcon name="C" size={16} color="blue"></IonIcon> */ }
const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const theme = useContext(ColorThemeContext)

  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'boat'
                : 'boat-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person-circle-outline' : 'person-circle';
            }
            else if (route.name === 'AddItem') {
              iconName = focused ? 'add-outline' : 'add';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          showLabel: false,
          tabBarStyle: {
            backgroundColor: theme.Colors.COLOR_CARD,//color you want to change
          }
        })}
      >
        <Tab.Screen name="Home" component={Homescreen}
          options={{
            title: 'Dashboard',
            headerShown:false,
            headerTitleStyle: {
              color: theme.Colors.COLOR_FONT,
              fontFamily: 'Montserrat-Medium'
            },
            headerStyle: {
              backgroundColor: theme.Colors.COLOR_CARD,
            },
          }} />
        <Tab.Screen name="Profile" component={Profile}
          options={{
            title: 'Profile',
            headerTitleStyle: {
              color: theme.Colors.COLOR_FONT,
            },
            headerStyle: {
              backgroundColor: theme.Colors.COLOR_CARD,
            },
          }} />
        {/* <Tab.Screen name="AddItem" component={AddItem}
        
          options={{
            title: 'Dashboard',
            headerShown:false,
            headerTitleStyle: {
              color: theme.Colors.COLOR_FONT,
              fontFamily: 'Montserrat-Medium'
            },
            headerStyle: {
              backgroundColor: theme.Colors.COLOR_CARD,
            },
          }} /> */}
      </Tab.Navigator>
   
  );
}

// function App() {
//   return (
//     <NavigationContainer>
//       <RootStack.Navigator>
//         <RootStack.Group>
//           <RootStack.Screen name="Home" component={Homescreen} />
//         </RootStack.Group>
//         <RootStack.Group screenOptions={{ presentation: 'modal' }}>
//           <RootStack.Screen name="MyModal" component={ModalScreen} />
//         </RootStack.Group>
//       </RootStack.Navigator>
//     </NavigationContainer>
//   );
// }

export default App;