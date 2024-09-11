import {
    Cadastro,
    Login,
    CadastrarEmpresa,
    ListagemVagas,
    MinhasVagas,
    CadastrarVaga,
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
import { useEffect, useState } from "react";

const Private = () => {
    const { isAuthenticated, isEmpresa } = useAuthContext();
    const [loading, setLoading] = useState(true);

    console.log("l", loading);
    console.log("a", isAuthenticated);
    console.log("i", isEmpresa);

    useEffect(() => {
        if (isAuthenticated !== undefined && isEmpresa !== undefined) {
            setLoading(false);
        }
    }, [isAuthenticated, isEmpresa]);

    if (loading) {
        return <div>Loading...</div>; // Ou qualquer spinner de carregamento
    }

    return isAuthenticated ? (
        <>
            {isEmpresa ? (
                <Routes>
                    <Route
                        path={VAGAS}
                        element={<ListagemVagas isEmpresa={isEmpresa} />}
                    />
                    <Route
                        path={CADASTRAR_VAGA}
                        element={<CadastrarVaga isEmpresa={isEmpresa} />}
                    />
                    <Route path="*" element={<Navigate to={VAGAS} />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path={MINHASVAGAS} element={<MinhasVagas />} />
                    <Route
                        path={VAGAS}
                        element={<ListagemVagas isEmpresa={isEmpresa} />}
                    />
                    <Route path={CADASTRAR_VAGA} element={<CadastrarVaga />} />
                    <Route path="*" element={<Navigate to={VAGAS} />} />
                </Routes>
            )}
        </>
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
                <Private />
            </AuthProvider>
        </BrowserRouter>
    );
};
