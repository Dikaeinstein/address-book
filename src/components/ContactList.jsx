import React from 'react';
import PropTypes from 'prop-types';
import Contact from './Contact';

const ContactList = (props) => {
  const contactNodes = props.contacts.map(contact => (
    <Contact
      key={contact.id}
      id={contact.id}
      name={contact.name}
      phoneNumber={contact.phoneNumber}
      email={contact.email}
      address={contact.address}
      onDelete={props.onDelete}
      onUpdate={props.onUpdate}
    />
  ));

  return (
    <div className="accordion">
      {contactNodes}
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ContactList;
