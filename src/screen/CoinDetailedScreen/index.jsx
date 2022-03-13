import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} from "@rainbow-me/animated-charts";
import { useRoute } from "@react-navigation/native";
import {
  getDetailedCoinData,
  getCoinMarketChart,
} from "../../services/requests";

import CoinDetailHeader from "./components/CoinDetailHeader";

import { AntDesign } from "@expo/vector-icons";

const CoinDetailedScreen = () => {
  const route = useRoute();
  const {
    params: { coinId },
  } = route;

  // console.log(coinId);

  const [coinValue, setCoinValue] = useState(1);
  const [usdValue, setUsdValue] = useState(coin?.market_data?.current_price.usd);
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  // fetching data asynchronously takes bunch of time => set loading!
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getDetailedCoinData(coinId).then((coinData) => {
      setCoin(coinData);
      setLoading(false);
    });

    getCoinMarketChart(coinId).then((marketData) => {
      setCoinMarketData(marketData);
      setLoading(false);
    });
  }, []);

  // check if loading is true before destructuring objects
  // in order not to destructure null object
  if (loading || !coin || !coinMarketData) {
    return <ActivityIndicator size="large" />;
  }

  // const {
  //   image: { small },
  //   name,
  //   symbol,
  //   market_data: {
  //     market_cap_rank,
  //     current_price,
  //     price_change_percentage_24h,
  //   },
  // } = coin;

  // const { prices } = coinMarketData;

  const changeCoinValue = (value) => {
    setCoinValue(value);

    const floatValue = parseFloat(value) || 0;
    setUsdValue((floatValue * coin?.market_price?.current_price.usd).toString());
  };

  const changeUsdValue = (value) => {
    setUsdValue(value);

    const floatValue = parseFloat(value) || 0;
    setCoinValue(
      (floatValue / coin?.market_data?.current_price.usd).toString()
    );
  };

  const percentageColor =
    coin?.market_data?.price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";
  const chartColor =
    coin?.market_data?.current_price.usd > coinMarketData?.prices[0][1]
      ? "#16c784"
      : "#ea3943";
  const screenWidth = Dimensions.get("window").width;

  const formatCurrency = (value) => {
    "worklet";
    if (value === "") {
      return `$${coin?.market_data?.current_price.usd.toFixed(2)}`;
    }
    return `$${parseFloat(value).toFixed(2)}`;
  };

  return (
    <View style={styles.coinDetailed}>
      <ChartPathProvider
        data={{
          points: coinMarketData?.prices.map((price) => ({ x: price[0], y: price[1] })),
          smoothingStrategy: "bezier",
        }}
      >
        <CoinDetailHeader
          coinId={coin?.id}
          small={coin?.image?.small}
          symbol={coin?.symbol}
          market_cap_rank={coin?.market_data?.market_cap_rank}
        />
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.name}>{coin?.name}</Text>
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
              name={
                coin?.market_data?.price_change_percentage_24h < 0
                  ? "caretdown"
                  : "caretup"
              }
              size={12}
              color={"white"}
              style={{ alignSelf: "center", marginRight: 5 }}
            />
            <Text style={styles.priceChangePercentage}>
              {coin?.market_data?.price_change_percentage_24h.toFixed(2)}%
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
              {coin?.symbol.toUpperCase()}
            </Text>
            <TextInput
              style={styles.input}
              value={coinValue?.toString()}
              keyboardType="numeric"
              onChangeText={changeCoinValue}
            />
          </View>

          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>USD</Text>
            <TextInput
              style={styles.input}
              value={usdValue?.toString()}
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
  coinDetailed: {
    paddingHorizontal: 10,
    backgroundColor: "#121212",
    flex: 1,
  },
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
