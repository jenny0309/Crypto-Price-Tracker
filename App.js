import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";

// import HomeScreen from "./src/screen/HomeScreen";
// import CoinDetailedScreen from "./src/screen/CoinDetailedScreen";

export default function App() {
  return (
    <NavigationContainer theme={{ colors: { background: "#121212" } }}>
      <SafeAreaView style={styles.container}>
        <Navigation />
        <StatusBar style="light" />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
});
