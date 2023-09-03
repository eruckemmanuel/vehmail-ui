import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "../axios/axios";
import { Layout, Card } from "antd";
import Sidebar from "../Components/Sidebar";
import Lists from "../Components/Lists";
import MessageThreads from "../Components/MessageThreads";

const { Content } = Layout;

const Inbox = () => {
  const token = localStorage.getItem("token");

  const [mails, setMails] = useState([]);
  const [messages, setMessages] = useState([]);

  console.log(messages);

  const handleClick = (messages) => {
    setMessages(messages);
  };

  useEffect(() => {
    if (messages) {
      messages.forEach((msg) => {
        const shadowRoot = document
          .getElementById(msg.message_id)
          .attachShadow({ mode: "open" });
        shadowRoot.innerHTML = msg.text_html[0] || msg.text_plain[0];
      });
    }
  }, [messages]);

  useEffect(() => {
    axios
      .get("/api/v1/mail/?page=12", {
        headers: {
          Authorization: "Token " + token,
        },
      })
      .then((response) => {
        setMails(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (token === null) {
    return <Redirect to="/login" />;
  } else {
    return (
      <>
        <Layout style={{ minHeight: "100vh" }}>
          <Layout className="site-layout">
            <Sidebar defaultKey={"1"} />
            <Content
              style={{
                padding: "0 10px",
                width: "20vw",
                height: "100vh",
                paddingBottom: "50px",
                scrollbarWidth: "none",
                backgroundColor: "#fff",
              }}
            >
              <>
                <div
                  className="nav-bar"
                  style={{
                    backgroundColor: "#fff",
                    position: "fixed",
                    zIndex: "160",
                  }}
                >
                  <div className="">
                    <span style={{ fontSize: 16 }}>Inbox</span>
                  </div>
                </div>
              </>
              <Lists inbox={mails} handleClick={handleClick} />
            </Content>

            <Content
              style={{
                width: "60vw",
                height: "100vh",
                scrollbarWidth: "none",
                padding: "25px",
              }}
            >
              {messages && messages.length > 0 && (
                <div>
                  <div
                    className="nav-bar"
                    style={{
                      backgroundColor: "#fff",
                      position: "fixed",
                      top: "40px",
                      zIndex: "160",
                      borderLeft: "1px solid #e8e8e8",
                    }}
                  >
                    <h4 style={{ paddingTop: "5px" }}>
                      <strong>{messages[0].subject}</strong>
                    </h4>
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <br />
                  </div>
                  <MessageThreads messages={messages} />
                </div>
              )}
            </Content>
          </Layout>
        </Layout>
      </>
    );
  }
};

export default Inbox;
