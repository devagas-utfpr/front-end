import "./App.css";
import { Cadastro, Login } from "./pages";

import { LOGIN, CADASTRO } from "./routes/routes";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path={CADASTRO} element={<Cadastro />} />
        <Route path="*" element={<Navigate to={LOGIN} />} />
      </Routes>
    </BrowserRouter>
  );
};
