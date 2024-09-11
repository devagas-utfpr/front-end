import { Api } from "../config";

const create = async (empresa) => {
    try {
        const { data } = await Api.post("/empresas", empresa);
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

export const EmpresaServices = {
    create,
};
