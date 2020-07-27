import React, { Component } from "react";

class ChangePassword extends Component {
  //TODO: check if valid user
  //TODO: check if matching new passwords
  //FIXME: input change
  render() {
    return (
      <div className="changeHolder">
        <form className="changePassword">
          <input type="oldPassword" placeholder="Enter old password" />
          <br />
          <input type="newPassword" placeholder="Enter new password" />
          <br />
          <input type="confirmPassword" placeholder="Re-enter new password" />
          <br />
          <button type="submit">Confirm</button>
        </form>
      </div>
    );
  }
}

export default ChangePassword;
