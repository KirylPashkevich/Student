import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Foundation } from '@expo/vector-icons';

export default function App() {
  const [mode, setMode] = useState('login'); // 'login' или 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const isLogin = mode === 'login';

  const handleSubmit = () => {
    if (!email || !password || (!isLogin && !passwordRepeat)) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля.');
      return;
    }

    if (!isLogin && password !== passwordRepeat) {
      Alert.alert('Ошибка', 'Пароли не совпадают.');
      return;
    }

    Alert.alert(
      'Успех',
      isLogin ? 'Авторизация прошла успешно.' : 'Регистрация прошла успешно.'
    );
  };

  const toggleMode = () => {
    setMode(isLogin ? 'register' : 'login');
    setPassword('');
    setPasswordRepeat('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.logoContainer}>
        <Foundation name="torsos-all" size={64} color="#ffffff" />
        <Text style={styles.title}>
          {isLogin ? 'Экран авторизации' : 'Экран регистрации'}
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Foundation
            name="mail"
            size={20}
            color="#5a67d8"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#a0aec0"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Foundation
            name="key"
            size={20}
            color="#5a67d8"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            placeholderTextColor="#a0aec0"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {!isLogin && (
          <View style={styles.inputWrapper}>
            <Foundation
              name="key"
              size={20}
              color="#5a67d8"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Повторите пароль"
              placeholderTextColor="#a0aec0"
              secureTextEntry
              value={passwordRepeat}
              onChangeText={setPasswordRepeat}
            />
          </View>
        )}

        <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
          <Text style={styles.primaryButtonText}>
            {isLogin ? 'ВОЙТИ' : 'ЗАРЕГИСТРИРОВАТЬСЯ'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={toggleMode}>
          <Text style={styles.secondaryButtonText}>
            {isLogin
              ? 'Нет аккаунта? Зарегистрироваться'
              : 'Уже есть аккаунт? Войти'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a202c',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1,
  },
  form: {
    backgroundColor: '#2d3748',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a5568',
    borderRadius: 16,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    color: '#edf2f7',
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#667eea',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  secondaryButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#a0aec0',
    fontSize: 14,
  },
});