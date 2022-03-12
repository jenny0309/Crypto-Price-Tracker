import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useWatchList } from "../../contexts/WatchListContext";

const WatchListScreen = () => {
  // 1. use "useContext" hook
  // const wishList = useContext(WatchListContext);
  // const { value } = wishList;
  // console.log(value);

  // 2. use custom hook
  const watchList = useWatchList();
  const { watchListCoinIds } = watchList;
  console.log(watchListCoinIds);

  return (
    <View>
      <Text style={{ color: "white" }}>WatchListScreen</Text>
    </View>
  );
};

export default WatchListScreen;

const styles = StyleSheet.create({});
