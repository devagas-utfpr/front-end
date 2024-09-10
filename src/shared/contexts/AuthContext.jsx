import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { AuthService } from "../infrastructure/services/AuthService";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({
    isAuthenticated: false,
    login: async () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState();

    const handleLogin = useCallback(async (email, senha) => {
        try {
            const result = await AuthService.auth(email, senha);
            if (result instanceof Error) {
                throw result.message;
            } else {
                localStorage.setItem("APP_ACCESS_TOKEN", result.accessToken);
                setAccessToken(result.accessToken);
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    }, []);

    const handleLogOut = useCallback(() => {
        localStorage.removeItem("APP_ACCESS_TOKEN");
        setAccessToken(undefined);
    }, []);

    const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

    useEffect(() => {
        const accessToken =
            localStorage.getItem("APP_ACCESS_TOKEN") || undefined;

        if (accessToken) {
            const decoded = jwtDecode(accessToken);

            if (decoded.exp) {
                const currentTime = Date.now();
                const expTime = decoded.exp * 1000;

                if (expTime < currentTime) {
                    handleLogOut();
                    return;
                }
                setAccessToken(accessToken);
            }
        } else {
            setAccessToken(undefined);
        }
    }, [handleLogOut]);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login: handleLogin,
                logout: handleLogOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
