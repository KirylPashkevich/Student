import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Добро пожаловать',
    description: 'Лабораторная №17: анимация в React Native.',
    image: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
  },
  {
    id: '2',
    title: 'Учись анимации',
    description: 'Используй Animated.Value, timing, interpolate и т.д.',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
  },
  {
    id: '3',
    title: 'Создавай интерфейсы',
    description: 'Добавь красивые welcome‑экраны и лаучскрин.',
    image: 'https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg',
  },
];

const FadeInView = ({ children, style }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[style, { opacity: fadeAnim }]}>
      {children}
    </Animated.View>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const splashOpacity = useRef(new Animated.Value(1)).current;
  const splashScale = useRef(new Animated.Value(1)).current;

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  useEffect(() => {
    // Анимация лаучскрина
    Animated.sequence([
      Animated.parallel([
        Animated.timing(splashScale, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(splashOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(splashScale, {
          toValue: 0.8,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(splashOpacity, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setShowSplash(false);
    });
  }, [splashOpacity, splashScale]);

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    // Параллакс / масштаб
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [-50, 0, 50],
      extrapolate: 'clamp',
    });

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });

    const borderRadius = scrollX.interpolate({
      inputRange,
      outputRange: [40, 20, 40],
      extrapolate: 'clamp',
    });

    return (
      <View style={{ width, alignItems: 'center', paddingTop: 80 }}>
        <Animated.Image
          source={{ uri: item.image }}
          style={[
            styles.image,
            {
              transform: [{ translateX }, { scale }],
              borderRadius,
            },
          ]}
          resizeMode="cover"
        />
        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.slideText}>{item.description}</Text>
      </View>
    );
  };

  const handleStart = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: SLIDES.length - 1, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      {/* Основной контент слайдера */}
      <View style={styles.topContainer}>
        <Animated.FlatList
          ref={flatListRef}
          data={SLIDES}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        />
        {/* Индикаторы страниц */}
        <View style={styles.dotsContainer}>
          {SLIDES.map((_, i) => {
            const inputRange = [
              (i - 1) * width,
              i * width,
              (i + 1) * width,
            ];

            const dotOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const dotScale = scrollX.interpolate({
              inputRange,
              outputRange: [1, 1.4, 1],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={i.toString()}
                style={[
                  styles.dot,
                  {
                    opacity: dotOpacity,
                    transform: [{ scale: dotScale }],
                  },
                ]}
              />
            );
          })}
        </View>
      </View>

      {/* Дополнительные компоненты welcome‑экрана */}
      <FadeInView style={styles.bottomContainer}>
        <Text style={styles.welcomeTitle}>Kiryl Pashkevich - SPS 17</Text>
        <Text style={styles.welcomeText}>
          Это пример для лабораторной работы №17.
          Изучи код, поэкспериментируй с длительностью и типами анимаций.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Начать</Text>
        </TouchableOpacity>
      </FadeInView>

      {/* Анимированный лаучскрин поверх всего */}
      {showSplash && (
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            styles.splashOverlay,
            {
              opacity: splashOpacity,
              transform: [{ scale: splashScale }],
            },
          ]}
        >
          <Text style={styles.splashLogo}>SSP 17</Text>
          <Text style={styles.splashSubtitle}>React Native Animation</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617', // почти чёрный
  },
  topContainer: {
    flex: 3,
  },
  bottomContainer: {
    flex: 2,
    paddingHorizontal: 24,
    paddingBottom: 32,
    justifyContent: 'flex-start',
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
  },
  slideTitle: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  slideText: {
    marginTop: 8,
    fontSize: 14,
    color: '#e5e7eb',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
    backgroundColor: '#6366f1',
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 14,
    color: '#9ca3af',
    lineHeight: 20,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  splashOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#020617',
  },
  splashLogo: {
    fontSize: 42,
    fontWeight: '800',
    color: 'white',
    letterSpacing: 4,
  },
  splashSubtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#a5b4fc',
  },
});