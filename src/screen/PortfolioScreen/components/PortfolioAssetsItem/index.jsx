import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import { AntDesign } from "@expo/vector-icons";

const PortfolioAssetsItem = ({ assetItem }) => {
  const {
    currentPrice,
    image,
    name,
    priceBought,
    priceChangePercentage,
    quantityBought,
    ticker,
  } = assetItem;

  return (
    <View style={styles.coinContainer}>
      <Image
        source={{
          uri: image,
        }}
        style={{ height: 30, width: 30, marginRight: 10 }}
      />
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={styles.title}>
          {name}
        </Text>
        <Text style={styles.ticker}>{ticker}</Text>
      </View>

      <View style={{ flex: 0.75 }}>
        <Text style={styles.title}>${currentPrice}</Text>
        <View style={{ flexDirection: "row" }}>
          <AntDesign
            name={priceChangePercentage >= 0 ? "caretup" : "caretdown"}
            size={12}
            color={priceChangePercentage >= 0 ? "#16c784" : "#ea3943"}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text
            style={{
              color: priceChangePercentage >= 0 ? "#16c784" : "#ea3943",
              fontWeight: "600",
            }}
          >
            {priceChangePercentage?.toFixed(2)}%
          </Text>
        </View>
      </View>

      <View style={styles.quantityContainer}>
        <Text style={styles.title}>
          ${(quantityBought * currentPrice).toFixed(2)}
        </Text>
        <Text style={styles.ticker}>
          {quantityBought} {ticker}
        </Text>
      </View>
    </View>
  );
};

export default PortfolioAssetsItem;

const styles = StyleSheet.create({
  coinContainer: {
    flexDirection: "row",
    padding: 10,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    // alignSelf: "flex-end",
  },
  ticker: {
    color: "gray",
    fontWeight: "600",
  },
  quantityContainer: {
    marginLeft: "auto",
    alignItems: "flex-end",
    flex: 0.8,
  },
});
