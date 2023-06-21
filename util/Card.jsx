import React from "react";
import { Text, View } from "react-native";

export default function Card(props) {
  const { data } = props;
  return (
    <View>
      <Text>{data}</Text>
    </View>
  );
}
