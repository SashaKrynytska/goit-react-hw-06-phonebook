import { nanoid } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './Form.module.css';

import { addContact } from '../redux/contacts.slice';
import { selectContacts } from '../redux/selector';

export const CreateContact = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const onAddNewContact = e => {
    e.preventDefault();

    if (contacts.some(e => e.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts!`);
      return;
    }
    if (contacts.some(e => e.number === number)) {
      alert(`Number ${number} is already in contacts!`);
      return;
    }
    const newContact = { id: nanoid(), name: name, number: number };
    dispatch(addContact(newContact));
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={onAddNewContact}>
      <h3>Add a contact</h3>
      <label>
        <input
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        ></input>
      </label>

      <label>
        <input
          className={css.input}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={e => setNumber(e.target.value)}
        ></input>
      </label>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};
