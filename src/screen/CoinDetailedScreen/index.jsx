import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  monotoneCubicInterpolation,
} from "@rainbow-me/animated-charts";

import CoinDetailHeader from "./components/CoinDetailHeader";

import { AntDesign } from "@expo/vector-icons";

import Coin from "../../../assets/data/crypto.json";

export const { width: SIZE } = Dimensions.get("window");

export const data = [
  { x: 1453075200, y: 1.47 },
  { x: 1453161600, y: 1.37 },
  { x: 1453248000, y: 1.53 },
  { x: 1453334400, y: 1.54 },
  { x: 1453420800, y: 1.52 },
  { x: 1453507200, y: 2.03 },
  { x: 1453593600, y: 2.1 },
  { x: 1453680000, y: 2.5 },
  { x: 1453766400, y: 2.3 },
  { x: 1453852800, y: 2.42 },
  { x: 1453939200, y: 2.55 },
  { x: 1454025600, y: 2.41 },
  { x: 1454112000, y: 2.43 },
  { x: 1454198400, y: 2.2 },
];

const points = monotoneCubicInterpolation({ data, range: 40 });

const CoinDetailedScreen = () => {
  const {
    image: { small },
    name,
    symbol,
    market_data: {
      market_cap_rank,
      current_price,
      price_change_percentage_24h,
    },
  } = Coin;

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <CoinDetailHeader
        small={small}
        symbol={symbol}
        market_cap_rank={market_cap_rank}
      />
      <View style={styles.priceContainer}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.currentPrice}>${current_price.usd}</Text>
        </View>
        <View
          style={{
            backgroundColor: percentageColor,
            paddingHorizontal: 3,
            paddingVertical: 8,
            borderRadius: 5,
            flexDirection: "row",
          }}
        >
          <AntDesign
            name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
            size={12}
            color={"white"}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={styles.priceChangePercentage}>
            {price_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
      </View>

      {/* Basic Example */}
      <View style={{ backgroundColor: "black" }}>
        <ChartPathProvider data={{ points, smoothingStrategy: "bezier" }}>
          <ChartPath height={SIZE / 2} stroke="yellow" width={SIZE} />
          <ChartDot style={{ backgroundColor: "blue" }} />
        </ChartPathProvider>
      </View>
    </View>
  );
};

export default CoinDetailedScreen;

const styles = StyleSheet.create({
  priceContainer: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    color: "white",
    fontSize: 15,
  },
  currentPrice: {
    color: "white",
    fontSize: 30,
    fontWeight: "600",
    letterSpacing: 1,
  },
  priceChangePercentage: {
    color: "white",
    fontSize: 17,
    fontWeight: "500",
  },
});
