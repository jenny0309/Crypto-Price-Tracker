import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";

const CoinItem = ({ marketCoin }) => {
  //   console.log(marketCoin);

  const navigation = useNavigation();

  const {
    id,
    name,
    current_price,
    market_cap_rank,
    price_change_percentage_24h,
    symbol,
    market_cap,
    image,
  } = marketCoin;

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";

  const normalizeMarketCap = (marketCap) => {
    if (marketCap > 1e12) {
      return `${Math.floor(marketCap / 1_000_000_000_000)}T`;
    } else if (marketCap > 1e9) {
      return `${Math.floor(marketCap / 1_000_000_000)}B`;
    } else if (marketCap > 1e6) {
      return `${Math.floor(marketCap / 1_000_000)}M`;
    } else if (marketCap > 1e3) {
      return `${Math.floor(marketCap / 1_000)}K`;
    }
    return marketCap;
  };

  return (
    <TouchableOpacity
      style={styles.coinContainer}
      onPress={() => navigation.navigate("Detail", {coinId: id})}
    >
      <Image
        source={{
          uri: image,
        }}
        style={{
          width: 30,
          height: 30,
          marginRight: 10,
          alignSelf: "center",
        }}
      />
      <View>
        <Text style={styles.title}>{name}</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.rankContainer}>
            <Text style={styles.rank}>{Math.abs(market_cap_rank)}</Text>
          </View>
          <Text style={styles.text}>{symbol.toUpperCase()}</Text>
          <AntDesign
            name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
            size={12}
            color={percentageColor}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={{ color: percentageColor }}>
            {price_change_percentage_24h?.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
        <Text style={styles.title}>{current_price.toFixed(2)}</Text>
        <Text style={styles.text}>MCap {normalizeMarketCap(market_cap)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
  },
  text: {
    color: "white",
    marginRight: 5,
  },
  coinContainer: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth, // the smallest thiness of bottomline
    borderBottomColor: "#282828",
    padding: 15,
    backgroundColor: "#121212",
    flex: 1
  },
  rank: {
    fontWeight: "bold",
    color: "white",
  },
  rankContainer: {
    marginRight: 5,
    backgroundColor: "#585858",
    paddingHorizontal: 5,
    borderRadius: 5,
  },
});

export default CoinItem;
