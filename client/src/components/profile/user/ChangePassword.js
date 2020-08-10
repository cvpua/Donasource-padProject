import React, { Component } from "react";

class ChangePassword extends Component {
  //TODO: check if valid user
  //TODO: check if matching new passwords
  //FIXME: input change
  render() {
    return (
      <div className="changeHolder">
        <form className="changePassword">
          <input className="editProf" type="oldPassword" placeholder="Enter old password" />
          <br />
          <input className="editProf" type="newPassword" placeholder="Enter new password" />
          <br />
          <input className="editProf" type="confirmPassword" placeholder="Re-enter new password" />
          <br />
          <button className="butSub" type="submit">Confirm</button>
        </form>
      </div>
    );
  }
}

export default ChangePassword;
