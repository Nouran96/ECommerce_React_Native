import { useState } from "react";
import { Modal, View, Pressable, StyleSheet, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Text } from "./Themed";
import MainButton from "./MainButton";
import RadioButton from "./RadioButton";

interface SortFilterModalProps {
  modalVisible: boolean;
  onCloseModal: () => void;
  sortAndFilterProducts: (filters: FiltersOptions) => void;
}

export interface FiltersOptions {
  sortBy?: string;
}

export default function SortFilterModal({
  modalVisible,
  onCloseModal,
  sortAndFilterProducts,
}: SortFilterModalProps) {
  const [sortOption, setSortOption] = useState("");

  const applyFilters = () => {
    sortAndFilterProducts({ sortBy: sortOption });
    onCloseModal();
  };

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={onCloseModal}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Pressable onPress={onCloseModal}>
            <AntDesign name="close" size={35} color="black" />
          </Pressable>

          <Text style={styles.filterTitle}>Filter & Sort</Text>
        </View>

        <ScrollView>
          <View>
            <Text>Sort by</Text>
            <View style={styles.sortOptions}>
              <RadioButton
                selected={sortOption === "asc"}
                value="asc"
                onSelect={(value: string) => setSortOption(value)}
              />
              <Text style={{ marginStart: 10 }}>Price low to high</Text>
            </View>

            <View style={styles.sortOptions}>
              <RadioButton
                selected={sortOption === "desc"}
                value="desc"
                onSelect={(value: string) => setSortOption(value)}
              />
              <Text style={{ marginStart: 10 }}>Price high to low</Text>
            </View>
          </View>
        </ScrollView>

        <MainButton title="Apply" onPress={applyFilters} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  filterTitle: {
    flexGrow: 1,
    fontSize: 20,
    marginStart: 10,
    textAlign: "center",
    textTransform: "uppercase",
  },
  sortOptions: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
});
