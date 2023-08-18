import { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar
} from "react-native";

import uuid from "react-native-uuid";
import { ExpenseList } from "./components";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const expenseRef = useRef();
  const amountRef = useRef();

  const getData = async () => {
    try {
      const previousExpenses = await AsyncStorage.getItem("expenses");
      return previousExpenses != null ? JSON.parse(previousExpenses) : null;
    } catch (e) {
      // error reading value
      console.log("Error occured while fetching expenses");
    }
  };

  const storeData = async (value) => {
    try {
      const allExpenses = await getData();
      if (allExpenses !== null) {
        // value previously stored
        // await AsyncStorage.setItem("my-key", jsonValue);
        console.log("Old Expenses:", allExpenses);
        allExpenses.push(value);
        await AsyncStorage.setItem("expenses", JSON.stringify(allExpenses));
        setExpenses(allExpenses);
        
      } else {
        const newExpenses = [];
        const expenses = JSON.stringify([...newExpenses, value]);
        console.log("New Expenses:", expenses);
        await AsyncStorage.setItem("expenses", expenses);
      }
    } catch (e) {
      // saving error
      console.log("Error occured while saving expenses");
    }
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
      // const allExpenses = await getData();
      // if (allExpenses === null) {
      //   setExpenses([]);
      // }
    } catch(e) {
      // clear error
      console.log("Error occured while clearing expenses")
    }
  
    console.log('Expenses cleared successfully!')
  }

  const handleSubmit = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const min = new Date().getMinutes();
    const sec = new Date().getSeconds();
    const currentDate = `${date}/${month}/${year} ${hours}:${min}:${sec}`;
    storeData({ id: uuid.v4(), date: currentDate, expense, amount });
    setExpense("");
    setAmount("");
    expenseRef.current.clear();
    amountRef.current.clear();
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setExpenses(data);
    }

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          gap: 20,
          marginTop: 30,
        }}
      >
        <Text
          style={{
            color: "purple",
            fontWeight: "bold",
            fontSize: 25,
            textAlign: "center",
          }}
        >
          Expense Tracker
        </Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter your expense"
          onChangeText={(text) => setExpense(text)}
          onClear={() => setExpense("")}
          ref={expenseRef}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Enter your Amount"
          onChangeText={(text) => setAmount(text)}
          ref={amountRef}
          keyboardType="number-pad"
        />
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!(expense && amount)}
          style={styles.button}
        >
          <Text style={{ color: "#ffffff", fontSize: 18, fontWeight: "700" }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 20,
          width: "100%",
          flex: 1,
        }}
      >
        <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 10, alignItems: 'center'}}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
          Expenses
        </Text>
        <TouchableOpacity style={{backgroundColor: "red", paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10}} onPress={clearAll}><Text style={{color: "#fff", fontWeight: 'bold', fontSize: 18}}>Clear</Text></TouchableOpacity>
        </View>
        <ExpenseList expenses={expenses} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  inputBox: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "purple",
    padding: 15,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
