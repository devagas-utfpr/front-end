import axios from "axios";

const getById = async (id) => {
    try {
        const { data } = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${id}`);
        if (data) {
            return `${data.nome} - ${data.microrregiao.mesorregiao.UF.sigla}`;
        }
        return new Error("Erro ao selecionar todos os cargos.");
    } catch (error) {
        return new Error(
            (error && error.message) || "Erro ao selecionar todos os cargos."
        );
    }
};

export const CidadeServices = {
    getById,
};
