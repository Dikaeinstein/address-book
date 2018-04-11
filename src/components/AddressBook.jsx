import React, { Component } from 'react';
import uuidV1 from 'uuid/v1';
import Title from './Title';
import ContactList from './ContactList';
import Button from './Button';
import ModalForm from './ModalForm';
import ErrorMessage from './ErrorMessage';
import SearchBox from './SearchBox';
import storageAvailable from '../lib/storageAvailable';

class AddressBook extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      error: null,
      searchTerm: '',
    };
    this.getContacts = this.getContacts.bind(this);
    this.addContact = this.addContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.updateContact = this.updateContact.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getContacts();
  }

  getContacts() {
    if (storageAvailable('localStorage')) {
      const contacts = JSON.parse(localStorage.getItem('_dikaeinstein_contacts')) || [];
      this.setState({ contacts });
    }
  }

  addContact(contact) {
    if (storageAvailable('localStorage')) {
      // map from array of contact objects to array of contact phone numbers
      const contactsPhoneNumbers = this.state.contacts.map(cont => cont.phoneNumber);
      // checks to make sure contact does not already exists
      if (!contactsPhoneNumbers.includes(contact.phoneNumber)) {
        const contacts = this.state.contacts.slice();
        contacts.push(Object.assign({}, contact, { id: uuidV1() }));
        this.setState({ contacts });
        localStorage.setItem('_dikaeinstein_contacts', JSON.stringify(contacts));
      } else {
        this.setState({ error: 'Contact already exists.' });
      }
    }
  }

  updateContact(contact) {
    if (storageAvailable('localStorage')) {
      const { contacts } = this.state;
      const index = contacts.findIndex(oldContact => oldContact.id === contact.id);
      contacts.splice(index, 1, contact);
      this.setState({ contacts });
      localStorage.setItem('_dikaeinstein_contacts', JSON.stringify(contacts));
    }
  }

  deleteContact(id) {
    if (storageAvailable('localStorage')) {
      const filteredContacts = this.state.contacts.filter(contact => (
        contact.id !== id
      ));
      this.setState({ contacts: filteredContacts });
      localStorage.setItem('_dikaeinstein_contacts', JSON.stringify(filteredContacts));
    }
  }

  searchContacts(searchString) {
    const contacts = this.state.contacts.slice();
    const filteredContacts = contacts.filter(contact => (
      contact.name.toLowerCase().includes(searchString.toLowerCase())
    ));
    this.setState({ contacts: filteredContacts });
  }

  handleChange(event) {
    const { value } = event.target;
    if (value === '') {
      this.setState({ searchTerm: '' });
      this.getContacts();
    } else {
      this.setState({ searchTerm: value });
      this.searchContacts(this.state.searchTerm);
    }
  }

  render() {
    return (
      <div>
        <Title title="Address Book" />
        <main className="container">
          <div className="row">
            <h2 className="col-md-6 mt-3 mb-3">Contacts</h2>
            {this.state.error ?
              <ErrorMessage message={this.state.error} /> : null}
            <SearchBox
              className="offset-md-2 col-md-4 mb-3 mt-md-3"
              value={this.state.searchTerm}
              onChange={this.handleChange}
            />
          </div>
          <ContactList
            contacts={this.state.contacts}
            onDelete={this.deleteContact}
            onUpdate={this.updateContact}
          />
          <Button
            value="Add Contact"
            className="btn btn-primary mt-4"
            data-toggle="modal"
            data-target="#addContact"
          />
          <ModalForm name="addContact" type="Add" onSubmit={this.addContact} />
        </main>
      </div>
    );
  }
}

export default AddressBook;
