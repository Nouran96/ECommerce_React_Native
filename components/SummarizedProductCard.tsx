import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { toggleProductFromWishlist } from "../store/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "../types";

import { Text } from "./Themed";
import PriceTag from "./PriceTag";

export default function SummarizedProductCard({ product }: { product: any }) {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();

  const {
    wishlist: { products },
  } = useAppSelector((state) => state);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductDetails", { product: product })
      }
      style={styles.product}
    >
      <View style={{ position: "relative" }}>
        {product.images && product.images.length > 0 && (
          <View>
            <Image
              style={styles.productImage}
              source={{ uri: product.images[0].url }}
            />
          </View>
        )}

        <TouchableOpacity
          onPress={() => dispatch(toggleProductFromWishlist(product))}
          style={{ position: "absolute", right: 0, top: 0 }}
        >
          <AntDesign
            name={products[product.code] ? "heart" : "hearto"}
            size={30}
            color={Colors[colorScheme].tint}
          />
        </TouchableOpacity>

        {product.sale && (
          <View
            style={{
              position: "absolute",
              left: 0,
              backgroundColor: Colors[colorScheme].tint,
              borderRadius: 5,
              paddingHorizontal: 5,
              paddingVertical: 2,
            }}
          >
            <Text style={{ color: "white" }}>on Sale</Text>
          </View>
        )}
      </View>

      <View style={styles.productContent}>
        <Text style={styles.title}>{product.name}</Text>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {product.sale && <PriceTag price={product.whitePrice.value} sale />}

          <PriceTag
            price={
              product.sale ? product.redPrice.value : product.whitePrice.value
            }
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});
