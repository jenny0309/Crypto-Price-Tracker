import React, { useContext, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WatchListContext = createContext();

// custom hook
export const useWatchList = () => useContext(WatchListContext);

const WatchListProvider = ({ children }) => {
  const [watchListCoinIds, setWatchListCoinIds] = useState([]);

  const getWatchListData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@watchlist_coins");
      setWatchListCoinIds(jsonValue !== null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.log(e);
    }
  };

  const storeWatchListCoinId = async (coinId) => {
    try {
      const newWatchList = [...watchListCoinIds, coinId];
      const jsonValue = JSON.stringify(newWatchList);
      // store jsonValue in AsyncStorage with storage key of watchlist_coins
      await AsyncStorage.setItem("@watchlist_coins", jsonValue);
      setWatchListCoinIds(newWatchList);
    } catch (e) {
      console.log(e);
    }
  };

  const removeWatchListCoinId = async (coinId) => {
    const newWatchList = watchListCoinIds.filter(
      (coinIdValue) => coinIdValue !== coinId
    );
    const jsonValue = JSON.stringify(newWatchList);
    await AsyncStorage.setItem("@watchlist_coins", jsonValue);
    setWatchListCoinIds(newWatchList);
  };

  useEffect(() => {
    getWatchListData();
  }, []);

  return (
    <WatchListContext.Provider
      value={{ watchListCoinIds, storeWatchListCoinId, removeWatchListCoinId }}
    >
      {children}
    </WatchListContext.Provider>
  );
};

export default WatchListProvider;
