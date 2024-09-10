import {
    Cadastro,
    Login,
    CadastrarEmpresa,
    ListagemVagas,
    MinhasVagas,
    CadastrarVaga
} from "./pages";
import {
    LOGIN,
    CADASTRO,
    CADASTRAR_EMPRESA,
    MINHASVAGAS,
    VAGAS,
    CADASTRAR_VAGA,
} from "./routes/routes";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuthContext } from "./shared/contexts/AuthContext";

const Private = ({ children }) => {
    const { isAuthenticated } = useAuthContext();

    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Routes>
            <Route path={LOGIN} element={<Login />} />
            <Route path={CADASTRO} element={<Cadastro />} />
            <Route path={CADASTRAR_EMPRESA} element={<CadastrarEmpresa />} />
            <Route path="*" element={<Navigate to={LOGIN} />} />
        </Routes>
    );
};

export const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Private>
                    <Routes>
                        <Route path={CADASTRAR_VAGA} element={<CadastrarVaga />} />
                        <Route path={MINHASVAGAS} element={<MinhasVagas />} />
                        <Route path={VAGAS} element={<ListagemVagas />} />
                        <Route path="*" element={<Navigate to={VAGAS} />} />
                    </Routes>
                </Private>
            </AuthProvider>
        </BrowserRouter>
    );
};
