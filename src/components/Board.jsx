import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleBoard } from "../features/dataSlice";
import BoardLeftMenu from "./BoardLeftMenu";
import List from "./List";
import AddSharpIcon from "@mui/icons-material/AddSharp";

export default function Board() {
  const { currBoard } = useSelector((state) => state.cabinet);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleBoard(id));
  }, [id]);

  return (
    <div
      id="boardContainer"
      style={{
        backgroundImage: currBoard && currBoard.background[0] !== "#" ? `url(${currBoard.background.full})` : null,
        backgroundColor: currBoard && currBoard.background[0] === "#" ? currBoard.background : null,
      }}
    >
      <BoardLeftMenu />
      {console.log("CURRBOARD:", currBoard)}
      <div style={{ padding: "10px" }}>
        {currBoard.list ? currBoard.map((ele, idx) => <List key={`list${idx}`} listInfo={ele} />) : null}
        <div className="createList">
          <AddSharpIcon fontSize="small" />
          &nbsp;Create New List
        </div>
      </div>
    </div>
  );
}
