import React, { Component } from "react";

import ChangePassword from "./ChangePassword";

class EditProfile extends Component {
  // TODO: get props from user, to display in the form
  // TODO: placeholders for the inputs OR (set INIT_STATE)
  //FIXME: input change
  state = {
    changePass: false,
  };

  // TODO: function that returns the new data into the server

  changePassword = () => {
    this.setState({
      changePass: !this.state.changePass,
    });
  };

  render() {
    return (
      <div className="editingHolder">
        <form className="editForm">
          <input type="text" placeholder="user name" />
          <br />
          <input type="text" placeholder="first name" />
          <input type="text" placeholder="last name" />
          <br />
          <input type="text" placeholder="location" />
          <br />
          <input type="text" placeholder="email" />
          <br />
          <input type="text" placeholder="contact number" />
          <br />
          {/* TODO: bigger text box */}
          <input type="text" placeholder="bio" />
          <br />
          <button type="submit">Confirm</button>
        </form>
        <div className="changePassHolder">
          <button className="edit" onClick={this.changePassword}>
            Change Password
          </button>
          {this.state.changePass ? <ChangePassword /> : null}
        </div>
      </div>
    );
  }
}

export default EditProfile;
