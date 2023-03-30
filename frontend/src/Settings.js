import React, { useState } from "react";
import "./Settings.css";
import { NavigationBar } from "./NavBar";

export function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  // const [feedback, setFeedback] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    // TODO: Send form data to server or update state
  }

  return (
    <div className="settings-container1">
      {/* Navigationbar */}
      <NavigationBar page={"user"} />
      <div className="personal-settings-container">
        <h1>Personal Settings</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              readOnly={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="avatar">Avatar:</label>
            <input type="radio" name="avatar" value="1" check="checked" />
            <img
              src="./avatar.png"
              alt="Avatar 1"
              className="avatars"
            ></img>{" "}
            &emsp;
            <input type="radio" name="avatar" value="2" />
            <img
              src="./avatar2.png"
              alt="Avatar 2"
              className="avatars"
            ></img>{" "}
            &emsp;
            <input type="radio" name="avatar" value="3" />
            <img
              src="./avatar3.jpg"
              alt="Avatar 3"
              className="avatars"
            ></img>{" "}
            &emsp;
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags:</label>
            <input type="checkbox" name="tags" value="1" />
            tag1 &emsp;
            <input type="checkbox" name="tags" value="2" />
            tag2 &emsp;
            <input type="checkbox" name="tags" value="3" />
            tag3 &emsp;
            <input type="checkbox" name="tags" value="4" />
            tag4 &emsp;
            <input type="checkbox" name="tags" value="5" />
            tag5 &emsp;
          </div>
          <div className="form-group">
            <label htmlFor="favorite visibility">Favorite visibility:</label>
            <select name="favorite visibility">
              <option value="1">all</option>
              <option value="2">only fans</option>
              <option value="3" selected="selected">
                none
              </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="global visibility">Global visibility:</label>
            <select name="global visibility">
              <option value="1" selected="selected">
                all
              </option>
              <option value="2">only fans</option>
              <option value="3">none</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="feedback">Feedback:</label>
            <textarea
              name="feedback"
              className="form-control-feedback"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          <button className="btn btn-primary" onclick={window.history.back}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
