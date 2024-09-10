import "./App.css";

import { Cadastro, Login, CadastrarEmpresa, MinhasVagas } from "./pages";
import { LOGIN, CADASTRO, CADASTRAR_EMPRESA, MINHASVAGAS } from "./routes/routes";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path={CADASTRO} element={<Cadastro />} />
        <Route path={CADASTRAR_EMPRESA} element={<CadastrarEmpresa />} />
        <Route path={MINHASVAGAS} element={<MinhasVagas />} />
        <Route path="*" element={<Navigate to={LOGIN} />} />
      </Routes>
    </BrowserRouter>
  );
};
