import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import "./Styles/main.scss";
import Navbar from "./Components/Navbar";
import Inbox from "./Pages/Inbox";
import Home from "./Pages/Home";
import { getCurrentUser } from "./common/auth";

function App() {
  const [ready, setReady] = useState(false);

  useEffect(async () => {
    const token = localStorage.getItem("token");
    if (!token && window.location.pathname !== "/") {
      const user = await getCurrentUser();
      if (user) {
        localStorage.setItem("token", user.token);
        localStorage.setItem("user", JSON.stringify(user));
        setReady(true);
      } else {
        window.location.assign(
          `/auth/user/login/?next=${window.location.pathname}`,
        );
      }
    } else {
      setReady(true);
    }
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        {ready && (
          <Route>
            <Navbar />
            <Redirect exact from="/mail" to="/mail/inbox" />
            <Route exact path="/mail/inbox" component={Inbox} />
          </Route>
        )}
      </Switch>
    </Router>
  );
}

export default App;
