import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import SingleSideScreen from "../screens/SingleSideScreen";
import FourSidesScreen from "../screens/FourSidesScreen";
import HomeScreen from "../screens/HomeScreen";
const Stack = createNativeStackNavigator();

export default function Nav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="4Sides" component={FourSidesScreen} />
      <Stack.Screen name="1Side" component={SingleSideScreen} />
    </Stack.Navigator>
  );
}
