import { View } from "react-native";
import React from "react";

import Side from "../components/Side";
import { TouchableOpacity } from "react-native";
// prettier-ignore
const types = [
    "ESTJ","ESTP","ENTJ","ENFJ",
    "ESFJ","ESFP","ENTP","ENFP",
    "ISTJ","ISTP","INTJ","INFJ",
    "ISFJ","ISFP","INTP","INFP",
  ];

export default function FourSidesScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <TouchableOpacity style={{ flex: 1, width: "100%", height: "100%" }}>
          <Side type={types[11]} side={"Ego"} />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, width: "100%", height: "100%" }}>
          <Side type={types[1]} side={"Subconcious"} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, flexDirection: "row" }}>
        <TouchableOpacity style={{ flex: 1, width: "100%", height: "100%" }}>
          <Side type={types[7]} side={"Unconcious"} />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, width: "100%", height: "100%" }}>
          <Side type={types[8]} side={"Superego"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
