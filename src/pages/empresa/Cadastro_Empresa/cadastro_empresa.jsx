import { useState, useEffect } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { LuUser2 } from "react-icons/lu";
import { FaRegIdCard } from "react-icons/fa";

import { useAuthContext } from "../../../shared/contexts/AuthContext";
import { EmpresaServices } from "../../../shared/infrastructure";

const SignUpValidationSchema = yup.object().shape({
    nome: yup
        .string()
        .min(3, "Nome deve ter no mínimo 3 caracteres")
        .required("Nome é obrigatório"),
    email: yup
        .string()
        .email("E-mail inválido")
        .required("E-mail é obrigatório"),
    cnpj: yup
        .string()
        .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ inválido")
        .required("CNPJ é obrigatório"),
    senha: yup
        .string()
        .min(6, "Senha deve ter no mínimo 6 caracteres")
        .required("Senha é obrigatória"),
    confirmarSenha: yup
        .string()
        .oneOf([yup.ref("senha"), null], "Senhas não conferem")
        .required("Confirmação de senha é obrigatória"),
});

export const CadastrarEmpresa = ({ children }) => {
    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cidade, setCidade] = useState("");
    const [cidades, setCidades] = useState([]);
    const [cnpj, setCnpj] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Requisição para buscar as cidades do IBGE
    useEffect(() => {
        fetch(
            "https://servicodados.ibge.gov.br/api/v1/localidades/estados/41/municipios"
        ) // '33' é o código do RJ
            .then((response) => response.json())
            .then((data) => {
                setCidades(data); // Armazena a lista de cidades no estado
            })
            .catch((error) => {
                console.error("Erro ao buscar as cidades:", error);
            });
    }, []);

    // Função de validação e cadastro
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            await SignUpValidationSchema.validate(
                {
                    nome,
                    email,
                    cidade: parseInt(cidade),
                    cnpj,
                    senha,
                    confirmarSenha,
                },
                { abortEarly: false }
            );

            const response = await EmpresaServices.create({
                nome,
                email,
                cidade: parseInt(cidade),
                cnpj,
                senha,
            });

            if (response instanceof Error) {
                setError("Erro ao cadastrar usuário");
            } else {
                navigate("/login");
            }
        } catch (validationError) {
            if (validationError instanceof yup.ValidationError) {
                setError(validationError.errors[0]);
            } else {
                setError("Erro ao cadastrar usuário");
            }
        }
    };

    const handleCnpjChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
        if (value.length > 14) value = value.slice(0, 14); // Limit to 14 digits

        if (value.length >= 12) {
            value = value.replace(
                /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/,
                "$1.$2.$3/$4-$5"
            );
        } else if (value.length >= 8) {
            value = value.replace(
                /^(\d{2})(\d{3})(\d{3})(\d{1,4})/,
                "$1.$2.$3/$4"
            );
        } else if (value.length >= 5) {
            value = value.replace(/^(\d{2})(\d{3})(\d{1,3})/, "$1.$2.$3");
        }

        setCnpj(value);
    };

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="bg-default min-h-screen flex flex-col items-center justify-center py-6 px-4">
            <div className="max-w-md w-full">
                <div className="p-8 rounded-2xl bg-white shadow">
                    <img
                        src="./logoVertical.png"
                        alt="logo"
                        className="w-48 mb-6 mx-auto block"
                    />
                    <h2 className="text-gray-800 text-center text-2xl font-bold">
                        Cadastre sua empresa!
                    </h2>
                    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <div className="relative flex items-center">
                                <input
                                    required
                                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                    type="nome"
                                    value={nome}
                                    placeholder="Insira seu nome"
                                    onChange={(e) => setNome(e.target.value)}
                                />
                                <LuUser2 className="w-4 h-4 absolute right-4 icon-default" />
                            </div>
                        </div>

                        <div>
                            <div className="relative flex items-center">
                                <input
                                    required
                                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                    type="email"
                                    value={email}
                                    placeholder="Insira seu e-mail"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <HiOutlineMail className="w-4 h-4 absolute right-4 icon-default" />
                            </div>
                        </div>

                        <div>
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    required
                                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                    placeholder="Número do CNPJ"
                                    value={cnpj}
                                    onChange={handleCnpjChange}
                                />
                                <FaRegIdCard className="w-4 h-4 absolute right-4 icon-default" />
                            </div>
                        </div>

                        <div>
                            <div className="relative flex items-center">
                                <select
                                    required
                                    className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                    value={cidade}
                                    onChange={(e) => setCidade(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Selecione a cidade
                                    </option>
                                    {cidades.map((cidade) => (
                                        <option
                                            key={cidade.id}
                                            value={cidade.id}
                                        >
                                            {cidade.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-x-6 flex justify-center mt-8">
                            <div className="relative flex items-center">
                                <input
                                    type="password"
                                    required
                                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                    placeholder="Insira sua senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                                <RiLockPasswordLine className="w-4 h-4 absolute right-4 icon-default" />
                            </div>
                            <div className="relative flex items-center">
                                <input
                                    type="password"
                                    required
                                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                    placeholder="Confirme sua senha"
                                    value={confirmarSenha}
                                    onChange={(e) =>
                                        setConfirmarSenha(e.target.value)
                                    }
                                />
                                <RiLockPasswordLine className="w-4 h-4 absolute right-4 icon-default" />
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm mt-2 text-center">
                                Erro: {error}
                            </p>
                        )}

                        <div className="!mt-8">
                            <button
                                type="submit"
                                className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-lite hover:bg-default-hover focus:outline-none"
                                disabled={loading}
                            >
                                {loading ? "Cadastrando..." : "Cadastrar"}
                            </button>
                        </div>
                        <p className="text-gray-800 text-sm !mt-8 text-center">
                            Já possui conta?{" "}
                            <a
                                onClick={() => navigate("/login")}
                                className="text-default hover:underline ml-1 whitespace-nowrap font-semibold"
                            >
                                Entre aqui!
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
