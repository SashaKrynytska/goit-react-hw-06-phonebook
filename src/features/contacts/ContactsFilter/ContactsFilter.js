import { useDispatch, useSelector } from 'react-redux';

import { setFilter } from '../redux/contacts.slice';
import css from './ContactsFilter.module.css';
import { selectFilter } from '../redux/selector';

const ContactsFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const onChangeFilter = filter => {
    dispatch(setFilter(filter));
  };

  return (
    <label className={css.contactsFilter}>
      Find contacts by name{' '}
      <input
        className={css.filterInput}
        type="text"
        onChange={e => onChangeFilter(e.target.value)}
        placeholder="Search contact"
        value={filter}
      />
    </label>
  );
};

export default ContactsFilter;
