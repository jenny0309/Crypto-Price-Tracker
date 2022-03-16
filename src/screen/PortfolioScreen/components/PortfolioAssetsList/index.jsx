import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import PortfolioAssetsItem from "../PortfolioAssetsItem";
import { useNavigation } from "@react-navigation/core";
import { useRecoilValue, useRecoilState } from "recoil";
import { allPortfolioAssets } from "../../../../atoms/PortfolioAssets";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AntDesign } from "@expo/vector-icons";

const PortfolioAssetsList = () => {
  const navigation = useNavigation();

  // https://recoiljs.org/docs/introduction/getting-started
  const assets = useRecoilValue(allPortfolioAssets);
  // console.log(assets);

  const getCurrentBalance = () =>
    assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.currentPrice * currentAsset.quantityBought,
      0
    );

  const getCurrentValueChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.priceBought * currentAsset.quantityBought,
      0
    );

    return (currentBalance - boughtBalance).toFixed(2);
  };

  const getCurrentPercentageChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.priceBought * currentAsset.quantityBought,
      0
    );

    return (
      (((currentBalance - boughtBalance) / boughtBalance) * 100).toFixed(2) || 0
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={assets}
        renderItem={({ item }) => <PortfolioAssetsItem assetItem={item} />}
        keyExtractor={(props, index) => props.id + "-" + index}
        ListHeaderComponent={
          <>
            <View style={styles.balanceContainer}>
              <View>
                <Text style={styles.currentBalanceTitle}>Current Balance</Text>
                <Text style={styles.currentBalanceValue}>
                  ${(getCurrentBalance()).toFixed(2)}
                </Text>
                <Text
                  style={[
                    styles.valueChange,
                    {
                      color:
                        getCurrentValueChange() >= 0 ? "#16c784" : "#ea3943",
                    },
                  ]}
                >
                  ${getCurrentValueChange()} (All Time)
                </Text>
              </View>
              <View
                style={[
                  styles.percentageContainer,
                  {
                    backgroundColor:
                      getCurrentPercentageChange() >= 0 ? "#16c784" : "#ea3943",
                  },
                ]}
              >
                <AntDesign
                  name={
                    getCurrentPercentageChange() >= 0 ? "caretup" : "caretdown"
                  }
                  size={12}
                  color={"white"}
                  style={{ alignSelf: "center", marginRight: 5 }}
                />
                <Text style={styles.percentageChange}>
                  {getCurrentPercentageChange()}%
                </Text>
              </View>
            </View>
            <View style={styles.assetsLabelContainer}>
              <Text style={styles.assetsLabel}>Your Assets</Text>
            </View>
          </>
        }
        ListFooterComponent={
          <>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate("AddNewAsset")}
            >
              <Text style={styles.buttonText}>Add New Asset</Text>
            </TouchableOpacity>
            <Pressable
              style={[styles.buttonContainer, { backgroundColor: "gray" }]}
              // onPress={AsyncStorage.clear()}
            >
              <Text style={styles.buttonText}>Clear List</Text>
            </Pressable>
          </>
        }
      />
    </View>
  );
};

export default PortfolioAssetsList;

const styles = StyleSheet.create({
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  currentBalanceTitle: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  currentBalanceValue: {
    color: "white",
    fontWeight: "700",
    fontSize: 40,
    letterSpacing: 1,
  },
  valueChange: {
    fontWeight: "600",
    fontSize: 16,
    color: "#16c784",
  },
  percentageContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 7,
    backgroundColor: "#16c784",
  },
  percentageChange: {
    color: "white",
    fontWeight: "500",
    fontSize: 18,
  },
  assetsLabelContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  assetsLabel: {
    color: "white",
    fontSize: 23,
    fontWeight: "700",
  },
  buttonContainer: {
    backgroundColor: "#4169E1",
    width: "95%",
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "center",
  },
});
