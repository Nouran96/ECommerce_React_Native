import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import mainCategories from "../mocks/categories.json";
import { useEffect, useState } from "react";

export default function CategoriesScreen({
  navigation,
  route,
}: RootStackScreenProps<"Categories">) {
  const { mainCat } = route.params;
  const [categories, setCategories] = useState<Array<any>>([]);

  const loadData = () => JSON.parse(JSON.stringify(mainCategories));

  useEffect(() => {
    const data = loadData();

    const categories = data.find((d: any) => d.CategoryValue === mainCat);

    setCategories(categories.CategoriesArray);
  }, [mainCat]);

  return (
    <View style={styles.container}>
      {categories.map((cat, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            if (cat.CategoriesArray) {
              navigation.navigate("Categories", {
                mainCat,
                subCat: { name: cat.CatName, value: cat.CategoryValue },
              });
            } else {
              navigation.push("Products", {
                mainCat,
                subCat: { name: cat.CatName, value: cat.CategoryValue },
              });
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
