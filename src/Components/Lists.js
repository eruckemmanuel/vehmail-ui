import React from "react";
import { List, Avatar, Space } from "antd";
import { getAllThreadParticipants } from "../common/utils";

const Lists = (props) => {
  const data = props.inbox.map((threads) => {
    return {
      key: threads[0].message_id,
      title:
        getAllThreadParticipants(threads).names.toString() +
        ` (${threads.length > 1 ? threads.length : ""})`,
      subject: threads[0].subject,
      messages: threads,
    };
  });

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <a onClick={props.handleClick.bind(this, item.messages)}>
          <List.Item>
            <List.Item.Meta
              rowkey={item.key}
              key={item.key}
              avatar={
                <Avatar style={{ backgroundColor: "#18a1ff" }}>
                  {item.title === undefined ? "N" : item.title.split("")[0]}
                </Avatar>
              }
              title={item.title === undefined ? "No Title" : item.title}
              description={item.subject}
            />
          </List.Item>
        </a>
      )}
    />
  );
};

export default Lists;
