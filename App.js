import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import HomeScreen from "./src/screen/HomeScreen";
import CoinDetailedScreen from "./src/screen/CoinDetailedScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
});
