import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import CoinItem from "../../components/CoinItem";
import { getMarketData } from "../../services/requests";

const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async (pageNumber) => {
    if (loading) {
      return;
    }

    setLoading(true);

    const coinsData = await getMarketData(pageNumber)
    // prevent it from overwriting when fetching next page
    // concatenate existing data and new ones!
    setCoins((existingCoins) => ([...existingCoins, ...coinsData]));
    setLoading(false);
  }

  useEffect(() => {
    fetchCoins()
  }, []);

  // refresh data
  const refetchCoins = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    getMarketData().then((coinsData) => {
      setCoins(coinsData);
      setLoading(false);
    });
  };

  // this makes FlatList re-rendered whenever data is re-fetched
  // if (loading || !coins) {
  //   return <ActivityIndicator size="large" />;
  // }

  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinItem marketCoin={item} />}
      keyExtractor={(props, index) => props.id + "-" + index}
      onEndReached={() => fetchCoins((coins.length / 50) + 1)}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor="white"
          onRefresh={refetchCoins}
        />
      }
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
