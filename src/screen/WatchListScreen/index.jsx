import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import CoinItem from "../../components/CoinItem";
import { useWatchList } from "../../contexts/WatchListContext";
import { getWatchListedCoins } from "../../services/requests";

const WatchListScreen = () => {
  // 1. use "useContext" hook
  // const wishList = useContext(WatchListContext);
  // const { value } = wishList;
  // console.log(value);

  // 2. use custom hook
  const watchList = useWatchList();
  const { watchListCoinIds } = watchList;
  // console.log(watchListCoinIds);

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  // make url string like bitcoin%2C%20ethereum%2C%20solana
  const transformCoinIds = () => watchListCoinIds.join("%2C%20");
  // console.log(transformCoinIds());

  const fetchWatchListedCoins = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    const watchListedCoinsData = await getWatchListedCoins(
      1,
      transformCoinIds()
    );
    setCoins((existingCoins) => [...existingCoins, ...watchListedCoinsData]);
    setLoading(false);
  };

  useEffect(() => {
    if (watchListCoinIds.length > 0) {
      fetchWatchListedCoins();
    }
  }, []);

  const refetchWatchListedCoins = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    const watchListedCoinsData = await getWatchListedCoins(
      1,
      transformCoinIds()
    );
    setCoins(watchListedCoinsData);
    setLoading(false);
  };

  useEffect(() => {
    refetchWatchListedCoins();
  }, [watchListCoinIds]);

  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinItem marketCoin={item} />}
      keyExtractor={(props, index) => props.id + "-" + index}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor="white"
          onRefresh={refetchWatchListedCoins}
        />
      }
    />
  );
};

export default WatchListScreen;

const styles = StyleSheet.create({});
