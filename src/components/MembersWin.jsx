import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useSelector } from "react-redux";
import { Button, Radio, styled, TextField } from "@mui/material";

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
  const [openModal, setOpenModal] = useState(false);
  const { currBoard } = useSelector((state) => state.cabinet);
  const { userInfo } = useSelector((state) => state.wall);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const [selectedValue, setSelectedValue] = useState("a");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  useEffect(() => {}, []);

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
            ? currBoard.members.map((ele) => (
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
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
                    {...controlProps("a")}
                    sx={{
                      color: "#25b63b",
                      "&.Mui-checked": {
                        color: "#25b63b",
                      },
                    }}
                  />
                  <Radio
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
                <TextField id="standard-password-input" label="Username/Email" type="test" variant="standard" />
                <GreenColorButton variant="contained" sx={{ display: "flex", alignSelf: "flex-end" }}>
                  Add Member
                </GreenColorButton>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <TextField id="standard-password-input" label="Username/Email" type="test" variant="standard" />
                <RedColorButton variant="contained" sx={{ padding: "6.3px 17.5px", display: "flex", alignSelf: "flex-end" }}>
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
