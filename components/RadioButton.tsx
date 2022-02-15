import { TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

interface RadioButtonProps {
  style?: {};
  selected: boolean;
  onSelect: (value: string) => void;
  value: string;
}

export default function RadioButton({
  style,
  selected,
  onSelect,
  value,
}: RadioButtonProps) {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity onPress={() => onSelect(value)}>
      <View
        style={[
          {
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: Colors[colorScheme].tint,
            alignItems: "center",
            justifyContent: "center",
          },
          style,
        ]}
      >
        {selected ? (
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: Colors[colorScheme].tint,
            }}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
}
