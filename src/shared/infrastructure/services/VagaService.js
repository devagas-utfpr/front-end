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
      return data;
    } catch (error) {
        return new Error(
            (error && error.message) || "Erro ao buscar vagas."
        );
    }
  };

  const getVagaUsuario = async () => {
    try {
      const { data } = await Api.get("/usuarios/vagas");
      return data;
    } catch (error) {
        return new Error(
            (error && error.message) || "Erro ao buscar vagas."
        );
    }
  };

export const VagaServices = {
    create,
    getAll,
    getVagaUsuario,
};
