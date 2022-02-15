import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Text } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import MainButton from "../components/MainButton";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export default function PaymentStatusScreen({
  navigation,
}: RootStackScreenProps<"PaymentStatus">) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <AntDesign
        name="checkcircleo"
        size={100}
        color={Colors[colorScheme].tint}
      />
      <Text style={{ marginVertical: 10, fontSize: 20 }}>
        Payment was Successful
      </Text>
      <MainButton
        title="Go back to Home"
        otherStyles={{ marginVertical: 10 }}
        onPress={() => navigation.navigate("Root", { screen: "Home" })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
