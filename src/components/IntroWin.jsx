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
import { getBGs } from "../features/dataSlice";

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
  const { backgrounds } = useSelector((state) => state.cabinet);
  const dispatch = useDispatch();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    dispatch(getBGs());
  }, []);

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
          <Grid container>
            <CreateBoard backgrounds={backgrounds} />
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
