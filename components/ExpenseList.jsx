import React from "react";
import { ScrollView, Text } from "react-native";
import Expense from "./Expense";

function ExpenseList({ expenses }) {
  return (
    <ScrollView contentContainerStyle={{ gap: 10 }}>
      {expenses.length === 0 ? (
        <Text style={{ color: "red", textAlign: "center" }}>
          No Expenses available at the moment
        </Text>
      ) : (
        [...expenses].reverse().map((expense) => {
          return <Expense key={expense.id} data={expense} />;
        })
      )}
    </ScrollView>
  );
}

export default ExpenseList;
