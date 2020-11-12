import React, {useState} from "react";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import './Style.css';
import './MainStyle.css';

const Logging = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)


  const handleSubmit = (event) => {

    axios.post("http://localhost:8000/login/",
      JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    ).then((response) => {
      console.log(response)
      setRedirect(true);
    }).catch(error => {
      console.log("login error", error);
      alert("Blad w trakcie logowania")
    });
    event.preventDefault();
  }


  require('./Style.css');
  require('./MainStyle.css');


  if (redirect) {
    return <Redirect to="/mainpageforloggedin"/>;
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light sticky-top" id="mainNav">
        <div className="container">
          <a className="navbar-brand js-scroll-trigger" href="/">WhiteWall</a>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <i className="fas fa-bars"/>
          </button>
          <div className="collapse navbar-collapse"
               id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <div className="btn-group">
                <Link to="/register" className="btn bg-primary light">Kliknij do rejestracji</Link>
                <Link to="/login" className="btn bg-primary light">Kliknij do logowania</Link>
              </div>
            </ul>
          </div>
        </div>
      </nav>

      <div className="base-container center form-group d-flex justify-content-center">
        <div className="container register-form flex-column">
          <div className="form">
            <div className="form-content">
              <div className="row">
                <div className="col-md-6 mx-auto">
                  <p>Zaloguj się do WhiteWall'a</p>
                  <div className="form-group">
                    <label id="username"/>
                    <input
                      type="username"
                      name="username"
                      placeholder="Nazwa użytkownika *"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <div className="form-group">
                      <label id="password"/>
                      <input
                        type="password"
                        name="password"
                        placeholder="Hasło *"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-auto">
                    <button type="button" className="btnSubmit" onClick={handleSubmit}>
                      Zaloguj się
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logging;