import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import useType from "../hooks/useType";

export default function SingleSideScreen({ route }) {
  const { side } = route.params;
  const { GetType, GetLabel, GetFunctionStack } = useType();

  const type = GetType(side);
  const functionStack = GetFunctionStack(type);

  return (
    <View>
      <Text>
        <TouchableOpacity>
          <Text>{type[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>{type[1]}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>{type[2]}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>{type[3]}</Text>
        </TouchableOpacity>
      </Text>
      <FlatList
        data={GetLabel(side)}
        renderItem={({ item, index }) => (
          <Text>
            <Text>{item + ":"}</Text>
            <Text>{functionStack[index]}</Text>
          </Text>
        )}
        scrollEnabled={false}
      />
    </View>
  );
}
