import { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";

import { useAuthContext } from "../../../shared/contexts/AuthContext";

const SignInValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("E-mail inválido")
        .required("E-mail é obrigatório"),
    senha: yup
        .string()
        .min(6, "Senha deve ter no mínimo 6 caracteres")
        .required("Senha é obrigatória"),
});

export const Login = ({ children }) => {
    const { isAuthenticated, login } = useAuthContext();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Função de validação e login
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            await SignInValidationSchema.validate(
                { email, senha },
                { abortEarly: false }
            );

            await login(email, senha);

            navigate("/vagas");
        } catch (validationError) {
            if (validationError instanceof yup.ValidationError) {
                setError(validationError.errors[0]);
            } else {
                setError("E-mail e/ou senha incorretos!");
            }
        }
    };

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="bg-default font-[sans-serif]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">
                    <div className="p-8 rounded-2xl bg-white shadow">
                        <img
                            src="./logoVertical.png"
                            alt="logo"
                            className="w-48 mb-6 mx-auto block"
                        />
                        <h2 className="text-gray-800 text-center text-2xl font-bold">
                            Seja bem-vindo!
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
                                        type="email"
                                        value={email}
                                        placeholder="Insira seu e-mail"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />

                                    <HiOutlineMail className="w-4 h-4 absolute right-4 icon-default" />
                                </div>
                            </div>

                            <div>
                                <div className="relative flex items-center">
                                    <input
                                        type="password"
                                        required
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Insira sua senha"
                                        value={senha}
                                        onChange={(e) =>
                                            setSenha(e.target.value)
                                        }
                                    />

                                    <RiLockPasswordLine className="w-4 h-4 absolute right-4 icon-default" />
                                </div>
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm mt-2 text-center">
                                    {error}
                                </p>
                            )}

                            <div className="!mt-8">
                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-lite hover:bg-default-hover focus:outline-none"
                                    disabled={loading}
                                >
                                    {loading ? "Entrando..." : "Entrar"}
                                </button>
                            </div>
                            <p className="text-gray-800 text-sm !mt-8 text-center">
                                Ainda não possui conta?{" "}
                                <a
                                    onClick={() => navigate("/cadastrar-usuario")}
                                    className="text-default hover:underline ml-1 whitespace-nowrap font-semibold"
                                >
                                    Clique aqui!
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
        </div>
    );
};
