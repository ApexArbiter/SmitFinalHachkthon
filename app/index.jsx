import { Link } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
