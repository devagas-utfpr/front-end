import { Api } from "../config";

const create = async (vaga) => {
    try {
        const { data } = await Api.post("/vagas", vaga);
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

export const VagaServices = {
    create,
};
