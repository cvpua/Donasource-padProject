import React, { Component } from "react";
import e from "express";

class ChangePassword extends Component {
  //FIXME: using the email props for verification purposes
  render() {
    state = {
      isValidUser: false,
      isMatching: false,
      oldPass: null,
      newPass: null,
      verifyPass: null,
    };

    handleFormChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };

    //[X]TODO: check if valid user password
    verifyUser = () => {
      const { password } = this.props.verify;

      if (password === this.state.oldPass) {
        this.setState({
          isValidUser: true,
          ...this.state,
        });
      }
    };

    //[X]TODO: check if matching new passwords
    matchPassword = (event) => {
      this.verifyUser();

      const { verifyPass, newPass, isValidUser } = this.state;

      if (!isValidUser) {
        alert("Invalid user password!");
        event.preventDefault();
      } //if password from the current account is wrong

      if (verifyPass !== newPass) {
        alert("Password does not match!");
        event.preventDefault();
      } //new passwords input does not match
      else {
        this.setState({
          ...this.state,
          isMatching: true,
        });
      }
    };

    //TODO: updating database for new password
    //FIXME: accessing the objectId of the user / query via other means

    return (
      <div className="changeHolder">
        <form className="changePassword" onSubmit={this.matchPassword}>
          <input
            type="password"
            name=""
            oldPass
            placeholder="Enter old password"
            onChange={this.handleFormChange}
          />
          <br />
          <input
            type="password"
            name="newPass"
            placeholder="Enter new password"
            onChange={this.handleFormChange}
          />
          <br />
          <input
            type="password"
            name="verifyPass"
            placeholder="Re-enter new password"
            onChange={this.handleFormChange}
          />
          <br />
          <button type="submit">Confirm</button>
        </form>
      </div>
    );
  }
}

export default ChangePassword;
