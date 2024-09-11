import { Api } from "../config";

const getAll = async () => {
    try {
        const { data } = await Api.get("/cargos");
        if (data) {
            return data;
        }
        return new Error("Erro ao selecionar todos os cargos.");
    } catch (error) {
        return new Error(
            (error && error.message) || "Erro ao selecionar todos os cargos."
        );
    }
};

export const CargoServices = {
    getAll,
};
