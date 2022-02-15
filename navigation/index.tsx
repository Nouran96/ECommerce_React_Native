/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable, View } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import NotFoundScreen from "../screens/NotFoundScreen";
import HomeScreen from "../screens/HomeScreen";
import BagScreen from "../screens/BagScreen";
import WishlistScreen from "../screens/WishlistScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
  useAppSelector,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import CategoriesScreen from "../screens/CategoriesScreen";
import ProductsScreen from "../screens/ProductsScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import HeaderCart from "../components/HeaderCart";
import CheckoutScreen from "../screens/CheckoutScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const {
    shared: { mainCat, subCats },
  } = useAppSelector((state) => state);

  return (
    <Stack.Navigator
      screenOptions={{ contentStyle: { backgroundColor: "#fff" } }}
    >
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group>
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            headerTitle: mainCat.slice(0, 1).toUpperCase() + mainCat.slice(1),
          }}
        />
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={{
            ...(subCats?.length > 0
              ? { headerTitle: subCats[subCats.length - 1].name }
              : {}),
            headerRight: ({ tintColor }) => <HeaderCart color={tintColor} />,
          }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{
            headerTitle: "",
            headerRight: ({ tintColor }) => <HeaderCart color={tintColor} />,
          }}
        />
        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{
            headerTitle: "Checkout",
          }}
        />
      </Stack.Group>
      {/* <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group> */}
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarShowLabel: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={30} color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Bag"
        component={BagScreen}
        options={{
          title: "Bag",
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="bag" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          title: "Wishlist",
          tabBarIcon: ({ color }) => (
            <AntDesign name="hearto" size={24} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>["name"];
  color: string;
}) {
  return <AntDesign size={30} style={{ marginBottom: -3 }} {...props} />;
}
