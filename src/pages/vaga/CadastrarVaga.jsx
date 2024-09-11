import { useEffect, useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { MdCalendarMonth, MdTitle } from "react-icons/md";

import { useAuthContext } from "../../shared/contexts/AuthContext";
import { VagaServices, CargoServices } from "../../shared/infrastructure";
import { Footer, Header } from "../../shared/components";

const SignUpValidationSchema = yup.object().shape({
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
        .number()
        .min(0, "Modalidade inválida")
        .max(2, "Modalidade inválida")
        .required("Modalidade é obrigatório"),
    cargo: yup.string().required("Cargo é obrigatório"),
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

export const CadastrarVaga = ({ isEmpresa }) => {
    const navigate = useNavigate();

    const [cargos, setCargos] = useState([]);

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [modalidade, setModalidade] = useState("");
    const [cargo, setCargo] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCargos = async () => {
            try {
                const response = await CargoServices.getAll(); // Replace with your endpoint
                setCargos(response);
            } catch (error) {
                console.error("Erro ao buscar cargos", error);
            }
        };

        fetchCargos();
    }, []);

    // Função de validação e login
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            await SignUpValidationSchema.validate(
                {
                    titulo,
                    descricao,
                    dataInicio,
                    dataFim,
                    modalidade,
                    cargo,
                },
                {
                    abortEarly: false,
                }
            );

            const parsedDateInicio = parseDateString(dataInicio);
            const parsedDateFim = parseDateString(dataFim);

            if (parsedDateInicio && parsedDateFim) {
                try {
                    const response = await VagaServices.create({
                        titulo,
                        descricao,
                        dataInicio: parsedDateInicio,
                        dataFim: parsedDateFim,
                        modalidade,
                        cargo,
                    });
                    if (response instanceof Error) {
                        setError("Erro ao cadastrar vaga");
                    } else {
                        console.log("Vaga cadastrada com sucesso");
                        navigate("/vagas");
                    }
                } catch (error) {
                    setError("Erro ao cadastrar vaga");
                }
            } else {
                setError("Data de início e/ou final inválido(s)");
            }
        } catch (validationError) {
            setError(validationError.errors[0]);
        }
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
        <>
            <Header isEmpresa={isEmpresa} />
            <div className="bg-default flex flex-col items-center justify-center py-20 px-4">
                <div className="max-w-md w-full">
                    <div className="p-8 rounded-2xl bg-white shadow">
                        <h2 className="text-gray-800 text-center text-2xl font-bold">
                            Cadastrar nova vaga
                        </h2>
                        <form
                            className="mt-8 space-y-4"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <div className="relative flex items-center">
                                    <input
                                        required
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        type="text"
                                        value={titulo}
                                        placeholder="Insira um titulo"
                                        onChange={(e) =>
                                            setTitulo(e.target.value)
                                        }
                                    />

                                    <MdTitle className="w-4 h-4 absolute right-4 icon-default" />
                                </div>
                            </div>

                            <div>
                                <div className="relative flex items-center">
                                    <textarea
                                        required
                                        className="w-full h-32 text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 resize-none"
                                        value={descricao}
                                        placeholder="Insira uma descrição"
                                        onChange={(e) =>
                                            setDescricao(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div class="space-x-6 flex justify-center mt-8">
                                <div className="relative flex items-center">
                                    <input
                                        required
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        type="text"
                                        value={dataInicio}
                                        placeholder="Data inicial"
                                        onChange={handleDataInicioChange}
                                    />
                                    <MdCalendarMonth className="w-4 h-4 absolute right-4 icon-default" />
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
                                    <MdCalendarMonth className="w-4 h-4 absolute right-4 icon-default" />
                                </div>
                            </div>

                            <div>
                                <div className="relative flex items-center">
                                    <select
                                        required
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        value={modalidade}
                                        onChange={(e) =>
                                            setModalidade(e.target.value)
                                        }
                                    >
                                        <option value="" selected>
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
                                        onChange={(e) =>
                                            setCargo(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Selecione um cargo
                                        </option>
                                        {cargos.map((cargo) => (
                                            <option
                                                key={cargo.uuid}
                                                value={cargo.uuid}
                                            >
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

                            <div className="mt-8">
                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-lite hover:bg-default-hover focus:outline-none"
                                    disabled={loading}
                                >
                                    {loading ? "Entrando..." : "Cadastrar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
