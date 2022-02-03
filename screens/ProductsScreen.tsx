import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps, useAppDispatch, useAppSelector } from "../types";
import mainCategories from "../mocks/categories.json";
import { useEffect, useState } from "react";
import { removeLastSubCat } from "../store/shared/sharedSlice";

export default function ProductsScreen({
  navigation,
  route,
}: RootStackScreenProps<"Products">) {
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
          <Text key={index} style={{ marginBottom: 10 }}>
            {pro.name}
          </Text>
        ))}
      </View>
    </ScrollView>
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
