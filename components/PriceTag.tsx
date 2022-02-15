import { StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Text } from "./Themed";

export default function PriceTag({ price }: { price: number }) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.priceContainer}>
      <Text
        style={{
          ...styles.currency,
          color: Colors[colorScheme].tint,
        }}
      >
        $
      </Text>
      <Text style={styles.price}>{price.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  currency: {
    fontSize: 25,
    fontWeight: "bold",
    marginEnd: 7,
  },
  priceContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  price: {
    fontWeight: "bold",
    fontSize: 17,
  },
});
