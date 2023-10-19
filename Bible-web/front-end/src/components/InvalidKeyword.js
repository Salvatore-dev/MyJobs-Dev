import attention from '../assets/icona-attenzione.jpg'

export function NoKeyword () {
    
    return(
        <div className="request-invalid">

            <div><img src={`${attention}`} alt="immage-attention" ></img></div>
            <p>Ops! parola-chiave non trovata</p>

        </div>
    )
}