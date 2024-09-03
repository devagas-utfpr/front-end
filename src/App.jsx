import "./App.css";
// import { Home } from "./pages/vaga/Home";

import { Login } from "./pages/usuario/Login/login";
import { Cadastro } from "./pages/usuario/Login/cadastro";

export const App = () => {
    return (
        <>
            <Login />
            <Cadastro />
        </>
    );
};
