import { useEffect, useState } from "react";
import { Header, Card, Paginacao, Loading, Footer } from "../../shared/components";
import { VagaServices } from "../../shared/infrastructure";

export const ListagemVagas = ({ isEmpresa }) => {
    const [vagas, setVagas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVagas = async () => {
            try {
                const response = await VagaServices.getAll();
                console.log(response);
                setVagas(response);
                setLoading(false);
            } catch (error) {
                setError("Erro ao buscar vagas.");
                setLoading(false);
            }
        };

        fetchVagas();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <Header isEmpresa={isEmpresa} />
            <div class="bg-default md:px-10 px-4 pt-32 pb-32 font-[sans-serif]">
                <div class="max-w-5xl max-lg:max-w-3xl max-sm:max-w-sm mx-auto">
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-sm:gap-8">
                        {vagas.map((vaga) => (
                            <Card cardInfo={vaga} isEmpresa={isEmpresa} />
                        ))}
                    </div>
                </div>
                <Paginacao paginaAtual={1} totalPaginas={2} />
            </div>
            <Footer />
        </>
    );
};
