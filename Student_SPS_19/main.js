// App.js (Задание 1)
import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    if (!name || !age) {
      setResult("Пожалуйста, заполните все поля.");
      return;
    }
    setResult(`Здравствуйте, ${name}! Вам ${age} лет.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Лабораторная 19 — Задание 1</Text>

      <View style={styles.block}>
        <Text style={styles.label}>Введите ваше имя:</Text>
        <TextInput
          style={styles.input}
          placeholder="Имя"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.block}>
        <Text style={styles.label}>Введите ваш возраст:</Text>
        <TextInput
          style={styles.input}
          placeholder="Возраст"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Показать приветствие" onPress={handleSubmit} />
      </View>

      {result.length > 0 && (
        <View style={styles.resultBlock}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  block: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "white",
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  resultBlock: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#e3f2fd",
  },
  resultText: {
    fontSize: 16,
  },
});