import React, {Component} from 'react';
import Notiflix from 'notiflix';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';


class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'))
    if (contacts) {
      this.setState({
        contacts
      })
    }
  }


  handleSubmit = event => {
    event.preventDefault()
    
     const name = event.currentTarget.elements.name.value;
    const number = event.currentTarget.elements.number.value;

    const normalizedName = name.toLowerCase();
    
    const some = this.state.contacts.some(
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


    this.setState(prev => ({
      contacts: [...prev.contacts, dataContacts],
    }));

  }
  
  changeFilter = event => {
      this.setState({ filter: event.currentTarget.value });
    };

  filterContact = () => {
    if (this.state.filter === '') {
      return this.state.contacts;
    } else {
      const { contacts, filter } = this.state;

      const normalizedFilter = filter.toLowerCase();

      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    }
  }

    deleteContact = id => {
      this.setState(prevState => ({
        contacts: prevState.contacts.filter(contact => contact.id !== id)
      }));
  };
  

  

    render() {
      return (
        <div style={{
          display: "flex",
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          
          <h1>Phonebook</h1>
          <ContactForm
            handleSubmit={this.handleSubmit}
          />
          <h2>Contacts</h2>
          <Filter filterContact={this.changeFilter} />
          <ContactList
            contactsList={this.filterContact}
            deleteContact={this.deleteContact}
          />
        </div>
      );
    }
  }

export default App;