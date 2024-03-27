import { useState, useEffect } from 'react';
import { ContactForm } from './contactForm.jsx';
import { ContactList } from './contactList.jsx';
import { SearchBox } from './searchBox.jsx';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    return savedContacts || initialContacts;
  });
  const [filter, setFilter] = useState('');
  const [duplicateError, setDuplicateError] = useState(false);
  
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const handleAddContact = newContact => {
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isDuplicate) {
      setDuplicateError(true);
    } else {
      setContacts(prevContacts => [...prevContacts, newContact]);
      setDuplicateError(false);
    }
  };

  const handleDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = filter
    ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : contacts;


  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmitContact={handleAddContact} />
      {duplicateError && (
        <p style={{ color: 'red' }}>
          Contact with the same name already exists!
        </p>
      )}
      <SearchBox value={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};