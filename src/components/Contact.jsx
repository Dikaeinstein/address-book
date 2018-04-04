import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import ModalForm from './ModalForm';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleDelete() {
    this.props.onDelete(this.props.id);
  }

  handleUpdate(contact) {
    const updatedContact = Object.assign({}, contact, { id: this.props.id });
    this.props.onUpdate(updatedContact);
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <a
            className="card-link"
            data-toggle="collapse"
            href={`#collapse${this.props.name + this.props.id}`}
            role="button"
          >
            {this.props.name}
          </a>
        </div>
        <div
          id={`collapse${this.props.name + this.props.id}`}
          className="collapse"
          data-parent="#accordion"
        >
          <div className="card-body">
            <p className="text-center font-weight-bold">Contact Details</p>
            <p>Phone Number: {this.props.phoneNumber}</p>
            <p>Email: {this.props.email}</p>
            <p>Address: {this.props.address}</p>
            <Button
              value="Delete"
              btnClassList="btn btn-danger mr-2"
              onClick={this.handleDelete}
            />
            <Button
              value="Edit"
              btnClassList="btn btn-default"
              data-toggle="modal"
              data-target={`#editContact${this.props.id}`}
            />
            <ModalForm
              name={`editContact${this.props.id}`}
              type="Edit"
              onSubmit={this.handleUpdate}
              onClick={this.handleDelete}
              phoneNumber={this.props.phoneNumber}
              email={this.props.email}
              address={this.props.address}
              contactname={this.props.name}
            />
          </div>
        </div>
      </div>
    );
  }
}

Contact.defaultProps = {
  email: '-',
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  email: PropTypes.string,
  address: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Contact;
