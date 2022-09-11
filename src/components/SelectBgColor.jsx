import React from "react";

export default function SelectBgColor({ ele, idx, setFieldValue, selectedBG, selectBG }) {
  return (
    <div
      name="bgChoice"
      className={selectedBG === idx ? "selectedBgColor" : ""}
      onClick={() => {
        console.log("pong");
        selectBG(idx);
        selectedBG !== idx ? setFieldValue("bgChoice", ele) : setFieldValue("bgChoice", "#FFFFFF");
      }}
      style={{ height: "35px", width: "47px", borderRadius: "3px", backgroundColor: ele }}
    ></div>
  );
}
