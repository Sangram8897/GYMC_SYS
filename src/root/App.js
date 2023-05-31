import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddItem from "../containers/home/addItem";
import AddPackage from "../containers/main/package/addPackage";
import { Host, Portal } from 'react-native-portalize';
import SelectPackage from "../containers/main/package/select_package";
import TabBar from "./navigation/TabBar";
import Profile from "../containers/account/profile";
import Graphs from "../containers/account/graphs";
import MemberInfo from "../containers/home/members/member_info";
import PhysicalInfo from "../containers/home/members/member_info/physical_info";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Host>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
           headerShown: false,
          headerTitleStyle: {
            color: '#61DAFB',
            fontFamily: 'Montserrat-ExtraBold',
            fontSize: 22,
          },
          headerStyle: {
           // backgroundColor: theme.Colors.COLOR_CARD,
          },
        }}>
          <Stack.Screen name="Home" component={TabBar} options={{ headerShown: false }} />
          <Stack.Screen name="AddItem" component={AddItem} />
          <Stack.Screen name="AddPackage"
            component={AddPackage}
          />
          <Stack.Screen name="SelectPackage" component={SelectPackage} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Graphs" component={Graphs} />
          <Stack.Screen
          options={{
            title: 'Physical Information',
            headerShown: true,
            headerTitleStyle: {
              // color: '#00E3BA',
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 18,
            },
          }}
          name="PhysicalInfo" component={PhysicalInfo} />
          <Stack.Screen options={{
              title: 'Member Information',
              headerShown: true,
              headerTitleStyle: {
                // color: '#00E3BA',
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 18,
              },
              // headerStyle: {
              //   backgroundColor: theme.Colors.COLOR_CARD,
              // },
            }} name="MemberInfo" component={MemberInfo} />
        </Stack.Navigator>
      </Host>
    </NavigationContainer>
  );
}