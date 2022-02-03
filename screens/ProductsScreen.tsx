import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import mainCategories from "../mocks/categories.json";
import { useEffect, useState } from "react";

export default function ProductsScreen({
  navigation,
  route,
}: RootStackScreenProps<"Products">) {
  const { mainCat, subCat } = route.params;
  const [products, setProducts] = useState<Array<any>>([]);

  const loadData = () => JSON.parse(JSON.stringify(mainCategories));

  useEffect(() => {
    const data = loadData();

    const categories = data.find((d: any) => d.CategoryValue === mainCat);
    const subcategories =
      (categories.CategoriesArray &&
        categories.CategoriesArray.find(
          (sub: any) => sub.CategoryValue === subCat.value
        )) ||
      [];

    setProducts(subcategories.Products);
  }, [mainCat]);

  return (
    <View style={styles.container}>
      {products.map((pro, index) => (
        <TouchableOpacity
          key={index}
          //   onPress={() => {
          //     if (pro.CategoriesArray) {
          //       navigation.navigate("Categories", {
          //         mainCat: cat.CategoryValue,
          //       });
          //     }
          //   }}
        >
          <Text>{pro.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
