import './style.css'
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

function Card({cardInfo}) {

  function verMais(){
    alert('Abrir tela da vaga')
  }

  return (
    <div className="card">
        <h1>{cardInfo.titulo}</h1>
        <div className="info">
            <p>{cardInfo.empresa}</p>
            <p>{cardInfo.local}</p>
            <p>{cardInfo.data_inicial} - {cardInfo.data_final}</p>
        </div>
        <p className={`status ${cardInfo.status}`}>{cardInfo.status}</p>
        <button onClick={verMais}>Ver mais <LiaLongArrowAltRightSolid className='icon'/></button>
    </div>
  )
}

export default Card