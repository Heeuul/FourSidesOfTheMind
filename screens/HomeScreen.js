import {
  View,
  Button,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

import useType from "../hooks/useType";

export default function HomeScreen({ navigation }) {
  const { FlipEnergy, FlipPerceive, FlipJudge, FlipPreference, GetType } =
    useType();
  const type = GetType("Ego");

  function RenderLetterButton(letter) {
    return (
      <TouchableOpacity>
        <LinearGradient
          colors={["#fff", "#000"]}
          style={styles.letterContainer}
        >
          <Text style={styles.letterText}>{letter}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.desireText}>Enter desired type</Text>
      <View style={{ alignItems: "center" }}>
        <FlatList
          data={type}
          renderItem={({ item }) => RenderLetterButton(item)}
          scrollEnabled={false}
          horizontal={true}
        />
      </View>
      <Button
        title="Go to Main"
        onPress={() => navigation.navigate("4Sides")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  desireText: {
    fontSize: 35,
    textAlign: "center",
  },
  letterContainer: {
    margin: 5,
    alignItems: "center",
  },
  letterText: {
    fontSize: 100,
    textAlign: "center",
    borderBottomWidth: 2,
  },
});
