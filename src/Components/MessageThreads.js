import React from "react";
import { Avatar, List, Space } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { getFormattedDate } from "../common/utils";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default function MessageThreads({ messages }) {
  return (
    <div>
      {messages.map((msg) => (
        <div
          className="card -bordered"
          key={msg.message_id}
          style={{
            backgroundColor: "#fff",
            borderRadius: "5px",
            padding: "15px",
            marginBottom: "15px",
            border: "1px solid lightgray",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                padding: "5px",
              }}
            >
              <Avatar size="large">A</Avatar>
            </div>
            <div
              style={{
                marginLeft: "10px",
                width: "100%",
                paddingTop: "10px",
              }}
            >
              <div
                className="card-title"
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h5>
                    <a>
                      <span>{msg.from[0][0]}</span>
                      <span>{`<${msg.from[0][1]}>`}</span>
                    </a>
                  </h5>

                  <div>
                    <span>To:</span>
                    <span>
                      {msg.to?.map((item) => (
                        <span key={item[1]}>{`${item[1]}, `}</span>
                      ))}
                    </span>
                  </div>

                  {msg.cc && msg.cc.length > 0 && (
                    <div>
                      <span>CC:</span>
                      <span>
                        {msg.cc?.map((item) => (
                          <span key={item[1]}>{`${item[1]}, `}</span>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <strong title={new Date(msg.date).toString()}>
                    {getFormattedDate(msg.date)}
                  </strong>
                </div>
              </div>
              <div
                style={{ overflow: "hidden", wordWrap: "break-word" }}
                className="card-body"
                id={`${msg.message_id}-${msg.uuid}-${msg.id}`}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
