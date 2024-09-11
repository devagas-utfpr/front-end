export const Paginacao = ({ paginaAtual, totalPaginas }) => {
    // Se há apenas uma página, não exibe a paginação
    if (totalPaginas <= 1) return null;

    const paginas = [];
    for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(
            <li
                key={i}
                className={`flex items-center justify-center shrink-0 cursor-pointer text-sm font-bold w-9 h-8 rounded ${
                    paginaAtual === i ? "bg-lite text-white" : "text-white"
                }`}
            >
                {i}
            </li>
        );
    }

    return (
        <ul className="flex space-x-3 justify-center mt-8">
            {/* Seta para página anterior, visível apenas se não for a primeira página */}
            {paginaAtual > 1 && (
                <li className="flex items-center justify-center shrink-0 cursor-pointer bg-lite w-9 h-8 rounded">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 fill-gray-500"
                        viewBox="0 0 55.753 55.753"
                    >
                        <path d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z" />
                    </svg>
                </li>
            )}

            {/* Números de página */}
            {paginas}

            {/* Seta para próxima página, visível apenas se não for a última página */}
            {paginaAtual < totalPaginas && (
                <li className="flex items-center justify-center shrink-0 cursor-pointer bg-lite w-9 h-8 rounded">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 fill-white rotate-180"
                        viewBox="0 0 55.753 55.753"
                    >
                        <path d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z" />
                    </svg>
                </li>
            )}
        </ul>
    );
};
