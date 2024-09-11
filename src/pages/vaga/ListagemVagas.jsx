import { Header, Card, Paginacao } from "../../shared/components";

export const ListagemVagas = ({ isEmpresa }) => {
    const mockVagas = [
        {
            titulo: "Desenvolvedor Fullstack",
            empresa: "Empresa X",
            dataInicio: "01/01/2021",
            dataFim: "01/01/2022",
            local: "São Paulo - SP",
            modalidade: "Remoto",
            descricao: "Desenvolvimento de aplicações web",
            status: true,
        },
        {
            titulo: "Desenvolvedor Frontend",
            empresa: "Empresa Y",
            dataInicio: "01/01/2021",
            dataFim: "01/01/2022",
            local: "São Paulo - SP",
            modalidade: "Presencial",
            descricao: "Desenvolvimento de aplicações web",
            status: true,
        },
        {
            titulo: "Desenvolvedor Desenvolvedor Desenvolvedor",
            empresa: "Empresa Z",
            dataInicio: "01/01/2021",
            dataFim: "01/01/2022",
            local: "São Paulo - SP",
            modalidade: "Remoto",
            descricao: "Desenvolvimento de aplicações web",
            status: false,
        },
    ];
    return (
        <>
            <Header isEmpresa={isEmpresa} />
            <div class="bg-default md:px-10 px-4 py-12 font-[sans-serif]">
                <div class="max-w-5xl max-lg:max-w-3xl max-sm:max-w-sm mx-auto">
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-sm:gap-8">
                        {mockVagas.map((vaga) => (
                            <Card cardInfo={vaga} isEmpresa={isEmpresa} />
                        ))}
                    </div>
                </div>
                <Paginacao paginaAtual={1} totalPaginas={2} />
            </div>
        </>
    );
};
