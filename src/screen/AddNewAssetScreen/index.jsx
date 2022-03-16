import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import { useRecoilState } from "recoil";
import { allPortfolioBoughtAssetsInStorage } from "../../atoms/PortfolioAssets";
import { getAllCoins, getDetailedCoinData } from "../../services/requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";

const AddNewAssetScreen = () => {
  const navigation = useNavigation();

  const [allCoins, setAllCoins] = useState([]);
  const [boughtAssetQuantity, setBoughtAssetQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  const [selectedCoinInfo, setSelectedCoinInfo] = useState(null);

  const [assetsInStorage, setAssetsInStorage] = useRecoilState(
    allPortfolioBoughtAssetsInStorage
  );

  // console.log(selectedCoinInfo);

  useEffect(() => {
    // fetch all coins

    if (loading) {
      return;
    }

    setLoading(true);

    getAllCoins().then((coins) => {
      setAllCoins(coins);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    // fetch coin info

    if (loading) {
      return;
    }

    setLoading(true);

    if (selectedCoinId) {
      getDetailedCoinData(selectedCoinId).then((coinInfo) => {
        setSelectedCoinInfo(coinInfo);
        setLoading(false);
      });
    }
  }, [selectedCoinId]);

  // if (loading || !coins) {
  //   return <ActivityIndicator size="large" />;
  // }

  const isQuantityEntered = () => boughtAssetQuantity !== "";

  const onAddNewAsset = async () => {
    const newAsset = {
      id: selectedCoinInfo.id,
      name: selectedCoinInfo.name,
      image: selectedCoinInfo.image.small,
      ticker: selectedCoinInfo.symbol.toUpperCase(),
      quantityBought: parseFloat(boughtAssetQuantity),
      priceBought: selectedCoinInfo.market_data.current_price.usd,
    };

    const newAssets = [...assetsInStorage, newAsset];
    const jsonValue = JSON.stringify(newAssets);
    await AsyncStorage.setItem("@portfolio_coins", jsonValue);
    setAssetsInStorage(newAssets);

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchableDropdown
        items={allCoins}
        onItemSelect={(coin) => setSelectedCoinId(coin.id)}
        containerStyle={styles.containerStyle}
        itemStyle={styles.itemStyle}
        itemTextStyle={{ color: "white" }}
        resetValue={false}
        placeholder={selectedCoinId || "Select a coin..."}
        placeholderTextColor="white"
        textInputProps={{
          underlineColorAndroid: "transparent",
          style: styles.textInputPropsStyle,
        }}
      />
      {selectedCoinId && (
        <>
          <View style={styles.boughtQuantityContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                value={boughtAssetQuantity}
                onChangeText={setBoughtAssetQuantity}
                placeholder="0"
                keyboardType="numeric"
                style={{ color: "white", fontSize: 90 }}
              />
              <Text style={styles.ticker}>
                {selectedCoinInfo?.symbol.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.pricePerCoin}>
              ${selectedCoinInfo?.market_data.current_price.usd} per coin
            </Text>
          </View>
          <TouchableOpacity
            style={{
              ...styles.buttonContainer,
              backgroundColor: !isQuantityEntered() ? "#303030" : "#4169e1",
            }}
            onPress={onAddNewAsset}
            disabled={!isQuantityEntered()}
          >
            <Text
              style={{
                ...styles.buttonText,
                color: !isQuantityEntered() ? "gray" : "white",
              }}
            >
              Add New Asset
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default AddNewAssetScreen;

const styles = StyleSheet.create({
  containerStyle: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  itemStyle: {
    padding: 10,
    marginTop: 2,
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#444444",
    borderRadius: 5,
  },
  textInputPropsStyle: {
    padding: 12,
    borderWidth: 1.5,
    borderColor: "#444444",
    borderRadius: 5,
    backgroundColor: "#1e1e1e",
    color: "white",
  },
  ticker: {
    color: "gray",
    fontWeight: "700",
    fontSize: 20,
    // marginTop: 25,
    marginLeft: 5,
  },
  boughtQuantityContainer: {
    alignItems: "center",
    marginTop: 50,
    // backgroundColor: "green"
    flex: 1,
  },
  buttonContainer: {
    // backgroundColor: "#4169E1",
    width: "95%",
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 25,
    // position: "absolute",
    bottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "center",
  },
  pricePerCoin: {
    color: "gray",
    fontWeight: "600",
    fontSize: 17,
    letterSpacing: 0.5,
  },
});
