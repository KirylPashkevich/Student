import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Фиксированный блок */}
      <View style={styles.fixedBox}>
        <Text style={styles.text}>Фиксированный блок (width/height)</Text>
      </View>

      {/* Гибкие блоки с flex */}
      <View style={styles.flexRow}>
        <View style={[styles.flexBox, { backgroundColor: '#ff9999' }]}>
          <Text style={styles.text}>flex: 1</Text>
        </View>
        <View style={[styles.flexBox, { backgroundColor: '#99ff99' }]}>
          <Text style={styles.text}>flex: 2</Text>
        </View>
        <View style={[styles.flexBox, { backgroundColor: '#9999ff' }]}>
          <Text style={styles.text}>flex: 3</Text>
        </View>
      </View>

      {/* Процентные размеры */}
      <View style={styles.percentContainer}>
        <View style={styles.percentBox}>
          <Text style={styles.text}>width: '80%'</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    paddingTop: 40,
  },

  // 1. Фиксированный размер
  fixedBox: {
    width: 250,        // фиксированная ширина
    height: 100,       // фиксированная высота
    backgroundColor: '#ffd54f',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 8,
  },

  // 2. Гибкие элементы
  flexRow: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,           // эта строка сама растягивается по высоте
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  flexBox: {
    flex: 1,           // доля пространства в строке
    marginHorizontal: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  percentContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  percentBox: {
    width: '80%',      // 80% от ширины родителя
    height: 80,
    backgroundColor: '#4fc3f7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  text: {
    color: '#000',
    textAlign: 'center',
  },
});

export default App;