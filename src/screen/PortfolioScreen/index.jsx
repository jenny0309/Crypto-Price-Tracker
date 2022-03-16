import React, { Suspense } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import PortfolioAssetsList from "./components/PortfolioAssetsList";

const PortfolioScreen = () => {
  return (
    <Suspense
      fallback={<Text style={{ color: "white" }}>Loading Please Wait!</Text>}
    >
      <PortfolioAssetsList />
    </Suspense>
  );
};

export default PortfolioScreen;

const styles = StyleSheet.create({});
