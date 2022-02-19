import { StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

interface ColorViewProps {
  color: string;
  selected?: boolean;
  otherStyles?: {};
}

export default function ColorView({
  color,
  selected,
  otherStyles,
}: ColorViewProps) {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        ...styles.color,
        ...{ backgroundColor: color, borderColor: "#aaa", borderWidth: 1 },
        ...(selected
          ? {
              borderWidth: 3,
              borderColor: Colors[colorScheme].tint,
            }
          : {}),
        ...otherStyles,
      }}
    ></View>
  );
}

const styles = StyleSheet.create({
  color: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginEnd: 10,
    marginBottom: 10,
  },
});
