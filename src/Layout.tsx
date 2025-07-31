import React from "react";
import { AppMode } from "./App";

const Layout = ({
  children,
  changeMode,
  mode,
}: Readonly<{
  children: React.ReactNode;
  changeMode: () => void;
  mode: AppMode;
}>) => {
  return (
    <>
      {children}
      <h1>Pomodoro Time</h1>
      <button onClick={changeMode}>
        {mode === AppMode.POMODORO ? "Working Time" : "Pomodoro"}
      </button>
    </>
  );
};

export default Layout;
