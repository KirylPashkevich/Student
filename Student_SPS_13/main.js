import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      {/* Шапка */}
      <View style={styles.header}>
        <Text style={styles.logo}>BRIGHT</Text>
        <Text style={styles.logoAccent}>MAGAZINE</Text>
      </View>

      {/* Основной блок статьи */}
      <View style={styles.card}>
        <Image
          style={styles.heroImage}
          source={{
            uri: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
          }}
        />

        <View style={styles.badgeRow}>
          <Text style={[styles.badge, styles.badgePrimary]}>Lifestyle</Text>
          <Text style={[styles.badge, styles.badgeSecondary]}>Bright Choice</Text>
        </View>

        <Text style={styles.title}>
          Как добавить яркости в повседневную жизнь
        </Text>

        <Text style={styles.subtitle}>
          Идеи из мира моды, путешествий и вдохновения от редакции Bright
          Magazine.
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaAuthor}>Учебный демонстрационный материал</Text>
          <Text style={styles.metaDate}>Март 2026</Text>
        </View>

        {/* Первый раздел */}
        <Text style={styles.sectionTitle}>Цвет как способ настроения</Text>
        <Text style={styles.paragraph}>
          Яркие акценты в одежде, интерьере и даже в заметках на телефоне помогают
          по‑новому взглянуть на рутину. Начните с малого: добавьте одну деталь
          насыщенного цвета в привычный образ. Это может быть шарф, блокнот или
          чехол для телефона.
        </Text>

        <Text style={styles.paragraph}>
          Стилисты Bright Magazine советуют сочетать нейтральные базовые вещи с
          одной «говорящей» деталью: красными кроссовками, яркой сумкой или
          крупным украшением. Такой прием выглядит современно и помогает
          подчеркнуть индивидуальность.
        </Text>

        {/* Второй раздел */}
        <Text style={styles.sectionTitle}>Маленькие путешествия по городу</Text>
        <Text style={styles.paragraph}>
          Необязательно уезжать далеко, чтобы почувствовать вдохновение. Выберите
          новый район, музей или кофейню, где вы еще не были. Сделайте «яркий
          маршрут» выходного дня: отметьте на карте 3–4 места и пройдитесь пешком,
          наблюдая за деталями.
        </Text>

        <Text style={styles.quote}>
          «Яркие впечатления рождаются там, где вы позволяете себе посмотреть на
          привычные вещи под другим углом».
        </Text>

        {/* Третий раздел */}
        <Text style={styles.sectionTitle}>Личные ритуалы вдохновения</Text>
        <Text style={styles.paragraph}>
          Утренний дневник, ароматный чай вечером или подборка любимой музыки —
          простые ритуалы помогают структурировать день и добавляют ощущение
          заботы о себе. Запишите три действия, которые приносят вам удовольствие,
          и попробуйте встроить их в расписание на неделю.
        </Text>

        {/* Имитация примера со стилями из задания */}
        <View style={styles.stylesDemo}>
          <Text style={styles.demoLabel}>Демонстрация комбинации стилей:</Text>
          <Text style={styles.red}>just red</Text>
          <Text style={styles.bigBlue}>just bigBlue</Text>
          <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
          <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
        </View>

        {/* Кнопка внизу карточки */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Читать больше</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logo: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 4,
    color: '#f97316',
  },
  logoAccent: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
    color: '#e5e7eb',
  },
  card: {
    backgroundColor: '#020617',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 6,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '600',
    marginRight: 8,
  },
  badgePrimary: {
    backgroundColor: '#f97316',
    color: '#020617',
  },
  badgeSecondary: {
    backgroundColor: '#0ea5e9',
    color: '#020617',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#e5e7eb',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metaAuthor: {
    fontSize: 12,
    color: '#9ca3af',
  },
  metaDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f97316',
    marginTop: 8,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: '#e5e7eb',
    marginBottom: 8,
  },
  quote: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
    color: '#facc15',
    borderLeftWidth: 3,
    borderLeftColor: '#facc15',
    paddingLeft: 10,
    marginVertical: 12,
  },
  stylesDemo: {
    marginTop: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  demoLabel: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 8,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20,
  },
  red: {
    color: 'red',
    fontSize: 16,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#f97316',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
  },
  buttonText: {
    color: '#020617',
    fontWeight: '700',
    fontSize: 14,
  },
  footerCard: {
    marginTop: 20,
    backgroundColor: '#020617',
    borderRadius: 16,
    padding: 14,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e5e7eb',
    marginBottom: 8,
  },
  footerItem: {
    fontSize: 13,
    lineHeight: 18,
    color: '#d1d5db',
    marginBottom: 6,
  },
});

