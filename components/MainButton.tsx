import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  TouchableHighlight,
} from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps, useAppDispatch, useAppSelector } from "../types";
import mainCategories from "../mocks/categories.json";
import { useEffect, useState } from "react";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

interface MainButtonProps {
  title: string;
  otherStyles?: {};
}

export default function MainButton({ title, otherStyles }: MainButtonProps) {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity>
      <View
        style={{
          ...styles.btnContainer,
          ...{ backgroundColor: Colors[colorScheme].text },
          ...otherStyles,
        }}
      >
        <Text style={{ color: "white" }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
