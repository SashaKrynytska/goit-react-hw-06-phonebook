import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from './redux/contacts.slice';
import PropTypes from 'prop-types';
import { selectFilteredContacts } from './redux/selector';

export const ContactsList = () => {
  const filteredContacts = useSelector(selectFilteredContacts); //(state => state.contacts.contacts);
  //   const [name, setName] = useState('');
  //   const [number, setNumber] = useState('');
  console.log(filteredContacts);
  const dispatch = useDispatch();

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id} id={id} name={name} number={number}>
          <span>
            {name}: {number}
          </span>
          <button onClick={() => onDeleteContact(id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactsList;
