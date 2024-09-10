import { Api } from "../config";

const create = async (usuario) => {
    try {
        const { data } = await Api.post("/usuarios", usuario);
        if (data) {
            return data.id;
        }

        return new Error("Erro ao cadastrar o registro.");
    } catch (error) {
        return new Error(
            (error && error.message) || "Erro ao cadastrar o registro."
        );
    }
};

export const UsuarioServices = {
    create,
};
