import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { Button, Radio, styled, TextField } from "@mui/material";
import { addMember, delMember, visibility } from "../features/dataSlice";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function MembersWin({ open, boardId }) {
  const dispatch = useDispatch();
  const [addInput, setAddInput] = useState("");
  const [delInput, setDelInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { currBoard } = useSelector((state) => state.cabinet);
  const { userInfo } = useSelector((state) => state.wall);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const [selectedValue, setSelectedValue] = useState(
    // typeof currBoard.active === "booleon" && currBoard.active ? "a" : typeof currBoard.active === "booleon" && !currBoard.active ? "b" : null
    null
  );

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleMember = ({ input, type }) => {
    setLoading(true);
    const values = { userId: userInfo._id, boardId: currBoard._id, memberEmail: null, memberUsername: null };
    input.includes("@") ? (values.memberEmail = input) : (values.memberUsername = input);
    type === "del" ? dispatch(delMember(values)) : dispatch(addMember(values));
    setAddInput("");
    setDelInput("");
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const GreenColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#000000"),
    backgroundColor: "#0d823a",
    "&:hover": {
      backgroundColor: "#00993b",
    },
  }));

  const RedColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#270c13"),
    backgroundColor: "#b6294f",
    "&:hover": {
      backgroundColor: "#d50c41",
    },
  }));

  useEffect(() => {
    setSelectedValue(currBoard.active ? "a" : !currBoard.active ? "b" : null);
  }, [currBoard]);

  return (
    <div>
      <ListItemButton
        onClick={handleOpen}
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          <PersonOutlineIcon />
        </ListItemIcon>
        <ListItemText primary={"Members"} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
      <Modal open={openModal} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="div" component="h4">
            Board Members
          </Typography>
          {currBoard
            ? currBoard.members.map((ele, idx) => (
                <Typography key={`member${idx}`} id="modal-modal-description" sx={{ mt: 2 }}>
                  {currBoard.admin === ele._id ? `${ele.username}(admin)` : ele.username}
                </Typography>
              ))
            : null}
          {userInfo._id === currBoard.admin ? (
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Typography id="modal-modal-title" variant="div" component="h4" sx={{ mt: 2.5 }}>
                Admin Utilities:
              </Typography>
              <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
                <Typography variant="overline" display="block" gutterBottom sx={{ paddingTop: "5px", fontWeight: 600 }}>
                  Board Visibility:
                </Typography>
                <Box sx={{ display: "flex" }}>
                  <Radio
                    onClick={() => dispatch(visibility({ boardId: currBoard._id, userId: userInfo._id, bool: "true" }))}
                    {...controlProps("a")}
                    sx={{
                      color: "#25b63b",
                      "&.Mui-checked": {
                        color: "#25b63b",
                      },
                    }}
                  />
                  <Radio
                    onClick={() => dispatch(visibility({ boardId: currBoard._id, userId: userInfo._id, bool: "false" }))}
                    {...controlProps("b")}
                    sx={{
                      color: "#ce334d",
                      "&.Mui-checked": {
                        color: "#ce334d",
                      },
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <TextField
                  onChange={(e) => setAddInput(e.target.value)}
                  className="standard-password-input"
                  label="Username/Email"
                  value={addInput}
                  type="test"
                  variant="standard"
                />
                <GreenColorButton
                  onClick={() => handleMember({ type: "add", input: addInput })}
                  variant="contained"
                  value={addInput}
                  sx={{ display: "flex", alignSelf: "flex-end" }}
                  disabled={loading}
                >
                  Add Member
                </GreenColorButton>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <TextField
                  onChange={(e) => setDelInput(e.target.value)}
                  className="standard-password-input"
                  label="Username/Email"
                  value={delInput}
                  type="test"
                  variant="standard"
                />
                <RedColorButton
                  onClick={() => handleMember({ type: "del", input: delInput })}
                  variant="contained"
                  sx={{ padding: "6.3px 17.5px", display: "flex", alignSelf: "flex-end" }}
                  disabled={loading}
                >
                  Del Member
                </RedColorButton>
              </Box>
            </Box>
          ) : null}
        </Box>
      </Modal>
    </div>
  );
}
