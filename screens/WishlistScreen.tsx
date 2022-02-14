import { ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Text, View } from "../components/Themed";
import {
  RootStackScreenProps,
  RootTabScreenProps,
  useAppDispatch,
  useAppSelector,
} from "../types";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import ColorView from "../components/ColorView";
import MainButton from "../components/MainButton";
import {
  addProductToCart,
  decrementQuantity,
  removeProductFromCart,
} from "../store/cart/cartSlice";
import { toggleProductFromWishlist } from "../store/wishlist/wishlistSlice";

export default function WishlistScreen({
  navigation,
}: RootTabScreenProps<"Wishlist">) {
  const colorScheme = useColorScheme();

  const {
    wishlist: { products },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {Object.keys(products ?? {}).length > 0 ? (
          <View>
            <View style={styles.products}>
              {Object.values(products ?? {}).map((pro, index) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProductDetails", { product: pro })
                  }
                  key={index}
                  style={styles.product}
                >
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
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={styles.priceContainer}>
                        <Text
                          style={{
                            ...styles.currency,
                            color: Colors[colorScheme].tint,
                          }}
                        >
                          $
                        </Text>
                        <Text style={styles.price}>{pro.price.value}</Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => dispatch(toggleProductFromWishlist(pro))}
                      >
                        <AntDesign
                          name={products[pro.code] ? "heart" : "hearto"}
                          size={30}
                          color={Colors[colorScheme].tint}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

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
            <Text>No products in wishlist yet</Text>
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
  products: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  product: {
    width: "50%",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 30,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 30,
  },
  productContent: {
    flexGrow: 1,
    flex: 1,
    marginHorizontal: 15,
  },
  title: {
    marginVertical: 10,
    textAlign: "center",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  price: {
    fontWeight: "bold",
    fontSize: 17,
  },
});
