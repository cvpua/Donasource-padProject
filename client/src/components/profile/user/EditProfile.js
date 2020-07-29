import React, { Component } from "react";
import "./EditProfile.css"
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
        <div className="popUp">
          <form className="editForm">
            <input className= "editProf" type="text" placeholder="User Name" />
            <br />
            <input className= "editProf" type="text" placeholder="First Name" />
            <input className= "editProf" type="text" placeholder="Last Name" />
            <br />
            <input className= "editProf" type="text" placeholder="Location" />
            <br />
            <input className= "editProf" type="text" placeholder="Email" />
            <br />
            <input className= "editProf" type="text" placeholder="Contact Number" />
            <br />
            {/* TODO: bigger text box */}
            <input className= "editProf" type="text" placeholder="Bio" />
            <br />
            <button className="butSub" type="submit">Confirm</button>
          </form>
          <div className="changePassHolder">
            <button className="butSub" onClick={this.changePassword}>
              Change Password
            </button>
            {this.state.changePass ? <ChangePassword /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;
