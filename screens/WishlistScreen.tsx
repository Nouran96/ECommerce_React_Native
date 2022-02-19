import { ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps, useAppSelector } from "../types";
import MainButton from "../components/MainButton";
import SummarizedProductCard from "../components/SummarizedProductCard";

export default function WishlistScreen({
  navigation,
}: RootTabScreenProps<"Wishlist">) {
  const {
    wishlist: { products },
  } = useAppSelector((state) => state);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {Object.keys(products ?? {}).length > 0 ? (
          <View>
            <View style={styles.products}>
              {Object.values(products ?? {}).map((pro, index) => (
                <SummarizedProductCard key={pro.code} product={pro} />
              ))}
            </View>

            <MainButton
              title="Continue Shopping"
              otherStyles={{ margin: 10 }}
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
            <Text>No products in wishlist yet</Text>
            <MainButton
              title="Continue Shopping"
              otherStyles={{ margin: 10 }}
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
  products: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
