import "./App.css";
import { Cadastro, Login, CadastrarEmpresa } from "./pages";

import { LOGIN, CADASTRO, CADASTRAR_EMPRESA } from "./routes/routes";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path={CADASTRO} element={<Cadastro />} />
        <Route path={CADASTRAR_EMPRESA} element={<CadastrarEmpresa />} />
        <Route path="*" element={<Navigate to={LOGIN} />} />
      </Routes>
    </BrowserRouter>
  );
};
