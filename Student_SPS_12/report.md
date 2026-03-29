### Что нужно сделать по лабораторной

#### 1. Expo Snack + телефон

1. Откройте сайт `https://snack.expo.dev/` (раньше был `snack.expo.io`).
2. На телефоне установите приложение **Expo Go** из Google Play / App Store.
3. В браузере на Snack:
   - Создайте новый проект (**Create Snack**).
   - Справа появится QR‑код.
4. Откройте Expo Go на телефоне и отсканируйте QR‑код.
   - Приложение из Snack запустится на вашем устройстве.

#### 2. Компонент «Hello World»

В файле `App.js` (или `App.tsx`, если TypeScript) на Snack напишите, например, так (стрелочная функция):

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Hello World</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
```

Можно вместо этого сделать класс‑компонент, если требуют именно класс.

#### 3. Загрузка программы на GitHub в репозиторий `Student`

Для сдачи работы достаточно загрузить файлы лабораторной в отдельную папку `Student_SPS_12` внутри репозитория:

1. `Student_SPS_12/main.js`
2. `Student_SPS_12/report.md`

После загрузки проверьте, что структура отображается на GitHub корректно и файлы открываются без ошибок.

---

### Ответы на вопросы для контроля

#### 1. Можно ли писать в React Native всё на JS?

**Почти всё — да, но не абсолютно всё.**  
Обычное приложение на React Native (логика, интерфейс, навигация) пишется на JavaScript (или TypeScript).  
Однако для доступа к некоторым специфическим возможностям устройства или для очень производительных модулей иногда пишут **нативные модули** на Java/Kotlin (Android) и Objective‑C/Swift (iOS), которые потом вызываются из JS.

#### 2. Есть ли в React Native объект кнопка?

**Да.**  
В React Native есть компонент `Button` из пакета `react-native`, а также более гибкие варианты: `Pressable`, `TouchableOpacity`, `TouchableHighlight` и т.д. Они играют роль «кнопок» в интерфейсе.

#### 3. Что можно делать на React Native?

**На React Native можно разрабатывать кроссплатформенные мобильные приложения** для:
- Android и iOS (основной сценарий);
- использовать почти все стандартные мобильные возможности: камера, геолокация, сенсоры, работа с сетью, push-уведомления, файловая система и т.д.;
- с дополнительными библиотеками — выводить приложение и на web/desktop, но базовый фокус именно на мобильных платформах.

#### 4. В чём разница между React и React Native?

- **React** — это JavaScript‑библиотека для построения UI, в первую очередь в **браузере**, где он рендерит в **DOM** (через HTML‑теги типа `div`, `span` и т.п.).
- **React Native** — использует ту же идею (компоненты, состояние, пропсы), но вместо DOM рендерит **нативные элементы платформы** (виджеты Android/iOS), используя компоненты `View`, `Text`, `Image` и т.п.
- В React вы пишете JSX c HTML‑подобными тегами и стилями через CSS, а в React Native — JSX с собственными компонентами и стилями через объекты JS и Flexbox.
