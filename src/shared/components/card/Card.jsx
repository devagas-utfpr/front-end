import './style.css'
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

function Card({cardInfo, openModal}) {

  return (
    <div className="card">
        <h1>{cardInfo.titulo}</h1>
        <div className="info">
            <p>{cardInfo.empresa}</p>
            <p>{cardInfo.local}</p>
            <p>{cardInfo.dataInicio} - {cardInfo.dataFim}</p>
        </div>
        <p className={`status ${cardInfo.status}`}>{cardInfo.status}</p>
        <button onClick={openModal}>Ver mais <LiaLongArrowAltRightSolid className='icon'/></button>
    </div>
  )
}

export default Card