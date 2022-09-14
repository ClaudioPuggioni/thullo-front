import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import DescriptionIcon from "@mui/icons-material/Description";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";

export default function Card({ title }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      border: "1px solid #ced4da",
      fontSize: 16,
      width: "auto",
      padding: "10px 12px",
      transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));

  return (
    <div className="cardContainer">
      <Button onClick={handleOpen}>Card Name in Board</Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Box>
            <FeaturedPlayListIcon />
            <Box>
              <BootstrapInput defaultValue={"Card Title"} id="bootstrap-input" />
              <Typography id="modal-modal-description" sx={{ fontSize: "small" }}>
                in list {"List Name"}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box>
              <DescriptionIcon />
              <Typography id="modal-modal-description" sx={{ fontSize: "small" }}>
                Description
              </Typography>
            </Box>
            <TextField id="filled-textarea" label="Description" placeholder="Add description..." multiline variant="filled" />
          </Box>
          <Box>
            <Box>
              <SpeakerNotesIcon />
              <Typography id="modal-modal-description" sx={{ fontSize: "small" }}>
                Activity
              </Typography>
            </Box>
            {"Username"}
            <TextField id="filled-textarea" label="Comment" placeholder="Leave comment..." multiline variant="filled" />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
