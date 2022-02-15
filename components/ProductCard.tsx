import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "./Themed";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ColorView from "./ColorView";
import MainButton from "./MainButton";
import { useAppDispatch } from "../types";
import {
  addProductToCart,
  decrementQuantity,
  removeProductFromCart,
} from "../store/cart/cartSlice";
import PriceTag from "./PriceTag";
import { useNavigation } from "@react-navigation/native";

interface ProductCardProps {
  product: any;
  showCartControls?: boolean;
  showQuantity?: boolean;
  imageStyles?: {};
}

export default function ProductCard({
  product,
  showCartControls,
  showQuantity,
  imageStyles,
}: ProductCardProps) {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { product })}
    >
      <View style={styles.product}>
        {product.images && product.images.length > 0 && (
          <View>
            <Image
              style={{ ...styles.productImage, ...imageStyles }}
              source={{ uri: product.images[0].url }}
            />
          </View>
        )}

        <View style={styles.productContent}>
          <Text style={styles.title}>
            {product.name} {showQuantity && `x${product.quantity}`}
          </Text>
          <PriceTag price={product.price.value * product.quantity} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={styles.row}>Size: {product.selectedSize}</Text>
            <View style={styles.row}>
              <Text>Color: </Text>
              <ColorView
                color={product.selectedColor}
                otherStyles={{ width: 20, height: 20 }}
              />
            </View>
          </View>

          {showCartControls && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <MainButton
                  title="-"
                  disabled={product.quantity === 1}
                  onPress={() => dispatch(decrementQuantity(product))}
                />

                <Text style={{ paddingHorizontal: 15 }}>
                  {product.quantity}
                </Text>
                <MainButton
                  title="+"
                  onPress={() => dispatch(addProductToCart(product))}
                />
              </View>

              <TouchableOpacity
                onPress={() => dispatch(removeProductFromCart(product))}
              >
                <FontAwesome
                  name="remove"
                  size={24}
                  color={Colors[colorScheme].tint}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  product: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
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
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 5,
  },
});
