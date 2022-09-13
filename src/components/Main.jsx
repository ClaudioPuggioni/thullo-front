import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { clearCabinet } from "../features/dataSlice";
import Board from "./Board";
import IntroWin from "./IntroWin";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import UserInterface from "./UserInterface";

export default function Main() {
  const { lgn } = useSelector((state) => state.wall);
  const goTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!lgn) {
      dispatch(clearCabinet());
      goTo("/login");
    } else {
      goTo("/");
    }
    // eslint-disable-next-line
  }, [lgn]);

  return (
    <div id="mainContainer">
      <Routes>
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/login"} element={<LogIn />} />
        <Route path={"/"} element={<UserInterface />}>
          <Route index element={<IntroWin />} />
          <Route path={"/board/:id"} element={<Board />} />
        </Route>
      </Routes>
    </div>
  );
}
