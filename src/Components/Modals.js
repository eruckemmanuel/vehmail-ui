import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, message } from "antd";
import axios from "../axios/axios";
import "../Styles/Modals.scss";
import ComposeEditor from "./ComposeEditor";

const Modals = ({ handleCancel }) => {
  const [visible, setVisible] = useState(true);
  const [message, setMessage] = useState("");

  const onSubmit = (event) => {};

  return (
    <>
      <Modal
        open={visible}
        width={1000}
        title="New Message"
        onCancel={handleCancel}
      >
        <div className="input-container" id="editor-box">
          <div id="editor-form">
            <form onSubmit={onSubmit}>
              <input type="text" placeholder="To" name="to" required />
              <br />
              <input
                type="text"
                placeholder="Subject"
                name="subject"
                required
              />
              <br />
              <br />
              <ComposeEditor onChange={(content) => setMessage(content)} />
              <hr />
              <div className="button-container">
                <button type="submit">Send</button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Modals;
