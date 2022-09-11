import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

export default function CreateBoard({ backgrounds }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button> */}
      <Grid
        aria-describedby={id}
        onClick={handleClick}
        id="plusBoard"
        className="boardThumb"
        item
        xs={3}
        sx={{
          color: "white",
          fontFamily: "Quicksand",
          fontSize: "66px",
          fontWeight: 600,
          backgroundColor: "#c2cbcd",
        }}
      >
        +
      </Grid>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "right",
          horizontal: "right",
        }}
        disableAutoFocus={true}
        disableEnforceFocus={true}
      >
        {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
        <div id="boardOptions">
          <label htmlFor="">Background</label>
          <div id="bgOptions" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {console.log("backgrounds:", backgrounds)}
            <div style={{ display: "flex", gap: "5px" }}>
              {backgrounds ? backgrounds.map((ele) => <img src={ele.urls.thumb} style={{ width: "100px" }}></img>) : null}
            </div>
            <div style={{ display: "flex", gap: "5px", width: "100%" }}>
              {["#0767a0", "#b27b36", "#468138", "#953c2e", "#755285"].map((ele) => (
                <div style={{ height: "35px", width: "45px", borderRadius: "3px", backgroundColor: ele }}></div>
              ))}
            </div>
          </div>
          <button id="createBoardBtn">Create</button>
        </div>
      </Popover>
    </>
  );
}
