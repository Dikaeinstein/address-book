import React, { Component } from 'react';
import uuidV1 from 'uuid/v1';
import Title from './Title';
import ContactList from './ContactList';
import Button from './Button';
import ModalForm from './ModalForm';
import ErrorMessage from './ErrorMessage';
import storageAvailable from '../lib/storageAvailable';

class AddressBook extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      error: null,
    };
    this.getContacts = this.getContacts.bind(this);
    this.addContact = this.addContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.updateContact = this.updateContact.bind(this);
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
      const contacts = this.state.contacts.map(cont => cont.phoneNumber);
      // checks to make sure contact does not already exists
      if (!contacts.includes(contact.phoneNumber)) {
        contacts.push(Object.assign({}, contact, { id: uuidV1() }));
        this.setState({ contacts });
        localStorage.setItem('_dikaeinstein_contacts', JSON.stringify(contacts));
      } else {
        this.setState({ error: 'Contact already exists.'});
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

  render() {
    return (
      <div>
        <Title title="Address Book" />
        <main className="container">
          <h2 className="m-3">A Simple Address Book</h2>
          {this.state.error ?
            <ErrorMessage message={this.state.error} /> : null}
          <ContactList
            contacts={this.state.contacts}
            onDelete={this.deleteContact}
            onUpdate={this.updateContact}
          />
          <Button
            value="Add Contact"
            btnClassList="btn btn-primary mt-4"
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
