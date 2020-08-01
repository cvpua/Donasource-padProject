import React, { Component } from "react";

import ChangePassword from "./ChangePassword";

class EditProfile extends Component {
  // TODO: get props from user, to display in the form
  // TODO: placeholders for the inputs OR (set INIT_STATE)
  //FIXME: input change
  state = {
    changePass: false,
    username: null,
    fname: null,
    lname: null,
    location: null,
    email: null,
    contact: null,
    bio: null,
  };

  // TODO: function that returns the new data into the server

  handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  changePasswordToggle = () => {
    this.setState({
      changePass: !this.state.changePass,
    });
  };

  render() {
    const userData = this.props.credentials;

    return (
      <div className="editingHolder">
        {/* TODO: editing profile photo */}
        <form className="editForm">
          <input
            type="text"
            placeholder="user name"
            name="username"
            onChange={this.handleFormChange}
          />
          <br />
          <input
            type="text"
            placeholder="first name"
            name="fname"
            onChange={this.handleFormChange}
          />
          <input
            type="text"
            placeholder="last name"
            name="lname"
            onChange={this.handleFormChange}
          />
          <br />
          <input
            type="text"
            placeholder="location"
            name="location"
            onChange={this.handleFormChange}
          />
          <br />
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={this.handleFormChange}
          />
          <br />
          <input
            type="text"
            placeholder="contact number"
            name="contact"
            onChange={this.handleFormChange}
          />
          <br />
          {/* TODO: bigger text box for front end*/}
          <input
            type="text"
            placeholder="bio"
            name="bio"
            onChange={this.handleFormChange}
          />
          <br />
          <button type="submit">Confirm</button>
        </form>
        <div className="changePassHolder">
          <button className="edit" onClick={this.changePasswordToggle}>
            Change Password
          </button>
          {this.state.changePass ? (
            <ChangePassword verify={(userData.password, userData.email)} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default EditProfile;
