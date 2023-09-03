import React from "react";
import mailImage from "../assets/mail.svg";
import TopNav from "../Components/TopNav";

export default function Home() {
  return (
    <div>
      <TopNav />
      <div className="cover">
        <div className="container">
          <div className="columns">
            <div className="column is-9">
              <div>
                <div className="is-hidden-mobile" style={{ fontSize: "4.5em" }}>
                  It's all about improving your business reputation
                </div>
                <div
                  className="container is-hidden-desktop"
                  style={{ fontSize: "3em" }}
                >
                  It's all about improving your Business Reputation
                </div>
              </div>
              <div className="mt-6">
                <div className="is-size-3">
                  Send emails with your domain name
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="/mail"
                  className="button is-large is-primary is-outlined"
                >
                  Get started
                </a>
              </div>
            </div>
            <div className="is-3">
              <div>
                <br />
              </div>
              <div>
                <img src={mailImage} alt="Emails" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
