import { useState, useEffect } from 'react';
import Form from './Form/Form';
import Section from './Section/Section';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import data from '../data.json';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contactsData')) ?? data;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contactsData', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    if (contacts.some(e => e.name === name)) {
      alert(`${name} is already in contacts!`);
      return;
    } else if (contacts.some(e => e.number === number)) {
      alert(`Number ${number} is already in contacts!`);
      return;
    } else {
      setContacts(prevState => [
        {
          id: nanoid(),
          name,
          number,
        },
        ...contacts,
      ]);
    }
  };

  const changeFilter = e => setFilter(e.currentTarget.value);

  const deleteContact = contactId =>
    setContacts(prevState => prevState.filter(({ id }) => id !== contactId));

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div>
      <Section title="Phonebook">
        <Form onSubmit={addContact} contacts={contacts} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={deleteContact}
        />
      </Section>
    </div>
  );
};

// // export class App extends Component {
// //   state = {
// //     contacts: [
// //       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
// //       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
// //       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
// //       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// //     ],
// //     filter: '',
// //   };

// //   componentDidMount() {
// //     const contacts = localStorage.getItem('contacts');
// //     const parsedContacts = JSON.parse(contacts);
// //     if (parsedContacts) {
// //       this.setState({ contacts: parsedContacts });
// //     }
// //   }

// //   componentDidUpdate(prevProps, prevState) {
// //     if (this.state.contacts !== prevState.contacts) {
// //       console.log('Обновилось поле Contacts, записываю contacts в хранилище');

// //       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
// //     }
// //   }

// //   addContact = ({ name, number }) => {
// //     const contact = {
// //       id: nanoid(),
// //       name,
// //       number,
// //     };

// //     if (this.state.contacts.some(e => e.name === name)) {
// //       return alert(`${name} is already in contacts!`);
// //     } else if (this.state.contacts.some(e => e.number === number)) {
// //       return alert(`Number ${number} is already in contacts!`);
// //     } else {
// //       this.setState(({ contacts }) => ({
// //         contacts: [contact, ...contacts],
// //       }));
// //     }
// //   };

// //   deleteContact = contactId =>
// //     this.setState(prevState => ({
// //       contacts: prevState.contacts.filter(({ id }) => id !== contactId),
// //     }));

// //   changeFilter = e => {
// //     this.setState({ filter: e.currentTarget.value });
// //   };

// //   getFilteredContacts = () => {
// //     const { contacts, filter } = this.state;

// //     const normalizedFilter = filter.toLowerCase();
// //     return contacts.filter(contact =>
// //       contact.name.toLowerCase().includes(normalizedFilter)
// //     );
// //   };

// //   render() {
// //     const { filter } = this.state;

// //     return (
// //       <div>
// //         <Section title="Phonebook">
// //           <Form onSubmit={this.addContact} contacts={this.state.contacts} />
// //         </Section>
// //         <Section title="Contacts">
// //           <Filter value={filter} onChange={this.changeFilter} />
// //           <ContactList
// //             contacts={this.getFilteredContacts()}
// //             onDeleteContact={this.deleteContact}
// //           />
// //         </Section>
// //       </div>
// //     );
// //   }
// // }
