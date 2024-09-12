import { useEffect, useState } from "react";
import { Footer, Header } from "../../shared/components";
import "./style.css";
import { UsuarioVagaServices } from "../../shared/infrastructure/services/UsuarioVagaService";
import { IoMdTrash } from "react-icons/io";
import { VagaServices } from "../../shared/infrastructure";

export const MinhasVagas = (uuidUsuario) => {
    const [vagas, setVagas] = useState([]);

    const getVagas = async () => {
        try {
            console.log(uuidUsuario);
            const response = await UsuarioVagaServices.getVagaUsuario(
                uuidUsuario
            );
            setVagas(response);
            console.log("vagas", vagas);
        } catch (error) {
            console.error("Erro ao buscar vagas:", error);
        }
    };

    useEffect(() => {
        getVagas();
    }, []);

    const handleRemover = async (vaga, event) => {
        event.preventDefault();

        const confirmRemoval = window.confirm(
            "Você tem certeza que deseja remover esta vaga?"
        );
        if (!confirmRemoval) {
            return;
        }

        vaga.status = false;
        console.log("vv", vaga);
        await UsuarioVagaServices.remove(vaga.uuid);
        console.log("Vaga removida com sucesso");
        navigate("/vagass"); // Redireciona para a listagem de vagas
        windows.location.reload(); // Atualiza a tela após a edição
    };

    return (
        <>
            <Header />
            <div className="minhas-vagas-container">
                <h1 className="font-bold text-2xl">Minhas vagas</h1>
                <div className="vagas-lista">
                    {vagas.map((vaga) => (
                        <div key={vaga.uuid} className="card-vaga">
                            <div className="status-data">
                                <p
                                    className={`status ${
                                        vaga.status ? "Aberta" : "Fechada"
                                    }`}
                                >
                                    {vaga.status ? "Aberta" : "Fechada"}
                                </p>
                                <p>
                                    {new Date(
                                        vaga.vaga.dataInicio
                                    ).toLocaleDateString()}{" "}
                                    -{" "}
                                    {new Date(
                                        vaga.vaga.dataFim
                                    ).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="titulo">
                                <p>{vaga.titulo}</p>
                            </div>

                            <div className="nome-empresa">
                                <p>{vaga.vaga.empresa.nome}</p>
                            </div>

                            <div className="local">
                                <p>{vaga.vaga.cargo.nome}</p>
                            </div>

                            <div className="botao">
                                <a
                                    onClick={(event) =>
                                        handleRemover(vaga, event)
                                    }
                                    className="inline-block px-4 py-2 rounded tracking-wider bg-red-500 hover:bg-default-hover text-white text-sm cursor-pointer"
                                >
                                    <IoMdTrash className="inline-block" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};
