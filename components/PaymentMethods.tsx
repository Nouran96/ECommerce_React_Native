import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import RadioButton from "./RadioButton";
import { Text } from "./Themed";

export default function PaymentMethods({
  onSelectedPayment,
}: {
  onSelectedPayment: (value: string) => void;
}) {
  const [data] = useState([
    {
      src: require("../assets/images/visa.png"),
      title: "Visa",
      cardNumber: "**** **** **** 0234",
      value: "visa",
    },
    {
      src: require("../assets/images/master.png"),
      title: "Master Card",
      cardNumber: "**** **** **** 3213",
      value: "master",
    },
    {
      src: require("../assets/images/apple.png"),
      title: "Apple Pay",
      cardNumber: "**** **** **** 2332",
      value: "apple",
    },
  ]);

  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (selected) {
      onSelectedPayment(selected);
    }
  }, [selected]);

  return data && data.length > 0 ? (
    <View style={{ marginBottom: 20 }}>
      {data.map((option: any, index: number) => (
        <View key={index} style={styles.container}>
          <View style={styles.leftContainer}>
            <View style={styles.imageContainer}>
              <Image source={option.src} style={styles.image} />
            </View>

            <View>
              <Text>{option.title}</Text>
              <Text>{option.cardNumber}</Text>
            </View>
          </View>

          <RadioButton
            selected={selected === option.value}
            value={option.value}
            onSelect={(value: string) => setSelected(value)}
          />
        </View>
      ))}
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    borderRadius: 10,
    marginEnd: 10,
  },
  image: {
    width: 65,
    height: 65,
    resizeMode: "contain",
  },
});
