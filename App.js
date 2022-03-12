import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";
// Context API
import WatchListProvider from "./src/contexts/WatchListContext";

export default function App() {
  return (
    <NavigationContainer theme={{ colors: { background: "#121212" } }}>
      <WatchListProvider>
        {/* children */}
        <SafeAreaView style={styles.container}>
          <Navigation />
          <StatusBar style="light" />
        </SafeAreaView>
      </WatchListProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
});
