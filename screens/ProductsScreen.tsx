import { ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps, useAppDispatch, useAppSelector } from "../types";
import mainCategories from "../mocks/categories.json";
import { useEffect, useState } from "react";
import { removeLastSubCat } from "../store/shared/sharedSlice";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export default function ProductsScreen({
  navigation,
  route,
}: RootStackScreenProps<"Products">) {
  const colorScheme = useColorScheme();

  const {
    shared: { subCats },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const {
    shared: { mainCat },
  } = useAppSelector((state) => state);
  const [products, setProducts] = useState<Array<any>>([]);

  const loadData = () => JSON.parse(JSON.stringify(mainCategories));

  useEffect(() => {
    const data = loadData();

    const categories = data.find((d: any) => d.CategoryValue === mainCat);
    const subcategories =
      (categories.CategoriesArray &&
        categories.CategoriesArray.find(
          (sub: any) => sub.CategoryValue === subCats[subCats.length - 1].value
        )) ||
      [];

    setProducts(subcategories.Products);

    navigation.addListener("beforeRemove", () => {
      dispatch(removeLastSubCat());
    });
  }, [mainCat]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {products.map((pro, index) => (
          <View style={styles.product} key={index}>
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
                <Text style={styles.price}>{pro.price.value}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
  },
  product: {
    width: "50%",
    alignItems: "center",
    marginVertical: 15,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 30,
  },
  productContent: {
    display: "flex",
    flexGrow: 1,
    flex: 1,
    marginHorizontal: 15,
  },
  title: {
    marginVertical: 10,
    textAlign: "center",
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
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: "80%",
  // },
});
