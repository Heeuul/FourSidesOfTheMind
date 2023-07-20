import { View, Text } from "react-native";
import React from "react";
import { FlatList } from "react-native";

const egoLabels = ["Hero", "Parent", "Child", "Inferior"];
const uncLabels = ["Nemesis", "Critic", "Trickster", "Demon"];
const subLabels = ["Hero", "Parent", "Child", "Inferior"];
const supLabels = ["Nemesis", "Critic", "Trickster", "Demon"];

export default function Side({ type, side }) {
  //prettier-ignore
  function GetSideData() {
    switch (side) {
      case "Ego"        : return egoLabels;
      case "Subconcious": return subLabels;
      case "Unconcious" : return uncLabels;
      case "Superego"   : return supLabels;
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Letters */}
      <Text style={{ textAlign: "center", fontSize: 50 }}>{type}</Text>

      <FlatList
        data={GetSideData()}
        renderItem={({ item, index }) => (
          <Text>
            <Text>{item + ":"}</Text>
            <Text>{type[index]}</Text>
          </Text>
        )}
        scrollEnabled={false}
      />
    </View>
  );
}
