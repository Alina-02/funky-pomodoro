import { useState } from "react";
import "./App.css";
import Layout from "./Layout";
import Pomodoro from "./views/Pomodoro";
import WorkingTime from "./views/WorkingTime";

export enum AppMode {
  POMODORO = "Pomodoro",
  WORKING = "Working",
}

function App() {
  const [mode, setMode] = useState<AppMode>(AppMode.POMODORO);

  const changeMode = () => {
    if (mode === AppMode.POMODORO) {
      setMode(AppMode.WORKING);
    } else {
      setMode(AppMode.POMODORO);
    }
  };

  return (
    <Layout changeMode={changeMode} mode={mode}>
      {mode === AppMode.POMODORO && <Pomodoro />}
      {mode === AppMode.WORKING && <WorkingTime />}
    </Layout>
  );
}

export default App;
