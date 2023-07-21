import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import useType from "../hooks/useType";

export default function SingleSideScreen({ route }) {
  const { side } = route.params;
  const {
    FlipEnergy,
    FlipPerceive,
    FlipJudge,
    FlipPreference,
    GetType,
    GetLabel,
    GetFunctionStack,
    GetQuadra,
    GetExpressionFull,
    GetWorldviewFull,
    GetArmament,
  } = useType();

  const type = GetType(side);
  const functionStack = GetFunctionStack(type);
  const expression = GetExpressionFull(type);
  const worldview = GetWorldviewFull(type);
  const armament = GetArmament(type);

  function RenderLetterButton(item, index) {
    return (
      <TouchableOpacity onPress={() => FlipFunction(index)}>
        <Text style={styles.letterText}>{item}</Text>
      </TouchableOpacity>
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
    <View>
      <Text>
        <FlatList
          data={type}
          renderItem={({ item, index }) => RenderLetterButton(item, index)}
          horizontal={true}
          scrollEnabled={false}
        />
      </Text>
      <FlatList
        data={GetLabel(side)}
        renderItem={({ item, index }) => (
          <Text>
            <Text>{item + ": "}</Text>
            <Text>{functionStack[index]}</Text>
          </Text>
        )}
        scrollEnabled={false}
      />
      <Text>{"Quadra: " + GetQuadra(type)}</Text>
      <FlatList
        data={Object.keys(expression)}
        renderItem={({ item }) => (
          <Text>
            {item.charAt(0).toUpperCase() +
              item.slice(1) +
              ": " +
              expression[item]}
          </Text>
        )}
      />
      <FlatList
        data={Object.keys(worldview)}
        renderItem={({ item }) => (
          <Text>
            {item.charAt(0).toUpperCase() +
              item.slice(1) +
              ": " +
              worldview[item]}
          </Text>
        )}
      />
      <FlatList
        data={Object.keys(armament)}
        renderItem={({ item }) => (
          <Text>
            {item.charAt(0).toUpperCase() +
              item.slice(1) +
              ": " +
              armament[item]}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  letterText: {
    fontSize: 50,
  },
});
