import PropTypes from 'prop-types';
import React, {Component} from 'react';

class ContactForm extends Component {

  state = {
    name: '',
    number: '',
  };

    handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  onHendleSubmit = (event) => {
    this.props.handleSubmit(event)
    this.reset()

  }

    reset = () => {
    this.setState({ name: '', number: ''})
  };

  render() {
    // закоментував для прикладу
    // const { handleSubmit, onReset } = this.props
    
    return (
      <div>
      <form
        onSubmit={
          this.onHendleSubmit
        }
      >
        <label>
          Імя{' '}
          <input
            type="text"
            value={this.state.name}
            onChange={
             this.handleChange
            }
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label>
          Номер{' '}
          <input
            type="tel"
            value={this.state.number}
            onChange={
              this.handleChange
            }
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button type="submit">Add contact</button>
      </form>
    </div>
  )
}
}

ContactForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default ContactForm;