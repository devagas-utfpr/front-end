export const Footer = () => {
    return (
        <footer class="font-sans tracking-wide bg-white py-10 px-10">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                    <h4 class="text-dark font-semibold text-lg mb-6">
                        Links rápidos
                    </h4>
                    <ul class="space-y-5">
                        <li>
                            <a
                                href="https://github.com/devagas-utfpr"
                                class="hover:text-default-hover text-lite text-[15px] transition-all"
                            >
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.figma.com/design/58IfRfExWVnASqm8EwWjcJ/devagas-utfpr?node-id=0-1&t=SViMJbjwgtJpg0X2-1"
                                class="hover:text-default-hover text-lite text-[15px] transition-all"
                            >
                                Figma
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-dark font-semibold text-lg mb-6">Equipe frontend</h4>
                    <ul class="space-y-5">
                        <li>
                            <a href="javascript:void(0)"
                                class="hover:text-default-hover text-lite text-[15px] transition-all"
                            >
                                Juan L. B. Ramos
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)"
                                class="hover:text-default-hover text-lite text-[15px] transition-all"
                            >
                                Rafaela T. I. Ferreira
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-dark font-semibold text-lg mb-6">Equipe backend</h4>
                    <ul class="space-y-5">
                        <li>
                            <a href="javascript:void(0)"
                                class="hover:text-default-hover text-lite text-[15px] transition-all"
                            >
                                Eduardo R. Matushita
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)"
                                class="hover:text-default-hover text-lite text-[15px] transition-all"
                            >
                                João P. S. Bautista
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="border-t text-center border-default pt-8 mt-8">
                <p class="text-dark text-sm">© 2024 - deVagas</p>
            </div>
        </footer>
    );
};
