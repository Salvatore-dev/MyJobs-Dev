import background from "../assets/tocco3.jpg";

export default function Header() {
  return (
    <header
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className='logo' >
        <p>In origine fu la Parola</p>
        <span>La Bibbia</span>
      </div>
      <div className='header-verse' >
        <p>
          Poi Dio disse: «Facciamo l’uomo a nostra immagine, conforme alla
          nostra somiglianza, e abbiano dominio sui pesci del mare, sugli
          uccelli del cielo, sul bestiame, su tutta la terra e su tutti i
          rettili che strisciano sulla terra».
        </p>
        <span>Gen1,26</span>
      </div>
    </header>
  );
}
