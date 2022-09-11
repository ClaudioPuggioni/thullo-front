import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import Board from "./Board";
import IntroWin from "./IntroWin";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import UserInterface from "./UserInterface";

export default function Main() {
  const { lgn } = useSelector((state) => state.wall);
  const goTo = useNavigate();

  useEffect(() => {
    !lgn ? goTo("/login") : goTo("/");
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
