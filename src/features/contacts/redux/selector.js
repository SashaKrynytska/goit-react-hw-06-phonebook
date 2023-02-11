export const selectContacts = state => state.contacts.items;
export const selectFilter = state => state.contacts.filter;

export const selectFilteredContacts = state => {
  const normalizedFilter = selectFilter(state).toLowerCase();

  return selectContacts(state).filter(contact => {
    return contact.name.toLowerCase().includes(normalizedFilter);
  });
};
