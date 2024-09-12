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

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        </div>
    );
};

const Private = () => {
    const { isAuthenticated, uuid, isEmpresa } = useAuthContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated !== undefined) {
            setLoading(false);
        }
    }, [isAuthenticated]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return isAuthenticated ? (
        <>
            {isEmpresa ? (
                <Routes>
                    <Route
                        path={VAGAS}
                        element={
                            <ListagemVagas
                                isEmpresa={isEmpresa}
                                usuario={uuid}
                            />
                        }
                    />
                    <Route
                        path={CADASTRAR_VAGA}
                        element={
                            <CadastrarVaga uuid={uuid} isEmpresa={isEmpresa} />
                        }
                    />
                    <Route path="*" element={<Navigate to={VAGAS} />} />
                </Routes>
            ) : (
                <Routes>
                    <Route
                        path={MINHASVAGAS}
                        element={<MinhasVagas uuidUsuario={uuid} />}
                    />
                    <Route
                        path={VAGAS}
                        element={
                            <ListagemVagas
                                isEmpresa={isEmpresa}
                                usuario={uuid}
                            />
                        }
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
