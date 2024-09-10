import { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { LuUser2 } from "react-icons/lu";
import { MdCalendarMonth } from "react-icons/md";
import { FaRegIdCard } from "react-icons/fa";

import { useAuthContext } from "../../../shared/contexts/AuthContext";
import { UsuarioServices } from "../../../shared/infrastructure";

const SignUpValidationSchema = yup.object().shape({
    nome: yup
        .string()
        .min(3, "Nome deve ter no mínimo 3 caracteres")
        .required("Nome é obrigatório"),
    email: yup
        .string()
        .email("E-mail inválido")
        .required("E-mail é obrigatório"),
    dataNascimento: yup
        .string()
        .min(new Date(1900, 1, 1), "Data de nascimento inválida")
        .max(new Date(), "Data de nascimento inválida")
        .required("Data de nascimento é obrigatória"),
    cpf: yup
        .string()
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
        .required("CPF é obrigatório"),
    senha: yup
        .string()
        .min(6, "Senha deve ter no mínimo 6 caracteres")
        .required("Senha é obrigatória"),
    confirmarSenha: yup
        .string()
        .oneOf([yup.ref("senha"), null], "Senhas não conferem")
        .required("Confirmação de senha é obrigatória"),
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

export const Cadastro = ({ children }) => {
    const { isAuthenticated, login } = useAuthContext();
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Função de validação e login
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            await SignUpValidationSchema.validate(
                {
                    nome,
                    email,
                    dataNascimento,
                    cpf,
                    senha,
                    confirmarSenha,
                },
                {
                    abortEarly: false,
                }
            );

            const parsedDate = parseDateString(dataNascimento);

            if (parsedDate) {
                try {
                    const response = await UsuarioServices.create({
                        nome,
                        email,
                        dataNascimento: parsedDate,
                        cpf,
                        senha,
                    });
                    if (response instanceof Error) {
                        setError("Erro ao cadastrar usuário");
                    } else {
                        console.log("Usuário cadastrado com sucesso");
                        navigate("/login");
                    }
                } catch (error) {
                    setError("Erro ao cadastrar usuário");
                }
            } else {
                setError("Data de nascimento inválida");
            }
        } catch (validationError) {
            if (validationError instanceof yup.ValidationError) {
                setError(validationError.errors[0]);
            } else {
                setError("E-mail e/ou senha incorretos!");
            }
        }
    };

    const handleDateChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
        if (value.length > 8) value = value.slice(0, 8); // Limit to 8 digits

        if (value.length >= 5) {
            value = value.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
        } else if (value.length >= 3) {
            value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
        }

        setDataNascimento(value);
    };

    const handleCpfChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
        if (value.length > 11) value = value.slice(0, 11); // Limit to 11 digits

        // Apply CPF format (XXX.XXX.XXX-XX)
        if (value.length >= 10) {
            value = value.replace(
                /(\d{3})(\d{3})(\d{3})(\d{1,2})/,
                "$1.$2.$3-$4"
            );
        } else if (value.length >= 7) {
            value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
        } else if (value.length >= 4) {
            value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
        }

        setCpf(value);
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
                        Cadastre-se!
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

                        <div class="space-x-6 flex justify-center mt-8">
                            <div className="relative flex items-center">
                                <input
                                    required
                                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                    type="text"
                                    value={dataNascimento}
                                    placeholder="Data de nascimento"
                                    onChange={handleDateChange}
                                />
                                <MdCalendarMonth className="w-4 h-4 absolute right-4 icon-default" />
                            </div>
                            <div class="w-4"></div>
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    required
                                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                    placeholder="Número do CPF"
                                    value={cpf}
                                    onChange={handleCpfChange}
                                />
                                <FaRegIdCard className="w-4 h-4 absolute right-4 icon-default" />
                            </div>
                        </div>

                        <div class="space-x-6 flex justify-center mt-8">
                            <div className="relative flex items-center">
                                <input
                                    type="password"
                                    required
                                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                    placeholder="Insira sua senha"
                                    value={confirmarSenha}
                                    onChange={(e) =>
                                        setConfirmarSenha(e.target.value)
                                    }
                                />

                                <RiLockPasswordLine className="w-4 h-4 absolute right-4 icon-default" />
                            </div>
                            <div class="w-4"></div>
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
                        <p className="text-gray-800 text-sm !mt-8 text-center">
                            Já possui conta?{" "}
                            <a
                                onClick={() => navigate("/login")}
                                className="text-default hover:underline ml-1 whitespace-nowrap font-semibold"
                            >
                                Entre aqui!
                            </a>
                        </p>
                        <p className="text-gray-800 text-sm mt-0 text-center">
                            Você possui uma empresa?{" "}
                            <a
                                onClick={() => navigate("/cadastrar-empresa")}
                                className="text-default hover:underline ml-1 whitespace-nowrap font-semibold"
                            >
                                Registre aqui!
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
