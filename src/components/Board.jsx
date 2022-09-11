import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BoardLeftMenu from "./BoardLeftMenu";

export default function Board() {
  const { boards } = useSelector((state) => state.cabinet);
  const { id } = useParams();
  const dispatch = useDispatch();

  return (
    <div className="boardContainer">
      <BoardLeftMenu />
    </div>
  );
}
