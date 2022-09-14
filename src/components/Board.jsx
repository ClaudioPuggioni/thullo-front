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
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function Board() {
  const [open, setOpen] = React.useState(false);
  const { userInfo } = useSelector((state) => state.wall);
  const { currBoard } = useSelector((state) => state.cabinet);
  const { id } = useParams();
  const dispatch = useDispatch();
  const listName = useRef(null);
  let [listText, setList] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        }} onClick={() => handleOpen} />) : null}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
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
