# Лабораторная работа № 15. Основные компоненты React Native

**Цель работы:** получить навыки работы с основными компонентами в React Native.
  
**Автор:** Kiryl Pashkevich  
**Email:** pakir2005@gmail.com

## Запуск проекта

```bash
npm install
npm start
```

В другом терминале:
- Android: `npm run android`
- iOS: `npm run ios`

## Реализация

- **Экран 1 (Рисунок 6):** «Get the best prices» — карточки направлений (London–Helsinki, Moscow–Beijing, Paris–Berlin) с датами и звёздочками, пояснительный текст, поле ввода email, индикаторы страниц, кнопка «Got it, thanks».
- **Экран 2 (Рисунок 7):** «Stay informed» — круг с иллюстрацией и пузырьками статусов (Flight cancelled, Delayed, Waiting), пояснительный текст, индикаторы страниц, кнопка «Got it, thanks».

Используемые компоненты из `react-native`: `StyleSheet`, `Text`, `SafeAreaView`, `ScrollView`, `View`, `TextInput`, `Image`, `Button`, `Alert`.

## Вопросы для контроля

1. **Какой компонент является базовым?**  
   **View** — самый базовый компонент для построения интерфейса.

2. **Какой компонент является пользовательским?**  
   **Button** и **Switch** — компоненты пользовательского интерфейса (отображаются на любой платформе).

3. **Какой компонент предоставляет оболочки для часто используемых классов Android?**  
   Компоненты в разделе «Android компоненты и API»: **BackHandler**, **DrawerLayoutAndroid**, **PermissionsAndroid**, **ToastAndroid**.

4. **Что является представлением списка?**  
   **FlatList** и **SectionList** — компоненты представления списка (рендерят только видимые элементы).

## Репозиторий

Проект размещен в репозитории **Student** в папке **Student_SPS_15**.
