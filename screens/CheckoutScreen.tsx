import { ScrollView, StyleSheet, View, Image } from "react-native";

import { Text } from "../components/Themed";
import { RootStackScreenProps, useAppDispatch, useAppSelector } from "../types";
import MainButton from "../components/MainButton";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import PriceTag from "../components/PriceTag";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import PaymentMethods from "../components/PaymentMethods";
import { resetCart } from "../store/cart/cartSlice";

export default function CheckoutScreen({
  navigation,
}: RootStackScreenProps<"Checkout">) {
  const {
    cart: { products },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const [selectedPayment, setSelectedPayment] = useState("");

  const [prices, setPrices] = useState({
    total: 0,
    shipping: 4,
    subtotal: 0,
  });

  useEffect(() => {
    if (Object.keys(products)?.length > 0) {
      const subtotal = Object.values(products)
        .map((pro: any) => pro.price?.value * pro.quantity)
        .reduce((a, b) => a + b, 0);

      const total = subtotal + prices.shipping;

      setPrices({ ...prices, total, subtotal });
    }
  }, [products]);

  const placeOrder = () => {
    dispatch(resetCart());
    navigation.navigate("PaymentStatus");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={{ padding: 10 }}>
          {Object.values(products ?? {}).map((pro, index) => (
            <View key={index}>
              <ProductCard
                product={pro}
                imageStyles={{ width: 80, height: 80 }}
                showQuantity
              />
            </View>
          ))}

          <View
            style={{
              borderBottomColor: "rgba(0,0,0,0.2)",
              borderBottomWidth: 1,
              marginBottom: 15,
            }}
          />

          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Choose Payment Card
            </Text>
            <PaymentMethods
              onSelectedPayment={(value: string) => setSelectedPayment(value)}
            />
          </View>

          <View
            style={{
              borderBottomColor: "rgba(0,0,0,0.2)",
              borderBottomWidth: 1,
              marginBottom: 15,
            }}
          />

          <View style={styles.priceEntry}>
            <Text style={styles.priceTitle}>Subtotal</Text>
            <PriceTag price={prices.subtotal} />
          </View>

          <View style={styles.priceEntry}>
            <Text style={styles.priceTitle}>Shipping Fees</Text>
            <PriceTag price={prices.shipping} />
          </View>

          <View
            style={{
              borderBottomColor: "rgba(0,0,0,0.2)",
              borderBottomWidth: 1,
              marginBottom: 15,
            }}
          />

          <View style={styles.priceEntry}>
            <Text style={styles.priceTitle}>Total</Text>
            <PriceTag price={prices.total} />
          </View>

          <MainButton
            disabled={!selectedPayment}
            title="Place Order"
            onPress={placeOrder}
          />
          <MainButton
            title="Continue Shopping"
            otherStyles={{ marginVertical: 10 }}
            onPress={() => navigation.navigate("Root", { screen: "Home" })}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  priceEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  priceTitle: {
    fontSize: 20,
  },
});
