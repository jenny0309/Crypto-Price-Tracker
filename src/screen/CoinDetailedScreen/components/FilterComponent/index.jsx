import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FilterComponent = ({ filterDay, filterText }) => {
  return (
    <View>
      <Text style={{ color: "white" }}>{filterText}</Text>
    </View>
  );
};

export default FilterComponent;

const styles = StyleSheet.create({});
