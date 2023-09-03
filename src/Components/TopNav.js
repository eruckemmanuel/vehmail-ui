import React from "react";

export default function TopNav() {
  return (
    <nav className="navbar is-primary is-fixed-top main-nav">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item is-size-4" href="/">
            Vehmail
          </a>
          <div className="navbar-burger" data-target="vehtask-nav">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="vehtask-nav" className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item"></div>
          </div>

          <div className="navbar-end is-hidden-mobile">
            <div className="navbar-item">
              <a
                href="/auth/user/login/?next=/mail/"
                className="button is-primary"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
