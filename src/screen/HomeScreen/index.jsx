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

    const coinsData = await getMarketData(pageNumber);
    // prevent it from overwriting when fetching next page
    // concatenate existing data and new ones!
    setCoins((existingCoins) => [...existingCoins, ...coinsData]);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
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
    <View>
      <Text
        style={{
          color: "white",
          fontSize: 25,
          letterSpacing: 1,
          paddingHorizontal: 20,
          paddingBottom: 5,
          fontFamily: "Inter_900Black",
        }}
      >
        Cryptoassets
      </Text>
      <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        keyExtractor={(props, index) => props.id + "-" + index}
        onEndReached={() => fetchCoins(coins.length / 50 + 1)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="white"
            onRefresh={refetchCoins}
          />
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
