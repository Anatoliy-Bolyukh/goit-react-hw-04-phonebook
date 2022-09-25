import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';


function App() {
  const [filter, setFilter] = useState('')


  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );

  

///------------handleSubmit-----------///
   
  const handleSubmit = event => {
    event.preventDefault()

    const name = event.currentTarget.elements.name.value
    const number = event.currentTarget.elements.number.value
    

    const normalizedName = name.toLowerCase();
    
    const some = contacts.some(
      contact => contact.name.toLowerCase() === normalizedName
    )
  
    if (some) {
      return Notiflix.Notify.failure(`${name}  is already in contacts`);

    }

    const dataContacts = {
      id: nanoid(),
      name,
      number,
    }

    setContacts(prev =>  [...prev, dataContacts] );

  }
  
  ///-----------------------------///
  
  const changeFilter = event => setFilter(event.target.value );

  const filterContact = () => {
    if (filter === '') {
      return contacts;
    } else {
      // const { contacts, filter } = this.state;

      const normalizedFilter = filter.toLowerCase();

      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    }
  }

  const deleteContact = id => setContacts(prevState => prevState.filter(contact => contact.id !== id));
  
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  })
  
      return (
        <div style={{
          display: "flex",
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          
          <h1>Phonebook</h1>
          <ContactForm
            handleSubmit={handleSubmit}
          />
          <h2>Contacts</h2>
          <Filter filterContact={changeFilter} />
          <ContactList
            contactsList={filterContact}
            deleteContact={deleteContact}
          />
        </div>
      );
}
    
export default App;