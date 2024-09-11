import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

export const Card = ({ cardInfo, isEmpresa }) => {
    return (
        <div class="bg-white rounded overflow-hidden">
            <div class="p-6">
                {cardInfo.status ? (
                    <div class="w-2/5 flex items-center text-green-700 text-sm bg-green-50 px-3 py-1.5 tracking-wide rounded-full">
                        <p class="text-mobile"> Em andamento</p>
                        <div className="w-2 h-2 rounded-full bg-green-700 animate-pulse ml-2"></div>
                    </div>
                ) : (
                    <div class="w-2/5 flex items-center text-red-700 text-sm bg-red-50 px-3 py-1.5 tracking-wide rounded-full">
                        <p class="text-mobile"> Finalizado</p>
                        <div className="w-2 h-2 rounded-full bg-red-700 ml-2"></div>
                    </div>
                )}
                <h4 class="text-lg font-bold text-default mt-4">
                    {cardInfo.titulo.length > 25
                        ? `${cardInfo.titulo.substring(0, 25)}...`
                        : cardInfo.titulo}
                </h4>
                <span class="bg-lite px-2 py-1 text-mobile text-white rounded">
                    {cardInfo.modalidade}
                </span>
                <h4 class="text-sm font-bold text-default mt-4">
                    {cardInfo.empresa}
                </h4>
                <h4 class="text-sm text-gray-500 mb-3">{cardInfo.local}</h4>
                <p class="text-default text-sm font-semibold mt-4">
                    {cardInfo.dataInicio} à {cardInfo.dataFim}
                </p>
                {isEmpresa ? (
                    <div className="flex space-x-4 mt-4">
                        <a className="inline-block px-4 py-2 rounded tracking-wider bg-blue-500 hover:bg-default-hover text-white text-sm cursor-pointer">
                            <MdEdit className="inline-block" />
                        </a>
                        <a className="inline-block px-4 py-2 rounded tracking-wider bg-red-500 hover:bg-default-hover text-white text-sm cursor-pointer">
                            <IoMdTrash className="inline-block" />
                        </a>
                    </div>
                ) : (
                    <a
                        // onClick={openModal}
                        class="mt-4 inline-block px-4 py-2 rounded tracking-wider bg-lite hover:bg-default-hover text-white text-[13px] cursor-pointer"
                    >
                        Saiba mais <span>&rarr;</span>
                    </a>
                )}
            </div>
        </div>
    );
};

//   return (
//     <div className="card">
//         <h1>{cardInfo.titulo}</h1>
//         <div className="info">
//             <p>{cardInfo.empresa}</p>
//             <p>{cardInfo.local}</p>
//             <p>{cardInfo.dataInicio} - {cardInfo.dataFim}</p>
//         </div>
//         <p className={`status ${cardInfo.status}`}>{cardInfo.status}</p>
//         <button onClick={openModal}>Ver mais <LiaLongArrowAltRightSolid className='icon'/></button>
//     </div>
//   )
