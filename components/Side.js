import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React from "react";

import useType from "../hooks/useType";

export default function Side({ nav, side }) {
  const {
    GetType,
    GetFunctionStack,
    GetFunctionName,
    FlipEnergy,
    FlipPerceive,
    FlipJudge,
    FlipPreference,
  } = useType();

  const type = GetType(side);
  const functionStack = GetFunctionStack(type);

  function RenderItem(item, index) {
    return (
      <View style={styles.sideContainer}>
        <TouchableOpacity
          style={styles.letterButton}
          onPress={() => FlipFunction(index)}
        >
          <Text style={styles.letterText}>{type[index]}</Text>
        </TouchableOpacity>
        <View style={styles.functionContainer}>
          <Text style={styles.functionText}>{GetFunctionName(item)}</Text>
        </View>
      </View>
    );
  }
  function FlipFunction(index) {
    switch (index) {
      case 0:
        FlipEnergy();
        return;
      case 1:
        FlipPerceive();
        return;
      case 2:
        FlipJudge();
        return;
      case 3:
        FlipPreference();
        return;
    }
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => nav.navigate("1Side", { side })}
    >
      <FlatList
        data={functionStack}
        renderItem={({ item, index }) => RenderItem(item, index)}
        scrollEnabled={false}
        contentContainerStyle={{ justifyContent: "space-around", flexGrow: 1 }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "grey",
  },
  sideContainer: {
    flex: 1,
    flexDirection: "row",
  },
  letterButton: {
    width: 64,
    aspectRatio: 1,
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "black",
    margin: 2,
  },
  letterText: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
    includeFontPadding: false,
    textAlign: "center",
    textAlignVertical: "center",
  },
  functionContainer: {
    flex: 1,
    justifyContent: "center",
    margin: 10,
  },
  functionText: {
    fontSize: 20,
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});
