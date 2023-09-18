import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "../axios/axios";
import { Layout, Pagination } from "antd";
import Sidebar from "../Components/Sidebar";
import Lists from "../Components/Lists";
import MessageThreads from "../Components/MessageThreads";
import Loader from "../Components/Loader";

const { Content } = Layout;

const Inbox = () => {
  const token = localStorage.getItem("token");

  const [mails, setMails] = useState({});
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);

  const handleClick = (threads) => {
    if (selectedThread === threads) {
      return;
    }

    const uuids = [];
    threads.forEach((msg) => {
      uuids.push(msg.uuid);
      msg.seen = true;
    });
    setLoadingDetails(true);
    axios
      .get(`/api/v1/messages/?thread_uuids=${uuids.join(",")}`, {
        headers: {
          Authorization: "Token " + token,
        },
      })
      .then((response) => {
        setLoadingDetails(false);
        setMessages(response.data);
        const newMailsData = mails.data.map((item) => {
          if (item === threads) {
            return threads;
          }
          return item;
        });
        setSelectedThread(threads);
        setMails({ ...mails, data: newMailsData });
      })
      .catch((err) => {
        setLoadingDetails(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (messages) {
      messages.forEach((msg) => {
        const shadowRoot = document
          .getElementById(`${msg.message_id}-${msg.uuid}-${msg.id}`)
          .attachShadow({ mode: "open" });
        shadowRoot.innerHTML = msg.text_html[0] || msg.text_plain[0];
      });
    }
  }, [messages]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/v1/mail/?page=${page}`, {
        headers: {
          Authorization: "Token " + token,
        },
      })
      .then((response) => {
        setLoading(false);
        setMails(response.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [page]);

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
                  {mails?.data?.length > 0 && (
                    <div>
                      <Pagination
                        size="small"
                        showLessItems
                        defaultPageSize={15}
                        current={mails.page_number}
                        onChange={(page) => {
                          setPage(page);
                        }}
                        total={mails.count}
                      />
                    </div>
                  )}
                  {loading && (
                    <div style={{ position: "fixed", left: "22%", top: "15%" }}>
                      <Loader height="30px" />
                    </div>
                  )}
                </div>
              </>
              {mails?.data?.length > 0 && (
                <Lists inbox={mails?.data} handleClick={handleClick} />
              )}
            </Content>

            <Content
              style={{
                width: "60vw",
                height: "100vh",
                scrollbarWidth: "none",
                padding: "25px",
              }}
            >
              {loadingDetails && (
                <div
                  style={{
                    width: "100%",
                    marginTop: "200px",
                    marginLeft: "30%",
                    position: "absolute",
                    zIndex: 1000,
                  }}
                >
                  <Loader />
                </div>
              )}
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
