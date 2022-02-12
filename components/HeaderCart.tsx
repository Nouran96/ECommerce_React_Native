import { StyleSheet, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps, useAppDispatch, useAppSelector } from "../types";
import mainCategories from "../mocks/categories.json";
import { useEffect, useState } from "react";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

interface HeaderCartProps {
  color: string | undefined;
}

let colorScheme = "light";

export default function HeaderCart({ color }: HeaderCartProps) {
  const {
    cart: { products },
  } = useAppSelector((state) => state);

  const scheme = useColorScheme();
  const navigation = useNavigation();

  useEffect(() => {
    colorScheme = scheme;
  }, [scheme]);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Root", { screen: "Bag" })}
    >
      <View style={styles.container}>
        {Object.keys(products ?? {}).length > 0 && (
          <Text style={styles.number}>
            {Object.keys(products ?? {}).length}
          </Text>
        )}

        <SimpleLineIcons name="bag" size={35} color={color} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    right: 10,
  },
  number: {
    position: "absolute",
    backgroundColor: Colors[colorScheme].tint,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
    zIndex: 2,
    color: "white",
    top: -10,
    right: -10,
  },
});
