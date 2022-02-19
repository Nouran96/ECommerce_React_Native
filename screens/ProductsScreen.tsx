import { ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps, useAppDispatch, useAppSelector } from "../types";
import mainCategories from "../mocks/categories.json";
import { useEffect, useState } from "react";
import { removeLastSubCat } from "../store/shared/sharedSlice";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import SummarizedProductCard from "../components/SummarizedProductCard";

export default function ProductsScreen({
  navigation,
  route,
}: RootStackScreenProps<"Products">) {
  const {
    shared: { subCats, mainCat },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

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
        {products.map((pro) => (
          <SummarizedProductCard key={pro.code} product={pro} />
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
});
