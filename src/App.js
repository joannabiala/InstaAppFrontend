import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import MainPage from "./main/MainPage";
import Register from "./main/Register";
import Logging from "./main/Logging";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/login">
            <Logging />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

