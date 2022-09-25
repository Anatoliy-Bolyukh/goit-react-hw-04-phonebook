import  {useState} from 'react';
import Notiflix from 'notiflix';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';


function App() {
   const [filter, setFilter] = useState('')
  const [contacts, setContacts] = useState(
    [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  

  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

///------------handleSubmit-----------///
   
  const handleSubmit = event => {
    event.preventDefault()
    
    //  const name = event.currentTarget.elements.name.value;
    // const number = event.currentTarget.elements.number.value;

    const [name, number] = event.currentTarget.elements.name.value;

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



  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
  //   }
  // }

  // componentDidMount() {
  //   const contacts = JSON.parse(localStorage.getItem('contacts'))
  //   if (contacts) {
  //     this.setState({
  //       contacts
  //     })
  //   }
  // }