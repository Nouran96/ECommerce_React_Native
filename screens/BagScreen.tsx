import { ScrollView, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps, useAppSelector } from "../types";
import MainButton from "../components/MainButton";
import ProductCard from "../components/ProductCard";

export default function BagScreen({ navigation }: RootTabScreenProps<"Bag">) {
  const {
    cart: { products },
  } = useAppSelector((state) => state);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {Object.keys(products ?? {}).length > 0 ? (
          <View style={{ padding: 10 }}>
            {Object.values(products ?? {}).map((pro, index) => (
              <View key={index}>
                <ProductCard product={pro} showCartControls showOnSaleTag />
              </View>
            ))}

            <MainButton
              title="Checkout"
              onPress={() => navigation.navigate("Checkout")}
            />
            <MainButton
              title="Continue Shopping"
              otherStyles={{ marginVertical: 10 }}
              onPress={() => navigation.navigate("Home")}
            />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>No products in bag yet</Text>
            <MainButton
              title="Continue Shopping"
              otherStyles={{ marginVertical: 10 }}
              onPress={() => navigation.navigate("Home")}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
