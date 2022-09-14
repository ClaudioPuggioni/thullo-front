import React from "react";

export default function List({ listInfo }) {
  return (
    <div className="listContainer">
      {listInfo.title}
    </div>
  );
}
