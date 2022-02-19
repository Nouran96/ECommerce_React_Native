import { useEffect, useState } from "react";
import { StyleSheet, Image, ScrollView, View } from "react-native";

import { Text } from "../components/Themed";
import { RootTabScreenProps, useAppDispatch } from "../types";
import categories from "../mocks/categories.json";
import MainCarousel from "../components/MainCarousel";
import SummarizedProductCard from "../components/SummarizedProductCard";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const [carouselData, setCarouselData] = useState<Array<any>>([]);
  const [onSaleProducts, setOnSaleProducts] = useState<Array<any>>([]);

  useEffect(() => {
    const loadData = () => JSON.parse(JSON.stringify(categories));

    const data = loadData();

    setCarouselData([
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

    let onSaleProducts: any[] = [];

    data.forEach((mainCat: any) => {
      mainCat.CategoriesArray.forEach((subCat: any) => {
        onSaleProducts = [
          ...onSaleProducts,
          ...subCat.Products.filter((product: any) => product.sale),
        ];
      });
    });

    setOnSaleProducts(onSaleProducts);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/images/logo.png")}
        />
        <Text style={{ fontWeight: "bold" }}>Beauty</Text>
      </View>
      {carouselData.length > 0 && <MainCarousel data={carouselData} />}
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>On Sale Products</Text>
        {onSaleProducts.length > 0 ? (
          <View style={styles.products}>
            {onSaleProducts.map((product: any) => (
              <SummarizedProductCard key={product.code} product={product} />
            ))}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>No products on Sale</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 30,
  },
  products: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  logoContainer: {
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
