import React from "react";

export default function SelectBgImage({ ele, idx, setFieldValue, selectedBG, selectBG }) {
  return (
    <div
      onClick={(e) => {
        selectBG(idx);
        selectedBG !== idx ? setFieldValue("background", { full: ele.urls.full, small: ele.urls.thumb }) : setFieldValue("background", "#FFFFFF");
      }}
      className={selectedBG === idx ? "selectedBgImage" : ""}
      style={{ position: "relative", height: "100%", width: "60px" }}
    >
      <img
        name="bgChoice"
        src={ele.urls.thumb}
        style={{ position: "absolute", maxHeight: "100%", width: "60px", borderRadius: "3px", objectFit: "cover" }}
        alt={`bg${idx}`}
      ></img>
    </div>
  );
}
