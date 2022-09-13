import * as React from "react";
import Popover from "@mui/material/Popover";
import { Formik, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { Grid, Button, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import SelectBgColor from "./SelectBgColor";
import SelectBgImage from "./SelectBgImage";
import { createBoard, getBoards } from "../features/dataSlice";
import AddSharpIcon from "@mui/icons-material/AddSharp";

export default function CreateBoard({ backgrounds, loading, onMenu = false }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedBG, setSelectedBG] = useState(null);
  const { userInfo } = useSelector((state) => state.wall);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const selectBG = (idx) => {
    selectedBG !== idx ? setSelectedBG(idx) : setSelectedBG(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const ColorButton = styled(Button)({
    color: "rgb(132, 132, 132)",
    width: "100%",
    backgroundColor: "#f5f6f8",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#3ec0de",
    },
  });

  return (
    <>
      <Grid
        aria-describedby={id}
        onClick={handleClick}
        id={!onMenu ? "plusBoard" : null}
        className={!onMenu ? "boardThumb" : null}
        item
        xs={3}
        sx={{
          color: "white",
          fontFamily: "Quicksand",
          fontSize: !onMenu ? "66px" : null,
          fontWeight: 600,
          backgroundColor: !onMenu ? "#c2cbcd" : null,
        }}
      >
        {!onMenu ? "+" : <AddSharpIcon fontSize="small" sx={{ color: "#505050", cursor: "pointer" }} />}
      </Grid>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "0",
          horizontal: "right",
        }}
        disableAutoFocus={true}
        disableEnforceFocus={true}
        sx={{ margin: "0 10px" }}
      >
        <Formik
          initialValues={{
            title: "",
            background: "#ffffff",
          }}
          validationSchema={Yup.object({
            title: Yup.string().min(3, "Must be at least 3 characters").max(55, "Must be 55 characters or less").required("Required"),
            background: Yup.lazy((value) => {
              switch (typeof value) {
                case "object":
                  return Yup.object();
                case "string":
                  return Yup.string();
                default:
                  return Yup.string();
              }
            }),
          })}
          onSubmit={(values) => {
            dispatch(createBoard({ ...values, userId: userInfo._id }));
            setSelectedBG(null);
            setAnchorEl(null);
            setTimeout(() => dispatch(getBoards(userInfo._id)), 1000);
          }}
        >
          {({ setFieldValue }) => (
            <Form style={{ padding: "15px", display: "flex", flexDirection: "column", gap: "5px" }}>
              <div>
                <div>Background</div>
                <div id="bgOptions" style={{ padding: "5px 0", display: "flex", flexDirection: "column", gap: "5px" }}>
                  <div style={{ display: "flex", gap: "5px", height: "40px", width: "100%" }}>
                    {backgrounds
                      ? backgrounds.map((ele, idx) => (
                          <SelectBgImage
                            key={`background${idx}`}
                            ele={ele}
                            idx={idx}
                            setFieldValue={setFieldValue}
                            selectedBG={selectedBG}
                            selectBG={selectBG}
                          />
                        ))
                      : null}
                  </div>
                  <div style={{ display: "flex", gap: "5px", width: "100%" }}>
                    {["#0767a0", "#b27b36", "#468138", "#953c2e", "#755285"].map((ele, idx) => (
                      <SelectBgColor
                        key={`background${idx}`}
                        ele={ele}
                        idx={idx + 4}
                        setFieldValue={setFieldValue}
                        selectedBG={selectedBG}
                        selectBG={selectBG}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div style={{ display: "flex" }}>
                  <div>Board Title</div>
                  <span style={{ color: "red" }}> *</span>
                </div>
                <input
                  name="boardTitle"
                  type="text"
                  required={true}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setFieldValue("title", e.target.value);
                  }}
                  style={{ margin: "4px 0", paddingLeft: "8px", height: "27px", width: "100%" }}
                />
                <ErrorMessage className="errorMsg" name="boardTitle" component="div" />
              </div>
              <ColorButton type="submit" variant="contained" disabled={loading}>
                Create
              </ColorButton>
            </Form>
          )}
        </Formik>
      </Popover>
    </>
  );
}
