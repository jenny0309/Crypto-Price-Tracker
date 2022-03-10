import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} from "@rainbow-me/animated-charts";

import CoinDetailHeader from "./components/CoinDetailHeader";

import { AntDesign } from "@expo/vector-icons";

import Coin from "../../../assets/data/crypto.json";

const CoinDetailedScreen = () => {
  const {
    image: { small },
    name,
    symbol,
    prices,
    market_data: {
      market_cap_rank,
      current_price,
      price_change_percentage_24h,
    },
  } = Coin;

  const [coinValue, setCoinValue] = useState(1);
  const [usdValue, setUsdValue] = useState(current_price?.usd);

  // useEffect(() => {
  //   console.log(coinValue);
  //   console.log(usdValue);
  // }, [coinValue, usdValue]);

  const changeCoinValue = (value) => {
    setCoinValue(value);

    const floatValue = parseFloat(value) || 0
    setUsdValue((floatValue * current_price.usd).toString());
  };

  const changeUsdValue = (value) => {
    setUsdValue(value);

    const floatValue = parseFloat(value) || 0
    setCoinValue((floatValue / current_price.usd).toString());
  };

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";

  const chartColor = current_price.usd > prices[0][1] ? "#16c784" : "#ea3943";

  const screenWidth = Dimensions.get("window").width;

  const formatCurrency = (value) => {
    "worklet";
    if (value === "") {
      return `$${current_price.usd.toFixed(2)}`;
    }
    return `$${parseFloat(value).toFixed(2)}`;
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <ChartPathProvider
        data={{
          points: prices.map((price) => ({ x: price[0], y: price[1] })),
          smoothingStrategy: "bezier",
        }}
      >
        <CoinDetailHeader
          small={small}
          symbol={symbol}
          market_cap_rank={market_cap_rank}
        />
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <ChartYLabel format={formatCurrency} style={styles.currentPrice} />
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

        <View>
          <ChartPath
            strokeWidth={2}
            height={screenWidth / 2}
            stroke={chartColor}
            width={screenWidth}
          />
          <ChartDot style={{ backgroundColor: chartColor }} />
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>
              {symbol.toUpperCase()}
            </Text>
            <TextInput
              style={styles.input}
              value={coinValue.toString()}
              keyboardType="numeric"
              onChangeText={changeCoinValue}
            />
          </View>

          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>USD</Text>
            <TextInput
              style={styles.input}
              value={usdValue.toString()}
              keyboardType="numeric"
              onChangeText={changeUsdValue}
            />
          </View>
        </View>
      </ChartPathProvider>
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
  input: {
    flex: 1,
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    padding: 10,
    fontSize: 16,
    color: "white",
  },
});
