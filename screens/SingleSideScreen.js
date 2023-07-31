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
      <TouchableOpacity
        onPress={() => FlipFunction(index)}
        style={styles.letterButton}
      >
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
    <View style={{ flex: 1 }}>
      <View>
        <FlatList
          data={type}
          renderItem={({ item, index }) => RenderLetterButton(item, index)}
          horizontal={true}
          scrollEnabled={false}
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
          }}
        />

        <FlatList
          data={GetLabel(side)}
          renderItem={({ item, index }) => (
            <Text>{item + ": " + functionStack[index]}</Text>
          )}
          scrollEnabled={false}
        />
      </View>

      <Text>{"Quadra: " + GetQuadra(type)}</Text>

      <View>
        <Text style={styles.titleText}>Expressions</Text>
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
      </View>

      <View>
        <Text style={styles.titleText}>Worldview</Text>
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
      </View>

      <Text style={styles.titleText}>Armament</Text>
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
  titleText: {
    fontSize: 50,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
