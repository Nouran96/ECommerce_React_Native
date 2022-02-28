import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps, useAppDispatch, useAppSelector } from "../types";
import mainCategories from "../mocks/categories.json";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { appendSubCat, removeLastSubCat } from "../store/shared/sharedSlice";
import Colors from "../constants/Colors";

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

    setCategories([
      ...firstLevelCategories.CategoriesArray,
      { CatName: "On Sale", CategoryValue: "on-sale" },
    ]);
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
          <View
            style={{
              ...styles.categoryContainer,
              backgroundColor: Colors["light"].tint,
              borderColor: Colors["light"].tint,
            }}
          >
            <Text style={styles.title}>{cat.CatName}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryContainer: {
    padding: 20,
    margin: 15,
    borderRadius: 10,
    borderWidth: 1,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },
});
