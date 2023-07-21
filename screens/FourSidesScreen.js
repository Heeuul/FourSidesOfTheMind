import { View } from "react-native";
import React from "react";

import Side from "../components/Side";

export default function FourSidesScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Side key={"Ego"} side={"Ego"} nav={navigation} />
        <Side key={"Subconcious"} side={"Subconcious"} nav={navigation} />
      </View>

      <View style={{ flex: 1, flexDirection: "row" }}>
        <Side key={"Unconcious"} side={"Unconcious"} nav={navigation} />
        <Side key={"Superego"} side={"Superego"} nav={navigation} />
      </View>
    </View>
  );
}
