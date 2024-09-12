import { useEffect, useState } from "react";
import * as yup from "yup";
import { MdCalendarMonth, MdTitle } from "react-icons/md";

import { VagaServices, CargoServices } from "../../infrastructure";

const EditarValidationSchema = yup.object().shape({
    titulo: yup
        .string()
        .min(3, "Nome deve ter no mínimo 3 caracteres")
        .required("Título é obrigatório"),
    descricao: yup
        .string()
        .min(3, "Nome deve ter no mínimo 3 caracteres")
        .required("Descrição é obrigatório"),
    dataInicio: yup
        .string()
        .min(new Date(1900, 1, 1), "Data de início inválida")
        .max(new Date(), "Data de início inválida")
        .required("Data de início é obrigatório"),
    dataFim: yup
        .string()
        .min(new Date(1900, 1, 1), "Data final inválida")
        .max(new Date(), "Data final inválida")
        .required("Data final é obrigatório"),
    modalidade: yup
        .string()
        .min(0, "Modalidade inválida")
        .max(2, "Modalidade inválida")
        .required("Modalidade é obrigatório"),
    cargo: yup.string().uuid("Cargo inválido").required("Cargo é obrigatório"),
    empresa: yup
        .string()
        .uuid("Empresa inválida")
        .required("Empresa é obrigatório"),
});

const parseDateString = (dateString) => {
    const [day, month, year] = dateString.split("/");
    if (
        day > 31 ||
        month > 12 ||
        year < 1900 ||
        year > new Date().getFullYear()
    ) {
        return null;
    }
    return new Date(`${year}-${month}-${day}`);
};

export const EditarVaga = ({ vaga, closeModal, isEmpresa }) => {
    const [cargos, setCargos] = useState([]);
    const [titulo, setTitulo] = useState(vaga.titulo);
    const [descricao, setDescricao] = useState(vaga.descricao);
    const [dataInicio, setDataInicio] = useState(vaga.dataInicio);
    const [dataFim, setDataFim] = useState(vaga.dataFim);
    const [modalidade, setModalidade] = useState(vaga.modalidade);
    const [cargo, setCargo] = useState(vaga.uuidCargo);
    const [status, setStatus] = useState(vaga.status);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCargos = async () => {
            try {
                switch (modalidade) {
                    case "Presencial":
                        setModalidade(0);
                        break;
                    case "Home Office":
                        setModalidade(1);
                        break;
                    default:
                        setModalidade(2);
                        break;
                }

                const response = await CargoServices.getAll(); // Replace with your endpoint
                setCargos(response);
            } catch (error) {
                console.error("Erro ao buscar cargos", error);
            }
        };

        fetchCargos();
    }, []);

    const handleEditar = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        console.log(status);

        try {
            await EditarValidationSchema.validate(
                {
                    status,
                    titulo,
                    descricao,
                    dataInicio,
                    dataFim,
                    modalidade,
                    cargo,
                    empresa: vaga.uuidEmpresa,
                },
                {
                    abortEarly: false,
                }
            );

            const parsedDateInicio = parseDateString(dataInicio);
            const parsedDateFim = parseDateString(dataFim);

            console.log(parsedDateInicio, parsedDateFim);

            if (parsedDateInicio && parsedDateFim) {
                try {
                    const response = await VagaServices.put({
                        uuid: vaga.uuid, // Envie o uuid da vaga a ser editada
                        titulo,
                        descricao,
                        dataInicio: parsedDateInicio,
                        dataFim: parsedDateFim,
                        modalidade: parseInt(modalidade),
                        uuidCargo: cargo,
                        uuidEmpresa: vaga.uuidEmpresa,
                        status,
                    });

                    if (response instanceof Error) {
                        setError("Erro ao editar vaga");
                    } else {
                        console.log("Vaga editada com sucesso");
                        // closeModal(); // Fecha o modal após sucesso
                        // navigate("/vagass"); // Redireciona para a listagem de vagas
                        // windows.location.reload(); // Atualiza a tela após a edição
                    }
                } catch (error) {
                    setError("Erro ao editar vaga");
                }
            } else {
                setError("Data de início e/ou final inválido(s)");
            }
        } catch (validationError) {
            setError(validationError.errors[0]);
        } finally {
            setLoading(false);
            // closeModal();
            // window.location.reload();
        }
    };

    const handleRemover = async (event) => {
        event.preventDefault();

        const confirmRemoval = window.confirm(
            "Você tem certeza que deseja remover esta vaga?"
        );
        if (!confirmRemoval) {
            return;
        }

        await VagaServices.remove(vaga.uuid);
        console.log("Vaga removida com sucesso");
        closeModal();
        navigate("/vagass"); // Redireciona para a listagem de vagas
        windows.location.reload(); // Atualiza a tela após a edição
    };

    const handleDataInicioChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
        if (value.length > 8) value = value.slice(0, 8); // Limit to 8 digits

        if (value.length >= 5) {
            value = value.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
        } else if (value.length >= 3) {
            value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
        }

        setDataInicio(value);
    };

    const handleDataFinalChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
        if (value.length > 8) value = value.slice(0, 8); // Limit to 8 digits

        if (value.length >= 5) {
            value = value.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
        } else if (value.length >= 3) {
            value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
        }

        setDataFim(value);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
                <button
                    className="absolute top-4 right-4 text-gray-500 text-xl"
                    onClick={closeModal}
                >
                    &times;
                </button>
                <h2 className="text-gray-800 text-center text-2xl font-bold mb-4">
                    Cadastrar nova vaga
                </h2>
                <form className="space-y-4" onSubmit={handleEditar}>
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-800 text-sm">
                                Status
                            </span>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={status}
                                    onChange={(e) =>
                                        setStatus(e.target.checked)
                                    }
                                />
                                <div
                                    className={`w-12 h-6 rounded-full relative transition duration-200 ${
                                        status ? "bg-green-500" : "bg-red-500"
                                    }`}
                                >
                                    <div
                                        className={`absolute w-6 h-6 bg-white rounded-full top-0.5 left-0.5 transition-transform duration-200 transform ${
                                            status ? "translate-x-6" : ""
                                        }`}
                                    />
                                </div>
                            </label>
                        </div>
                    </div>

                    <div>
                        <div className="relative flex items-center">
                            <input
                                required
                                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                type="text"
                                value={titulo}
                                placeholder="Insira um título"
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                            <MdTitle className="w-4 h-4 absolute right-4 text-gray-500" />
                        </div>
                    </div>

                    <div>
                        <div className="relative flex items-center">
                            <textarea
                                required
                                className="w-full h-32 text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 resize-none"
                                value={descricao}
                                placeholder="Insira uma descrição"
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-x-6 flex justify-center mt-8">
                        <div className="relative flex items-center">
                            <input
                                required
                                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                type="text"
                                value={dataInicio}
                                placeholder="Data inicial"
                                onChange={handleDataInicioChange}
                            />
                            <MdCalendarMonth className="w-4 h-4 absolute right-4 text-gray-500" />
                        </div>
                        <div className="relative flex items-center">
                            <input
                                required
                                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                type="text"
                                value={dataFim}
                                placeholder="Data final"
                                onChange={handleDataFinalChange}
                            />
                            <MdCalendarMonth className="w-4 h-4 absolute right-4 text-gray-500" />
                        </div>
                    </div>

                    <div>
                        <div className="relative flex items-center">
                            <select
                                required
                                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                value={modalidade}
                                onChange={(e) => setModalidade(e.target.value)}
                            >
                                <option value="" disabled>
                                    Selecione a modalidade
                                </option>
                                <option value="0">Escritório</option>
                                <option value="1">Home Office</option>
                                <option value="2">Híbrido</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <div className="relative flex items-center">
                            <select
                                required
                                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                value={cargo}
                                onChange={(e) => setCargo(e.target.value)}
                            >
                                <option value="" disabled>
                                    Selecione um cargo
                                </option>
                                {cargos.map((cargo) => (
                                    <option key={cargo.uuid} value={cargo.uuid}>
                                        {cargo.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mt-2 text-center">
                            Erro: {error}
                        </p>
                    )}

                    <div className="space-x-6 flex justify-center mt-8">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-500"
                        >
                            {loading ? "Editando..." : "Salvar"}
                        </button>
                        {isEmpresa && (
                            <button
                                type="button"
                                onClick={handleRemover}
                                className="px-6 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-500"
                            >
                                {loading ? "Removendo..." : "Remover"}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};
