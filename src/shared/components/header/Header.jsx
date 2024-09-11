import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";

const navigationUsuario = [
    { name: "Lista de vagas", href: "/vagas" },
    { name: "Histórico", href: "/historico" },
];

const navigationEmpresa = [
    { name: "Minhas vagas", href: "/vagas" },
    { name: "Cadastrar vaga", href: "/cadastrar-vaga" },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export const Header = ({ isEmpresa }) => {
    const { logout } = useAuthContext();
    const location = useLocation(); // Obtém a localização atual

    // Verifica qual é a rota atual e marca o item correspondente como current
    const currentNavigation = isEmpresa ? navigationEmpresa : navigationUsuario;
    currentNavigation.forEach((item) => {
        item.current = location.pathname === item.href;
    });

    return (
        <Disclosure as="nav" className="bg-white">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Mobile menu button */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon
                                className="block h-6 w-6"
                                aria-hidden="true"
                            />
                            <XMarkIcon
                                className="hidden h-6 w-6"
                                aria-hidden="true"
                            />
                        </Disclosure.Button>
                    </div>

                    {/* Logo */}
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img
                                className="h-8 w-auto"
                                src="./logo.png"
                                alt="Your Company"
                            />
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {currentNavigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? "bg-default text-white"
                                                : "text-gray-500",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}
                                        aria-current={
                                            item.current ? "page" : undefined
                                        }
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Profile Dropdown */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src="./perfil.jpg"
                                        alt=""
                                    />
                                </Menu.Button>
                            </div>
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? "bg-gray-100" : "",
                                                "block px-4 py-2 text-sm text-gray-700"
                                            )}
                                        >
                                            Perfil
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            onClick={logout}
                                            className={classNames(
                                                active ? "bg-gray-100" : "",
                                                "block px-4 py-2 text-sm text-gray-700"
                                            )}
                                        >
                                            Sair
                                        </a>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {currentNavigation.map((item) => (
                        <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className={classNames(
                                item.current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "block rounded-md px-3 py-2 text-base font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                        >
                            {item.name}
                        </Disclosure.Button>
                    ))}
                </div>
            </Disclosure.Panel>
        </Disclosure>
    );
};
