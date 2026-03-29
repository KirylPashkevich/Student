import * as React from 'react';

export const ContactsContext = React.createContext({
  contacts: [],
  addContact: () => {},
});

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = React.useState([
    { id: '1', name: 'Иван Петров', phone: '+7 (999) 123-45-67', email: 'ivan@mail.ru' },
    { id: '2', name: 'Мария Сидорова', phone: '+7 (999) 765-43-21', email: 'maria@gmail.com' },
  ]);

  const addContact = React.useCallback((contact) => {
    setContacts((prev) => [...prev, { ...contact, id: Date.now().toString() }]);
  }, []);

  const value = React.useMemo(() => ({ contacts, addContact }), [contacts, addContact]);

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  const context = React.useContext(ContactsContext);
  if (!context) {
    throw new Error('useContacts must be used within ContactsProvider');
  }
  return context;
}
