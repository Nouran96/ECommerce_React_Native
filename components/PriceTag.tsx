import { StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Text } from "./Themed";

export default function PriceTag({
  price,
  sale,
}: {
  price: number;
  sale?: boolean;
}) {
  const colorScheme = useColorScheme();

  return (
    <View
      style={
        sale
          ? { ...styles.priceContainer, ...styles.onSale }
          : styles.priceContainer
      }
    >
      <Text
        style={{
          ...styles.currency,
          color: Colors[colorScheme].tint,
        }}
      >
        $
      </Text>
      <Text style={sale ? styles.onSalePrice : styles.price}>
        {price.toFixed(2)}
      </Text>
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
  onSale: {
    marginEnd: 10,
  },
  onSalePrice: {
    fontWeight: "bold",
    fontSize: 13,
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  price: {
    fontWeight: "bold",
    fontSize: 17,
  },
});
