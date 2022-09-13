import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { MenuItem, Container, Box, Grid } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CreateBoard from "./CreateBoard";
import { useDispatch, useSelector } from "react-redux";
import { getBGs, getBoards } from "../features/dataSlice";
import { useNavigate } from "react-router-dom";

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />} {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  })
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function IntroWin() {
  const [expanded, setExpanded] = React.useState("panel1");
  const { loading, backgrounds, boards } = useSelector((state) => state.cabinet);
  const { userInfo } = useSelector((state) => state.wall);
  const dispatch = useDispatch();
  const goTo = useNavigate();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    dispatch(getBGs());
    dispatch(getBoards(userInfo._id));
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   dispatch(getBoards());
  // }, [boards]);

  return (
    <div id="introWinContainer">
      <Container sx={{ height: "100%", display: "flex", justifyContent: "space-between", marginTop: "25px" }}>
        <Box paddingRight={1}>
          <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")} sx={{ width: "200px", borderRadius: "4px" }}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography>User's Workspace</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MenuItem>Boards</MenuItem>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box width={"80%"} paddingTop={1.3} sx={{ px: "15px" }}>
          <Box sx={{ width: "100%", display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <PermIdentityIcon sx={{ marginRight: "7px" }} />
            Your Boards
          </Box>
          <Grid container sx={{ display: "flex", gap: "10px" }}>
            <CreateBoard backgrounds={backgrounds} loading={loading} />
            {Object.values(boards).length > 0
              ? Object.values(boards).map((ele, idx) => (
                  <div
                    key={`boardItem${idx}`}
                    className="boardThumb"
                    onClick={() => goTo(`/board/${ele._id}`)}
                    style={{ position: "relative", backgroundColor: ele.background[0] === "#" ? ele.background : null }}
                  >
                    {typeof ele.background === "object" ? (
                      <img className="boardThumb" src={ele.background.small} style={{ objectFit: "cover" }} />
                    ) : null}
                    <div
                      key={`boardItem${idx}`}
                      onClick={() => goTo(`/board/${ele._id}`)}
                      style={{
                        position: "absolute",
                        top: "15px",
                        left: "15px",
                        color:
                          ele.background === "#FFFFFF" ||
                          ele.background === "#ffffff" ||
                          ele.background.small ===
                            "https://images.unsplash.com/photo-1554147090-e1221a04a025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjEyODd8MHwxfHNlYXJjaHwyfHx3YWxscGFwZXJ8ZW58MHx8fHwxNjYzMDkzNzE5&ixlib=rb-1.2.1&q=80&w=200"
                            ? "black"
                            : "white",
                      }}
                    >
                      {ele.title}
                    </div>
                  </div>
                ))
              : null}
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

/* <div className="boardThumb" style={{ backgroundColor: ele.background[0] === "#" ? ele.background : null }}>
{ele.background[0] !== "#" ? <img src={ele.background}></img> : null}
</div> */
