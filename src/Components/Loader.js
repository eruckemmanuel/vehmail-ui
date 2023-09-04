import React from "react";
import loader from "../assets/loader.gif";

export default function Loader({ height }) {
  return (
    <div>
      <img style={{ height: height }} src={loader} alt="Loading..." />
    </div>
  );
}
