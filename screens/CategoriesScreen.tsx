import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps, useAppDispatch, useAppSelector } from "../types";
import mainCategories from "../mocks/categories.json";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { appendSubCat, removeLastSubCat } from "../store/shared/sharedSlice";

export default function CategoriesScreen({
  navigation,
  route,
}: RootStackScreenProps<"Categories">) {
  const {
    shared: { mainCat, subCats },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<Array<any>>([]);

  useEffect(() => {
    loadCategories();

    navigation.addListener("beforeRemove", () => {
      dispatch(removeLastSubCat());
    });
  }, [mainCat]);

  const loadData = () => JSON.parse(JSON.stringify(mainCategories));

  const loadCategories = () => {
    const data = loadData();

    const firstLevelCategories = data.find(
      (d: any) => d.CategoryValue === mainCat
    );

    setCategories(firstLevelCategories.CategoriesArray);
  };

  return (
    <View style={styles.container}>
      {categories.map((cat, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            dispatch(
              appendSubCat({ name: cat.CatName, value: cat.CategoryValue })
            );

            if (cat.CategoriesArray) {
              navigation.push("Categories");
            } else {
              navigation.push("Products");
            }
          }}
        >
          <Text>{cat.CatName}</Text>
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
