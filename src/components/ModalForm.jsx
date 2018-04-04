import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Get a reference to modalDialog after component mount
    this.modalDialog = window.$(this.modal);
  }

  handleSubmit(e) {
    e.preventDefault();

    // extract values from textboxes
    const {
      contactName,
      contactPhoneNumber,
      contactEmail,
      contactAddress,
    } = e.target;

    const name = contactName.value.trim();
    const email = contactEmail.value.trim();
    const phoneNumber = contactPhoneNumber.value.trim();
    const address = contactAddress.value.trim();

    // Name and Phone number is required
    if (!name || !phoneNumber) {
      return;
    }

    this.props.onSubmit({
      name,
      email,
      phoneNumber,
      address,
    });

    // reset textboxes to empty fields
    contactName.value = '';
    contactPhoneNumber.value = '';
    contactEmail.value = '';
    contactAddress.value = '';

    // Hide modal dialog after save
    this.modalDialog.modal('hide');
  }

  render() {
    return (
      <div
        className="modal fade"
        id={this.props.name}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={this.props.name}
        aria-hidden="true"
        ref={(div) => { this.modal = div; }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${this.props.name}Label`}>{this.props.type} Contact</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contactName" className="col-form-label">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={this.props.contactname}
                    id="contactName"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactPhoneNumber" className="col-form-label">Phone Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={this.props.phoneNumber}
                    id="contactPhoneNumber"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactEmail" className="col-form-label">Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={this.props.email}
                    id="contactEmail"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactAddress" className="col-form-label">Address:</label>
                  <textarea
                    className="form-control"
                    defaultValue={this.props.address}
                    id="contactAddress"
                  />
                </div>
                <button type="submit" className="btn btn-primary mr-2">{this.props.type}</button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ModalForm.defaultProps = {
  contactname: '',
  email: '',
  address: '',
  phoneNumber: '',
};

ModalForm.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  contactname: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.string,
  phoneNumber: PropTypes.string,
};

export default ModalForm;
