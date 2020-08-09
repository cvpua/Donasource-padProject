import React, { Component } from "react";
import EditProfile from "./EditProfile";

//TODO: must get from the database
//TODO: function that gets user data and verification of the user
// FIXME: birthdate of the user?
const INIT_STATE = {
  id: "sample1",
  username: "user1",
  password: "password",
  photo: null,
  name: {
    fname: "Isko",
    lname: "de la Cruz",
  },
  location: "Los Banos, Laguna",
  email: "idcruz@up.edu.ph",
  contact: "09487621698",
  donations: 56,
  requests: 40,
  bio: "Iskolar ng Bayan",
  edit: false,
}; //must check validity

class UserProfile extends Component {
  state = INIT_STATE;

  editProfile = () => {
    this.setState({
      ...this.state,
      edit: !this.state.edit,
    });
  };

  render() {
    const {
      username,
      name,
      location,
      email,
      bio,
      contact,
      donations,
      requests,
      photo,
      edit,
    } = this.state;

    return (
      <div className="mainProfile">
        <div className="photoHolder">
          {/* CONTAINER FOR PICTURE*/}
          <img src="https://img.icons8.com/dotty/80/000000/name.png" />
        </div>
        <div className="displayName">{name.fname + " " + name.lname}</div>
        <div className="userName">{username}</div>
        <div className="location">{location}</div>
        <div className="email">{email}</div>
        <div className="contact">{contact}</div>
        <div className="bio">{bio}</div>
        <div className="credibility">
          <div className="donations">
            <div className="given">Donations Given: {donations}</div>
            <div className="request">Donations Requested: {requests}</div>
          </div>
        </div>
        <div className="editHolder">
          <button className="edit" onClick={this.editProfile}>
            Edit Profile
          </button>
          {edit ? <EditProfile credentials={this.state} /> : null}
        </div>
      </div>
    );
  }
}

export default UserProfile;
