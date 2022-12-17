import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import App from "../../../App";
import AddItem from "../../containers/demo screens/addItem";
import AddPackage from "../../containers/main/package/addPackage";
import { Host, Portal } from 'react-native-portalize';
import SelectPackage from "../../containers/main/package/select_package";
const Stack = createNativeStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Host>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{ headerShown: false }} component={App} />
          <Stack.Screen name="AddItem" options={{ headerShown: false }} component={AddItem} />
          <Stack.Screen name="AddPackage"
            component={AddPackage}
            options={{ headerShown: false }} />
             <Stack.Screen name="SelectPackage" component={SelectPackage} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </Host>
    </NavigationContainer>
  );
}