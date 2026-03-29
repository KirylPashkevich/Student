### Пример решения (React Native / Snack)

Ниже пример простого «журнального» экрана с использованием стилей и массивов стилей (как в примере из задания). В Snack откройте `https://snack.expo.dev`, создайте новый проект и замените содержимое `App.js` этим кодом:

```javascript
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.logo}>BRIGHT</Text>

      <Text style={styles.title}>Весеннее настроение</Text>
      <Text style={styles.subtitle}>Как встретить новый сезон ярко</Text>

      <Image
        style={styles.image}
        source={{
          uri: 'https://images.pexels.com/photos/1545202/pexels-photo-1545202.jpeg?auto=compress&cs=tinysrgb&w=800',
        }}
      />

      <Text style={styles.paragraph}>
        Весна — лучшее время, чтобы обновить не только гардероб, но и своё
        настроение. Яркие акценты в одежде, лёгкий макияж и несколько простых
        ритуалов помогут почувствовать себя увереннее каждый день.
      </Text>

      <Text style={[styles.paragraph, styles.paragraphAccent]}>
        Добавьте в образ один доминирующий цвет — он может быть в пальто,
        сумке или аксессуарах. Такой приём сразу делает образ продуманным и
        завершённым.
      </Text>

      <Text style={styles.paragraph}>
        Не забывайте и про внутренний комфорт. Короткая прогулка без телефона,
        чашка любимого напитка и 10 минут тишины — маленькие привычки, которые
        работают лучше любых модных тенденций.
      </Text>

      <View style={styles.tagsRow}>
        <Text style={[styles.tag, styles.tagPrimary]}>Мода</Text>
        <Text style={[styles.tag, styles.tagOutline]}>Стиль жизни</Text>
        <Text style={[styles.tag, styles.tagOutline]}>Психология</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Читать далее</Text>
      </TouchableOpacity>

      <View style={styles.exampleBlock}>
        <Text style={styles.exampleTitle}>Пример комбинирования стилей:</Text>
        <Text style={styles.red}>just red</Text>
        <Text style={styles.bigBlue}>just bigBlue</Text>
        <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
        <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#fdfdfd',
  },
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 6,
    color: '#111',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
    marginBottom: 12,
  },
  paragraphAccent: {
    fontWeight: 'bold',
    color: '#e91e63',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    marginBottom: 20,
  },
  tag: {
    fontSize: 13,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagPrimary: {
    backgroundColor: '#111',
    color: '#fff',
  },
  tagOutline: {
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#555',
  },
  button: {
    backgroundColor: '#e91e63',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  exampleBlock: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  exampleTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20,
  },
  red: {
    color: 'red',
  },
});
```

Текст внутри параграфов можно заменить на любой нейтральный контент (без персональных данных и чужих авторских пометок). После этого загрузите проект в свой GitHub-репозиторий.

---

### Ответы на вопросы для контроля

1. **Аналоги тегов HTML в React Native**:  
   - `<div>` → `View`  
   - `<p>` → `Text`  
   - `<img>` → `Image`  
   - `<button>` → `Button` (или чаще `TouchableOpacity` / `Pressable` + `Text`).

2. **С помощью чего стилизуется приложение?**  
   - С помощью пропа `style`, которому передаётся объект стилей JavaScript (обычно созданный через `StyleSheet.create({...})`), либо массив таких объектов.

3. **Какая запись правильная?**  
   - Правильная запись в React Native: **`backgroundColor`** (верблюжий регистр), а не `background-color`.

4. **Что такое тип стиля в React Native?**  
   - Это объект JavaScript, описывающий набор свойств оформления (цвет, размеры, отступы и т.п.), допустимых для конкретного компонента и передаваемый в его проп `style` (в TypeScript это, например, `ViewStyle`, `TextStyle`, `ImageStyle`).