import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.items.push(action.payload);
      //   return {
      //     ...state,
      //     contacts: [...state.contacts, action.payload],
      //   };
    },
    deleteContact: (state, action) => {
      //   return {
      // ...state,
      // contacts: state.contacts.filter(
      //   contact => contact.id !== action.payload),
      // але оскільки за нас повернення іммутабельного стейту робить іммер, ми мутуємо стейт:
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, setFilter } = contactsSlice.actions;

export default contactsSlice.reducer;
