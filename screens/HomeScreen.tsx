import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps, useAppDispatch } from "../types";
import categories from "../mocks/categories.json";
import { addMainCat } from "../store/shared/sharedSlice";
import MainCarousel from "../components/MainCarousel";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const [data, setData] = useState<Array<any>>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadData = () => JSON.parse(JSON.stringify(categories));

    const data = loadData();

    // const carouselData = data.map((cat: any) => ({
    //   title: cat.CatName,
    //   src: require(`../assets/images/${cat.CategoryValue}_model.jpg`)
    // }))

    // setData(loadData());
    setData([
      {
        title: "Women",
        styles: {
          color: "white",
        },
        src: require("../assets/images/ladies_model.jpg"),
        cat: data[0],
      },
      {
        title: "Men",
        styles: {
          color: "#e1b823",
        },
        src: require("../assets/images/men_model.jpg"),
        cat: data[1],
      },
      {
        title: "Kids",
        styles: {
          color: "#e1b823",
          fontSize: 60,
        },
        src: require("../assets/images/kids_model.jpg"),
        cat: data[2],
      },
    ]);
  }, []);

  if (data.length > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.tinyLogo}
            source={require("../assets/images/logo.png")}
          />
          <Text style={{ fontWeight: "bold" }}>Beauty</Text>
        </View>
        <MainCarousel data={data} />
      </View>
    );
  } else return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    width: 50,
    height: 100,
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
