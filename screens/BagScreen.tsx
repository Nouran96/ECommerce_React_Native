import { ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";

import { Text, View } from "../components/Themed";
import {
  RootStackScreenProps,
  RootTabScreenProps,
  useAppDispatch,
  useAppSelector,
} from "../types";
import mainCategories from "../mocks/categories.json";
import { useEffect, useState } from "react";
import { removeLastSubCat } from "../store/shared/sharedSlice";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import ColorView from "../components/ColorView";
import MainButton from "../components/MainButton";
import { addProductToCart, decrementQuantity } from "../store/cart/cartSlice";

export default function BagScreen({ navigation }: RootTabScreenProps<"Bag">) {
  const colorScheme = useColorScheme();

  const {
    cart: { products },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  return (
    <ScrollView>
      <View style={styles.container}>
        {Object.keys(products ?? {}).length > 0 ? (
          <View>
            {Object.values(products ?? {}).map((pro, index) => (
              <View key={index} style={styles.product}>
                {pro.images && pro.images.length > 0 && (
                  <View>
                    <Image
                      style={styles.productImage}
                      source={{ uri: pro.images[0].url }}
                    />
                  </View>
                )}

                <View style={styles.productContent}>
                  <Text style={styles.title}>{pro.name}</Text>
                  <View style={styles.priceContainer}>
                    <Text
                      style={{
                        ...styles.currency,
                        color: Colors[colorScheme].tint,
                      }}
                    >
                      $
                    </Text>
                    <Text style={styles.price}>
                      {(pro.price.value * pro.quantity).toFixed(2)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Text style={styles.row}>Size: {pro.selectedSize}</Text>
                    <View style={styles.row}>
                      <Text>Color: </Text>
                      <ColorView color={pro.selectedColor} />
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <MainButton
                      title="-"
                      disabled={pro.quantity === 1}
                      onPress={() => dispatch(decrementQuantity(pro))}
                    />

                    <Text>{pro.quantity}</Text>
                    <MainButton
                      title="+"
                      onPress={() => dispatch(addProductToCart(pro))}
                    />
                  </View>
                </View>
              </View>
            ))}

            <MainButton title="Checkout" onPress={() => {}} />
          </View>
        ) : (
          <Text>No products in bag yet</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // display: "flex",
    // flexDirection: "row",
    // width: "100%",
    flex: 1,
    // flexWrap: "wrap",
    margin: 10,
  },
  product: {
    width: "100%",
    flexDirection: "row",
    // alignItems: "center",
    marginTop: 15,
    marginBottom: 30,
    // flexWrap: "wrap",
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 30,
  },
  productContent: {
    alignItems: "flex-start",
    flexGrow: 1,
    flex: 1,
    marginHorizontal: 15,
  },
  title: {
    marginVertical: 10,
    // textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 5,
  },
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
