import { ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps, useAppDispatch, useAppSelector } from "../types";
import mainCategories from "../mocks/categories.json";
import { useEffect, useState } from "react";
import { removeLastSubCat } from "../store/shared/sharedSlice";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import SummarizedProductCard from "../components/SummarizedProductCard";
import SortFilterModal, { FiltersOptions } from "../components/SortFilterModal";

export default function ProductsScreen({
  navigation,
  route,
}: RootStackScreenProps<"Products">) {
  const {
    shared: { subCats, mainCat },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();

  const [products, setProducts] = useState<Array<any>>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const loadData = () => JSON.parse(JSON.stringify(mainCategories));

  useEffect(() => {
    const data = loadData();

    const categories = data.find((d: any) => d.CategoryValue === mainCat);

    if (subCats[subCats.length - 1].value !== "on-sale") {
      const subcategories =
        (categories.CategoriesArray &&
          categories.CategoriesArray.find(
            (sub: any) =>
              sub.CategoryValue === subCats[subCats.length - 1].value
          )) ||
        [];

      setProducts(subcategories.Products);
    } else {
      const products: any[] = [];

      categories.CategoriesArray &&
        categories.CategoriesArray?.forEach((sub: any) => {
          sub.Products.forEach((pro: any) => {
            if (pro.sale) {
              products.push(pro);
            }
          });
        });

      setProducts(products);
    }

    navigation.addListener("beforeRemove", () => {
      dispatch(removeLastSubCat());
    });
  }, [mainCat]);

  const sortAndFilterProducts = (filters: FiltersOptions) => {
    if (filters.sortBy) {
      setProducts(
        products.sort((pro1: any, pro2: any) => {
          if (filters.sortBy === "asc") {
            return (
              (pro1.sale ? pro1.redPrice.value : pro1.whitePrice.value) -
              (pro2.sale ? pro2.redPrice.value : pro2.whitePrice.value)
            );
          } else {
            return (
              (pro2.sale ? pro2.redPrice.value : pro2.whitePrice.value) -
              (pro1.sale ? pro1.redPrice.value : pro1.whitePrice.value)
            );
          }
        })
      );

      // console.log(
      //   products.sort(
      //     (pro1: any, pro2: any) =>
      //       {
      //         if()
      //       }
      //   )
      // );
    }
  };

  return (
    <View>
      <SortFilterModal
        modalVisible={modalVisible}
        onCloseModal={() => setModalVisible(false)}
        sortAndFilterProducts={sortAndFilterProducts}
      />

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.filterHeader}>
          <AntDesign name="filter" size={30} color={Colors[colorScheme].tint} />
          <Text style={styles.filterTitle}>Filter & Sort</Text>
        </View>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.container}>
          {products.map((pro) => (
            <SummarizedProductCard key={pro.code} product={pro} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
  },
  filterHeader: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  filterTitle: {
    fontSize: 20,
    marginStart: 10,
    textTransform: "uppercase",
  },
});
