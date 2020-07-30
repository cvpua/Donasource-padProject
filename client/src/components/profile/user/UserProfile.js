import React, { Component } from "react";
import EditProfile from "./EditProfile";
import  "./Profile.css"

//TODO: must get from the database
// FIXME: birthdate of the user?
const INIT_STATE = {
  id: "sample1",
  username: "user1",
  photo: null,
  name: {
    fname: "Jeff Emerson",
    lname: "Lar",
  },
  location: "Los Banos, Laguna",
  email: "idcruz@up.edu.ph",
  contact: "09487621698",
  donations: 56,
  requests: 40,
  bio: "Iskolar ng Bayan || YSES || ELBI || tarashot || boss mapagmahalzxczxczxczxcz",
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
      // photo,
      edit,
    } = this.state;

    return (
      <div className="profile">
        <div className="aboveProfile">
          <div className="headerHolder">
            <div className="leftHolder">
              <div className="photoHolder"> 
                <img className="photo" src="https://cdn57.androidauthority.net/wp-content/uploads/2020/02/eevee-pokemon-go-1200x822.jpg" alt="pic" />  
              </div>
            </div>
            <div className="rightHolder">
              <div className="names">
                <div className="displayName">{name.fname + " " + name.lname} </div>
                <div className="userName">@{username}</div>  
              </div>
              <div className="editHolder">
                <button className="edit" onClick={this.editProfile}>
                  Edit Profile
                </button>
                {edit ? <EditProfile /> : null}
              </div>
              <div className="credibility">
                  <div className="donations"> {donations} <br/> Donations Given </div>
                  <div className="donationsB"> {requests} <br/> Donations Requested </div>
              </div>
            </div>
          </div>
          <div className="info">
            <div className="intel">{location}</div>
            <div className="intel" id="mid">{email}</div>
            <div className="intel">{contact}</div>
          </div>
          <div className="bio">{bio}</div>
        </div>
        <div className="profileContent">
          Dito lalagay mga donation at request na nagawa niya na
        </div>
      </div>
    );
  }
}

export default UserProfile;
