import React from "react";

export default function SelectBgColor({ ele, idx, setFieldValue, selectedBG, selectBG }) {
  return (
    <div
      name="bgChoice"
      className={selectedBG === idx ? "selectedBgColor" : ""}
      onClick={() => {
        selectBG(idx);
        selectedBG !== idx ? setFieldValue("background", ele) : setFieldValue("background", "#FFFFFF");
      }}
      style={{ height: "35px", width: "47px", borderRadius: "3px", backgroundColor: ele }}
    ></div>
  );
}
