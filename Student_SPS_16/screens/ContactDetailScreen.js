import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ContactDetailScreen({ route }) {
  const { contact } = route.params || {};

  if (!contact) {
    return (
      <View style={styles.container}>
        <Text style={styles.value}>Контакт не найден</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Имя</Text>
        <Text style={styles.value}>{contact.name}</Text>
        <Text style={styles.label}>Телефон</Text>
        <Text style={styles.value}>{contact.phone}</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{contact.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 16,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 18,
    color: '#1e293b',
    marginTop: 4,
  },
});
