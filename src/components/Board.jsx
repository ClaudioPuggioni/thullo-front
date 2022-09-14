import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleBoard } from "../features/dataSlice";
import BoardLeftMenu from "./BoardLeftMenu";
import List from "./List";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { Box, Button, TextField, } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useRef } from "react";
import { createList, getBoards } from "../features/dataSlice";
import { useState } from "react";


export default function Board() {
  const { userInfo } = useSelector((state) => state.wall);
  const { currBoard } = useSelector((state) => state.cabinet);
  const { id } = useParams();
  const dispatch = useDispatch();
  const listName = useRef(null);
  let [listText, setList] = useState("");

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
        {currBoard.lists ? currBoard.lists.map((ele, idx) => <List key={`list${idx}`} listInfo={ele} sx={{
          width: 10,
          height: 25,
          fontSize: 10,
          color: 'blue',
        }} />) : null}
        <Box className="createList" sx={{

          display: 'flex',
          color: 'white',
        }}>

          <AddSharpIcon fontSize="small" />

          <TextField id="standard-basic" label="Standard" type='text' variant="standard" ref={listName} onChange={
            (e) => {
              setList(e.target.value)
            }
          } />

          <Button variant="contained" endIcon={<SendIcon />} sx={{
            width: 10,
            height: 25,
            fontSize: 10,
            color: 'white',
          }}

            onClick={() => {
              console.log(listText)

              dispatch(createList({
                title: listText,
                userId: userInfo._id,
                boardId: currBoard._id
              }));
              setTimeout(() => dispatch(getBoards(userInfo._id)), 1000);
            }
            }
          >

          </Button>

        </Box>
      </div>
    </div >
  );
}
