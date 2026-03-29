
// {
//   "dependencies": {
//     "@expo/vector-icons": "^15.0.3",
//     "react-native-paper": "4.9.2",
//     "@react-navigation/native": "^6.1.9",
//     "@react-navigation/native-stack": "^6.9.17",
//     "react-native-screens": "~3.29.0",
//     "react-native-safe-area-context": "4.8.2"
//   }
// }


import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

const ContactsContext = React.createContext();

function ContactsProvider({ children }) {
  const [contacts, setContacts] = React.useState([
    { id: '1', name: 'Иван Петров', phone: '+7 (999) 123-45-67', email: 'ivan@mail.ru' },
    { id: '2', name: 'Мария Сидорова', phone: '+7 (999) 765-43-21', email: 'maria@gmail.com' },
  ]);

  const addContact = (contact) => {
    setContacts((prev) => [...prev, { ...contact, id: Date.now().toString() }]);
  };

  const value = React.useMemo(() => ({ contacts, addContact }), [contacts]);

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
}

function useContacts() {
  const ctx = React.useContext(ContactsContext);
  if (!ctx) {
    throw new Error('useContacts must be used within ContactsProvider');
  }
  return ctx;
}

function ContactListScreen({ navigation }) {
  const { contacts } = useContacts();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('ContactDetail', { contact: item })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.phone}>{item.phone}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>Нет контактов. Добавьте первый!</Text>
        }
      />
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('AddContact')}
      >
        <Text style={styles.fabText}>+ Добавить контакт</Text>
      </TouchableOpacity>
    </View>
  );
}

// ==== Экран добавления контакта ====
function AddContactScreen({ navigation }) {
  const { addContact } = useContacts();
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Ошибка', 'Введите имя контакта');
      return;
    }
    addContact({
      name: name.trim(),
      phone: phone.trim() || '—',
      email: email.trim() || '—',
    });
    setName('');
    setPhone('');
    setEmail('');
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={navigation.goBack}
        activeOpacity={0.7}
      >
        <Text style={styles.backButtonText}>← Назад</Text>
      </TouchableOpacity>

      <View style={styles.form}>
        <Text style={styles.label}>Имя *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Введите имя"
          placeholderTextColor="#94a3b8"
        />

        <Text style={styles.label}>Телефон</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="+7 (999) 123-45-67"
          placeholderTextColor="#94a3b8"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="email@example.com"
          placeholderTextColor="#94a3b8"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleSave} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Сохранить контакт</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// ==== Экран просмотра контакта ====
function ContactDetailScreen({ route, navigation }) {
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
      <TouchableOpacity
        style={styles.backButton}
        onPress={navigation.goBack}
        activeOpacity={0.7}
      >
        <Text style={styles.backButtonText}>← Назад</Text>
      </TouchableOpacity>

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

// ==== Корневой компонент App (без внешней навигации, всё в одном файле) ====
export default function App() {
  const [screen, setScreen] = React.useState('list'); // 'list' | 'add' | 'detail'
  const [selectedContact, setSelectedContact] = React.useState(null);

  const listNavigation = {
    navigate: (target, params) => {
      if (target === 'AddContact') {
        setScreen('add');
      }
      if (target === 'ContactDetail' && params?.contact) {
        setSelectedContact(params.contact);
        setScreen('detail');
      }
    },
  };

  const addNavigation = {
    goBack: () => setScreen('list'),
  };

  const detailNavigation = {
    goBack: () => setScreen('list'),
  };

  const detailRoute = { params: { contact: selectedContact } };

  return (
    <ContactsProvider>
      {screen === 'list' && <ContactListScreen navigation={listNavigation} />}
      {screen === 'add' && <AddContactScreen navigation={addNavigation} />}
      {screen === 'detail' && (
        <ContactDetailScreen route={detailRoute} navigation={detailNavigation} />
      )}
    </ContactsProvider>
  );
}

// ==== Стили ====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 16,
    paddingTop: 50,
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  phone: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  empty: {
    textAlign: 'center',
    color: '#94a3b8',
    marginTop: 32,
    fontSize: 16,
  },
  fab: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  fabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  form: {
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
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1e293b',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
  value: {
    fontSize: 18,
    color: '#1e293b',
    marginTop: 4,
  },
  backButton: {
    marginBottom: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#2563eb',
  },
});