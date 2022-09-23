import PropTypes from 'prop-types';

const ContactList = ({ contactsList, deleteContact }) => {
  // console.log(addContacts);
  return (
    <div>
      <ul>
        {contactsList().map(({ id, name, number }) => (
            <li key={id}>
                <p>{name}: {number}</p>
                
            <button onClick={() => deleteContact(id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contactsList: PropTypes.func,
  deleteContact: PropTypes.func,
};

export default ContactList;
