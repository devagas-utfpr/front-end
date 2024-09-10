import { Api } from "../config";

const auth = async (email, senha) => {
    try {
        const { data } = await Api.post("/auth", { email, senha });
        if (data) {
            return data;
        }

        return new Error("Erro no login.");
    } catch (error) {
        return new Error((error && error.message) || "Erro no login.");
    }
};

export const AuthService = {
    auth,
};
