/**
 * Лабораторная работа № 15. Основные компоненты React Native
 * Экран с тремя и более основными компонентами (Рисунки 6–7).
 * Все используемые объекты импортированы из 'react-native'.
 */
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  Image,
  Button,
  Alert,
} from 'react-native';
import React, { useState } from 'react';

// Данные для первого экрана: направления в избранное
const FAVORITE_ROUTES = [
  { id: '1', route: 'London-Helsinki', date: 'February 18', color: '#C62828' },
  { id: '2', route: 'Moscow-Beijing', date: 'March 5', color: '#1565C0' },
  { id: '3', route: 'Paris-Berlin', date: 'December 12', color: '#263238' },
];

// Данные для второго экрана: статусы рейсов
const FLIGHT_STATUSES = [
  { id: '1', label: 'Flight cancelled', color: '#C62828' },
  { id: '2', label: 'Delayed', color: '#4FC3F7' },
  { id: '3', label: 'Waiting', color: '#5D4037' },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [email, setEmail] = useState('');

  const handleGotIt = () => {
    Alert.alert(
      'Спасибо!',
      'Yandex.Flights будет держать вас в курсе цен и статусов рейсов.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const page = Math.round(
            e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
          );
          setCurrentPage(page);
        }}
      >
        {/* Экран 1: Get the best prices (Рисунок 6) */}
        <View style={styles.screen}>
          <Text style={styles.title}>Get the best prices</Text>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              {FAVORITE_ROUTES.map((item) => (
                <View
                  key={item.id}
                  style={[styles.routeCard, { backgroundColor: item.color }]}
                >
                  <View style={styles.routeCardContent}>
                    <Text style={styles.routeText}>{item.route}</Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                  <Text style={styles.star}>★</Text>
                </View>
              ))}
            </View>
          </View>
          <Text style={styles.hint}>
            Add the destinations you like to your Favorites. Yandex.Flights will
            notify you when prices change.
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Your email for notifications"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <View style={styles.pagination}>
            {[0, 1].map((i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === currentPage ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>
          <View style={styles.buttonWrap}>
            <Button title="Got it, thanks" onPress={handleGotIt} color="#F9A825" />
          </View>
        </View>

        {/* Экран 2: Stay informed (Рисунок 7) */}
        <View style={styles.screen}>
          <Text style={styles.title}>Stay informed</Text>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              {FLIGHT_STATUSES.map((item, index) => (
                <View
                  key={item.id}
                  style={[
                    styles.statusBubble,
                    { backgroundColor: item.color },
                    index === 0 && styles.bubbleTopLeft,
                    index === 1 && styles.bubbleTopRight,
                    index === 2 && styles.bubbleBottomRight,
                  ]}
                >
                  <Text style={styles.statusText}>{item.label}</Text>
                </View>
              ))}
              <Image
                source={{
                  uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}
                style={styles.planeImage}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={styles.hint}>
            Yandex.Flights will inform you via push notifications if your flight
            is delayed or cancelled.
          </Text>
          <View style={styles.pagination}>
            {[0, 1].map((i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === currentPage ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>
          <View style={styles.buttonWrap}>
            <Button title="Got it, thanks" onPress={handleGotIt} color="#F9A825" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  screen: {
    width: 360,
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
    marginBottom: 24,
    textAlign: 'center',
  },
  circleContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#F5F5DC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  routeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 4,
    width: '100%',
    minWidth: 200,
  },
  routeCardContent: {
    flex: 1,
  },
  routeText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  dateText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    marginTop: 2,
  },
  star: {
    color: '#FFB74D',
    fontSize: 18,
    marginLeft: 8,
  },
  planeImage: {
    width: 64,
    height: 64,
    position: 'absolute',
  },
  statusBubble: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    position: 'absolute',
  },
  bubbleTopLeft: {
    top: 16,
    left: 16,
  },
  bubbleTopRight: {
    top: 16,
    right: 16,
  },
  bubbleBottomRight: {
    bottom: 16,
    right: 16,
  },
  statusText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  hint: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    width: '100%',
    maxWidth: 320,
    marginBottom: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: '#F9A825',
  },
  dotInactive: {
    backgroundColor: '#BDBDBD',
  },
  buttonWrap: {
    minWidth: 200,
  },
});
