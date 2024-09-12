import { useEffect, useState } from "react";
import { Header, Card, Loading, Footer } from "../../shared/components";
import { VagaServices } from "../../shared/infrastructure";

export const ListagemVagas = ({ isEmpresa, usuario }) => {
    const [vagas, setVagas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVagas = async () => {
            try {
                if (isEmpresa) {
                    const response = await VagaServices.getByEmpresa(usuario);
                    setVagas(response);
                } else {
                    const response = await VagaServices.getAll();
                    setVagas(response);
                }
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
                        {vagas.length === 0 ? (
                            <div class="py-40">
                                <h2 class="text-white">
                                    Nenhuma vaga encontrada.
                                </h2>
                            </div>
                        ) : (
                            vagas.map((vaga) => (
                                <Card
                                    cardInfo={vaga}
                                    isEmpresa={isEmpresa}
                                    usuario={usuario}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
