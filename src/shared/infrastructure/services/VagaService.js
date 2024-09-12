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

const getAll = async () => {
    try {
        const { data } = await Api.get("/vagas");
        if (data) {
            // Usando Promise.all para resolver todas as promessas dentro do map
            const vagas = await Promise.all(
                data.map(async (vaga) => {
                    // Substitui o código da cidade pelo nome da cidade
                    vaga.empresa.cidade = await CidadeServices.getById(
                        vaga.empresa.cidade
                    );

                    vaga.modalidade =
                        vaga.modalidade === 0
                            ? "Presencial"
                            : vaga.modalidade === 1
                            ? "Remoto"
                            : "Híbrido";

                    // Formata as datas no formato DD/MM/YYYY
                    vaga.dataInicio = format(
                        new Date(vaga.dataInicio),
                        "dd/MM/yyyy",
                        { locale: ptBR }
                    );
                    vaga.dataFim = format(
                        new Date(vaga.dataFim),
                        "dd/MM/yyyy",
                        { locale: ptBR }
                    );

                    return vaga;
                })
            );

            return vagas; // Retorna as vagas com a cidade e datas formatadas
        }
        return [];
    } catch (error) {
        throw new Error(
            (error && error.message) || "Erro ao obter os registros."
        );
    }
};

const getVagaUsuario = async () => {
    try {
        const { data } = await Api.get("/usuarios/vagas");
        return data;
    } catch (error) {
        return new Error((error && error.message) || "Erro ao buscar vagas.");
    }
};

export const VagaServices = {
    create,
    getAll,
    getVagaUsuario,
};
