Лабораторная работа 14  
Автор: Kiryl Pashkevich  
Email: pakir2005@gmail.com

### Коротко теория

- **Фиксированные размеры**: ставим в стиле компонента числовые `width` и `height` (например, `width: 200, height: 100`).
- **Гибкие размеры (flex)**: свойство `flex` в стиле говорит, какую долю доступного пространства займёт элемент среди соседей с тем же родителем.
- **Проценты (`'50%'`, `'30%'` и т.п.)**: задаём долю от размеров родителя, у родителя при этом должны быть известные/фиксированные размеры.

Ниже приведен пример экрана, который демонстрирует **фиксированные**, **flex** и **процентные** размеры.

---

### Пример приложения React Native (Lab 14)

В файле `App.js`:

```javascript
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
          <Text style={styles.text}>flex: 1</Text>
        </View>
        <View style={[styles.flexBox, { backgroundColor: '#9999ff' }]}>
          <Text style={styles.text}>flex: 2</Text>
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

  // 3. Процентные размеры
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
```

Этот экран показывает:

- сверху — блок с **фиксированными** `width` и `height`;
- по центру — строку с несколькими блоками, размеченными по **flex**;
- снизу — блок с **процентной шириной**.

Все требуемые приемы (фиксированные, гибкие и процентные размеры) в примере присутствуют.

---

### Ответы на вопросы для контроля

1. **Как сделать объекты фиксированной ширины и длины?**  
   Задать в стиле компонента свойства `width` и `height` с **числовыми значениями** (например, `width: 200, height: 100`), без строк и без `"px"`.

2. **Что используется, чтобы компонент динамически расширялся и сжимался?**  
   Свойство **`flex`** в стиле компонента (`flex: 1`, `flex: 2` и т.п.).

3. **Для чего используются процентные значения в стиле компонента?**  
   Чтобы компонент занимал **определённую долю размеров родителя** (например, половину ширины экрана: `width: '50%'`), когда не хочется или неудобно использовать `flex`.

4. **Что будет, если у родителя нет фиксированного `width` и `height` при использовании процентов?**  
   Процентные значения считаются **от размеров родителя**, поэтому если у родителя нет заданных размеров (они не определены или зависят от содержимого), то дочерний элемент с `%` может рассчитываться некорректно (часто высота окажется равной содержимому или 0, а ожидаемого "процентного" эффекта не будет).  
