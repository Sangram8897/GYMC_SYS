import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import App from "../../../App";
import AddItem from "../../containers/demo screens/addItem";

const Stack = createNativeStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="AddItem2" component={AddItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}