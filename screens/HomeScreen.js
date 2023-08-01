import {
  View,
  Button,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";

import useType from "../hooks/useType";

export default function HomeScreen({ navigation }) {
  const { FlipEnergy, FlipPerceive, FlipJudge, FlipPreference, GetType } =
    useType();
  const side = "Ego";
  const type = GetType(side);

  function RenderLetterButton(letter, index) {
    return (
      <TouchableOpacity
        onPress={() => FlipFunction(index)}
        style={styles.letterButton}
      >
        <Text style={styles.letterText}>{letter}</Text>
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
      <Text style={styles.headerText}>Desired type</Text>

      <View style={{ alignItems: "center" }}>
        <FlatList
          data={type}
          renderItem={({ item, index }) => RenderLetterButton(item, index)}
          scrollEnabled={false}
          horizontal={true}
        />
      </View>

      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("4Sides")}
        >
          <Text adjustsFontSizeToFit={true} style={styles.navText}>
            Show Four Sides
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("1Side", { side })}
        >
          <Text adjustsFontSizeToFit={true} style={styles.navText}>
            Show Details
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 2, width: "80%", alignSelf: "center" }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 50,
            textDecorationLine: "underline",
          }}
        >
          Resources
        </Text>
        <TouchableOpacity
          style={styles.refButton}
          onPress={() => Linking.openURL("https://www.udja.app/")}
        >
          <Text adjustsFontSizeToFit={true} style={styles.refText}>
            Identify your type
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.refButton}
          onPress={() => Linking.openURL("https://offers.csjoseph.life/famous")}
        >
          <Text adjustsFontSizeToFit={true} style={styles.refText}>
            Types of famous people
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.refButton}
          onPress={() => Linking.openURL("https://csjoseph.life")}
        >
          <Text adjustsFontSizeToFit={true} style={styles.refText}>
            Advanced Content
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.refButton}
          onPress={() =>
            Linking.openURL("https://discord.com/invite/egohackers")
          }
        >
          <Text adjustsFontSizeToFit={true} style={styles.refText}>
            Community Discord
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 45,
    textAlign: "center",
  },
  letterButton: {
    width: 90,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "black",
    margin: 2,
  },
  letterText: {
    fontSize: 75,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    includeFontPadding: false,
  },
  navButton: {
    borderWidth: 2,
    borderRadius: 25,
    margin: 5,
  },
  navText: {
    textAlign: "center",
    fontSize: 35,
  },
  refButton: {
    borderWidth: 2,
    borderRadius: 10,
    margin: 5,
  },
  refText: {
    textAlign: "center",
    fontSize: 25,
  },
});
