import { View, Button } from "react-native";
import React from "react";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Go to Main"
        onPress={() => navigation.navigate("4Sides")}
      />
    </View>
  );
}
