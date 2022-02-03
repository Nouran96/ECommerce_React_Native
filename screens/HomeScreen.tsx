import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import categories from "../mocks/categories.json";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const [data, setData] = useState<Array<any>>([]);
  useEffect(() => {
    const loadData = () => JSON.parse(JSON.stringify(categories));

    setData(loadData());
  }, []);

  if (data.length > 0) {
    return (
      <View style={styles.container}>
        {data.map((cat, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              if (cat.CategoriesArray) {
                navigation.navigate("Categories", {
                  mainCat: cat.CategoryValue,
                });
              }
            }}
          >
            <Text>{cat.CatName}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  } else return null;
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
