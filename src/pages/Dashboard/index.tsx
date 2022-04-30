import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackParamsList } from "../../routes/app.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { api } from "../../services/api";
export default function Dashboard() {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const [table, setTable] = useState("");

  async function onpenOrder() {
    if (table === "") {
      return;
    }
    const response = await api.post("/order", {
      table: Number(table),
    });

    //Precisa fazer requisição e navagar para outra tela
    navigation.navigate("Order", {
      number: table,
      order_id: response.data.id,
    });
    setTable("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo pedido</Text>
      <TextInput
        style={styles.input}
        placeholder="Numero da mesa"
        placeholderTextColor="#f0f0f0"
        keyboardType="numeric"
        value={table}
        onChangeText={setTable}
      />
      <TouchableOpacity onPress={onpenOrder} style={styles.button}>
        <Text style={styles.buttonText}>Abrir mesa</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#1d1d2e",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 24,
  },
  input: {
    width: "90%",
    height: 60,
    backgroundColor: "#101026",
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: "center",
    fontSize: 22,
    color: "#fff",
  },
  button: {
    width: "90%",
    height: 40,
    backgroundColor: "#3fffa3",
    marginVertical: 12,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#101026",
    fontWeight: "bold",
  },
});
