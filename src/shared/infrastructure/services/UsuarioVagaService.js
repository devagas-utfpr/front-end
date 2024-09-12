import { Api } from "../config";

const create = async (inscricao) => {
    try {
        const { data } = await Api.post("/usuarios/vagas", inscricao);
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

const getVagaUsuario = async (uuidUsuario) => {
    try {
        console.log(uuidUsuario.uuidUsuario);
        const { data } = await Api.get(
            `/usuarios/vagas/usuario/${uuidUsuario.uuidUsuario}`
        );
        console.log(data);
        return data;    
    } catch (error) {
        return new Error(
            (error && error.message) || "Erro ao buscar inscrições."
        );
    }
};

const remove = async (uuid) => {
    try {
        const { data } = await Api.put(`/usuarios/vagas/status/${uuid}`);
        return data;
    } catch (error) {
        return new Error(
            (error && error.message) || "Erro ao remover inscrição."
        );
    }
};

export const UsuarioVagaServices = {
    create,
    getVagaUsuario,
    remove,
};
