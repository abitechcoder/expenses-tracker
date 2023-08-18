import React from "react";
import { Text, View } from "react-native";
import { Naira } from "react-native-naira";

function Expense({ data }) {
  return (
    <View
      style={{
        backgroundColor: "#f5f5f5",
        padding: 15,
        borderRadius: 10,
        flexDirection: "row",
      }}
    >
      <View style={{ flex: 0.8 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "purple",
            marginBottom: 10,
          }}
        >
          {data.expense}
        </Text>
        <Text>{data.date}</Text>
      </View>
      <View
        style={{
          flex: 0.2,
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "purple" }}>
          <Naira>{data.amount}</Naira>
        </Text>
      </View>
    </View>
  );
}

export default Expense;
