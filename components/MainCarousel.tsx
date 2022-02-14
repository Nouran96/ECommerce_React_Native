import { Component, useEffect, useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text } from "./Themed";
import { useAppDispatch } from "../types";
import { addMainCat } from "../store/shared/sharedSlice";
import { useNavigation } from "@react-navigation/native";

type MyState = {
  activeIndex: number;
  carouselItems: Array<any>;
};

export default function MainCarousel({ data }: any) {
  const [carouselRef, setCarouselRef] = useState<Carousel<any> | null>(null);
  const [carouselOptions, setCarouselOptions] = useState({
    activeIndex: 0,
    carouselItems: [],
  });

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    setCarouselOptions({ ...carouselOptions, carouselItems: data });
  }, [data]);

  const renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.cat.CategoriesArray) {
            dispatch(addMainCat(item.cat.CategoryValue));
            navigation.navigate("Categories");
          }
        }}
      >
        <View
          style={{
            height: 300,
            position: "relative",
          }}
        >
          <Image source={item.src} />
          <Text
            style={{
              fontSize: 50,
              fontWeight: "bold",
              fontStyle: "italic",
              position: "absolute",
              top: 60,
              left: 20,
              ...item.styles,
            }}
          >
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderPagination = () => {
    return (
      carouselRef && (
        <Pagination
          dotsLength={carouselOptions.carouselItems.length}
          activeDotIndex={carouselOptions.activeIndex}
          carouselRef={carouselRef}
          tappableDots={true}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: "rgba(0, 0, 0, 0.92)",
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      )
    );
  };

  return (
    <SafeAreaView>
      <View>
        <Carousel
          layout={"default"}
          contentContainerCustomStyle={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          ref={(ref) => setCarouselRef(ref)}
          data={carouselOptions.carouselItems}
          sliderWidth={400}
          itemWidth={350}
          renderItem={renderItem}
          loop={true}
          autoplay={true}
          autoplayInterval={2000}
          autoplayDelay={0}
          enableMomentum={false}
          lockScrollWhileSnapping={true}
          onSnapToItem={(index) =>
            setCarouselOptions({ ...carouselOptions, activeIndex: index })
          }
        />
        {renderPagination()}
      </View>
    </SafeAreaView>
  );
}
