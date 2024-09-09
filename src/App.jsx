import "./App.css";
import { Cadastro, Login, MinhasVagas } from "./pages";

import { LOGIN, CADASTRO, MINHASVAGAS } from "./routes/routes";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path={CADASTRO} element={<Cadastro />} />
        <Route path="*" element={<Navigate to={LOGIN} />} />
        <Route path={MINHASVAGAS} element={<MinhasVagas />} />
      </Routes>
    </BrowserRouter>
  );
};
