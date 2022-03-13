import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useWatchList } from "../../../../contexts/WatchListContext";

import { Ionicons, EvilIcons } from "@expo/vector-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const CoinDetailHeader = (props) => {
  const { coinId, small, symbol, market_cap_rank } = props;

  const navigation = useNavigation();
  const { watchListCoinIds, storeWatchListCoinId, removeWatchListCoinId } = useWatchList();

  const checkIfCoinIsWatchListed = () =>
    watchListCoinIds.some((coinIdValue) => coinIdValue === coinId);
  
  const handleWatchListCoin = () => {
    if (checkIfCoinIsWatchListed()) {
      return removeWatchListCoinId(coinId)
    }
    return storeWatchListCoinId(coinId)
  }

  return (
    <View style={styles.headerContainer}>
      <Ionicons
        name="chevron-back-sharp"
        size={30}
        color="white"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.tickerContainer}>
        <Image source={{ uri: small }} style={{ width: 25, height: 25 }} />
        <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
        <View style={styles.rankContainer}>
          <Text style={styles.tickerRank}>#{market_cap_rank}</Text>
        </View>
      </View>
      {/* <EvilIcons name="user" size={30} color="white" /> */}
      <MaterialIcons
        name={checkIfCoinIsWatchListed() ? "favorite" : "favorite-outline"}
        color="white"
        size={25}
        onPress={handleWatchListCoin}
      />
    </View>
  );
};

export default CoinDetailHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  tickerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tickerTitle: {
    color: "white",
    fontWeight: "bold",
    marginHorizontal: 5,
    fontSize: 17,
  },
  rankContainer: {
    backgroundColor: "#585858",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  tickerRank: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});
