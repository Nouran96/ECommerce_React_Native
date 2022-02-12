import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  TouchableHighlight,
} from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps, useAppDispatch, useAppSelector } from "../types";
import mainCategories from "../mocks/categories.json";
import { useEffect, useState } from "react";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import MainButton from "../components/MainButton";
import { addProductToCart } from "../store/cart/cartSlice";
import ColorView from "../components/ColorView";

export default function ProductDetailsScreen({
  navigation,
  route,
}: RootStackScreenProps<"ProductDetails">) {
  const { code } = route.params;
  const colorScheme = useColorScheme();

  const {
    shared: { subCats, mainCat },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<any>(null);
  const [productSize, setSize] = useState<string>("");
  const [productColor, setColor] = useState<string>("");

  const loadData = () => JSON.parse(JSON.stringify(mainCategories));

  useEffect(() => {
    const data = loadData();

    const categories = data.find((d: any) => d.CategoryValue === mainCat);

    if (subCats.length > 0) {
      const subcategories =
        (categories.CategoriesArray &&
          categories.CategoriesArray.find(
            (sub: any) =>
              sub.CategoryValue === subCats[subCats.length - 1].value
          )) ||
        [];

      const productDetails =
        subcategories.Products &&
        subcategories.Products.find((p: any) => p.code === code);

      setProduct(productDetails);
    }
  }, [mainCat]);

  const addProduct = () => {
    const fullProduct = {
      ...product,
      code: `${product.code}_${productSize}_${productColor}`,
      selectedColor: productColor,
      selectedSize: productSize,
      quantity: 1,
    };

    dispatch(addProductToCart(fullProduct));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {product && (
          <View style={styles.product}>
            <View style={styles.productContent}>
              <Text style={styles.title}>{product.name}</Text>
            </View>

            {product.images && product.images.length > 0 && (
              <View style={styles.imageContainer}>
                <Image
                  style={styles.productImage}
                  source={{ uri: product.images[0].url }}
                />
              </View>
            )}

            {product.variantSizes?.length > 0 && (
              <View>
                <Text>Select Size</Text>
                <View style={styles.sizesContainer}>
                  {[...product.variantSizes]
                    .sort((a: any, b: any) => a.orderFilter - b.orderFilter)
                    .map((size: any) => (
                      <TouchableOpacity
                        onPress={() => setSize(size.filterCode)}
                        key={size.filterCode}
                      >
                        <Text
                          style={{
                            ...styles.size,
                            ...(size.filterCode === productSize
                              ? {
                                  backgroundColor: Colors[colorScheme].tint,
                                  color: "white",
                                  borderColor: "white",
                                }
                              : {}),
                          }}
                        >
                          {size.filterCode}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </View>
            )}

            {product.rgbColors?.length > 0 && (
              <View>
                <Text>Select Color</Text>
                <View style={styles.sizesContainer}>
                  {product.rgbColors.map((color: any, index: number) => (
                    <TouchableOpacity
                      onPress={() => setColor(color)}
                      key={index}
                    >
                      <ColorView
                        color={color}
                        selected={color === productColor}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
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
                <Text style={styles.price}>{product.price.value}</Text>
              </View>

              <MainButton
                onPress={addProduct}
                disabled={!productSize || !productColor}
                title="Add to Cart"
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  product: {
    margin: 15,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    marginBottom: 15,
  },
  productImage: {
    width: "100%",
    height: 360,
    borderRadius: 30,
    resizeMode: "cover",
  },
  productContent: {
    display: "flex",
    flexGrow: 1,
    flex: 1,
    marginHorizontal: 15,
  },
  title: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
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
    marginVertical: 10,
  },
  price: {
    fontWeight: "bold",
    fontSize: 17,
  },
  sizesContainer: {
    flexDirection: "row",
    marginVertical: 10,
    flexWrap: "wrap",
  },
  size: {
    marginEnd: 10,
    marginBottom: 10,
    padding: 5,
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 10,
    minWidth: 30,
  },
});
