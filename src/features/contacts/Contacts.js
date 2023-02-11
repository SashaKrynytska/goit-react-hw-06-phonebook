import { ContactsList } from './ContactsList';
import { CreateContact } from './Form/Form';
import ContactsFilter from 'features/contacts/ContactsFilter';
import { Section } from 'features/contacts/Section/Section';
import { useSelector } from 'react-redux';
import { selectContacts } from './redux/selector';

export const ContactsPage = () => {
  const contacts = useSelector(selectContacts);
  return (
    <>
      <Section title="Phonebook">
        {contacts.length > 0 && (
          <h1>Congrats, you have {contacts.length} contacts!</h1>
        )}
        <CreateContact />
      </Section>
      <Section title="Contacts">
        <ContactsFilter />
        <ContactsList />
      </Section>
    </>
  );
};
