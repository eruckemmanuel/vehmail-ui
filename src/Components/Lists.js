import React from "react";
import { List, Avatar, Space } from "antd";
import { getAllThreadParticipants, getFormattedDate } from "../common/utils";

const Lists = (props) => {
  const data = props.inbox.map((threads) => {
    return {
      key: threads[0].message_id,
      threadCount: threads.length,
      title: getAllThreadParticipants(threads).names.toString(),
      subject: threads[0].subject,
      messages: threads,
      date: threads[threads.length - 1].date,
      seen: threads[threads.length - 1].seen,
    };
  });

  return (
    <div className="mt-6">
      <div className="list has-hoverable-list-items has-overflow-ellipsis">
        {data?.map((item) => (
          <div
            key={item.key}
            className="list-item static-link"
            onClick={() => props.handleClick(item.messages)}
          >
            <div className="list-item-image">
              <figure className="image is-32x32">
                <Avatar style={{ backgroundColor: "#18a1ff" }}>
                  {item.title ? item.title[0].toUpperCase() : "N"}
                </Avatar>
              </figure>
            </div>
            <div className="list-item-content">
              <div className="is-flex is-justify-content-space-between">
                <span>
                  <div className="has-overflow-ellipsis">
                    {item.seen ? (
                      <span>{item.title}</span>
                    ) : (
                      <strong>{item.title}</strong>
                    )}

                    <small className="ml-2 is-small">
                      {`${item.threadCount > 1 ? item.threadCount : ""}`}
                    </small>
                  </div>
                </span>
                <span className="has-text-weight-normal has-text-grey">
                  <small>{getFormattedDate(item.date)}</small>
                </span>
              </div>
              <div className="list-item-description ml-2">
                {item.seen ? (
                  <span>{item.subject}</span>
                ) : (
                  <strong>{item.subject}</strong>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lists;
