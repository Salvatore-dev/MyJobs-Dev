const Foot = () => {
  return (
    <footer>
      <div className="footer-informations">
        <div className="general-informations">
          <h2>Informazioni</h2>
          <div className="details-footer">
            <p>Nome del progetto: </p>
            <span>"In origine fu la Parola"</span>
          </div>
          <div className="details-footer">
            <p>Nome autore: </p>
            <span>Salvatore Tosich</span>
          </div>
          <div className="details-footer">
            <p>Email: </p>
            <span>"salvatore.tosich.dev@gmail.com"</span>
          </div>
          <div className="details-footer">
            <p>Dettagli: </p>{" "}
            <span>
              Il presente progetto è realizzato come "prova finale" del "Corso
              Web Developer Full Stack" della "Digitazon Tech School".
            </span>
          </div>
          <div className="details-footer">
            <p>Note sul testo utilizzato: </p>
            <span>I testi della Bibbia offerti si riferiscono alla traduzione italiana "CEI2008", della ""Conferenza Episcopale italiana".</span>
          </div>
        </div>
        <div className="space">
        </div>
        <div className="mandatory citations">
          <h2>Ringraziamenti</h2>
          <p>
            Questo progetto è stato realizzato anche grazie alle risorse
            "open-source" messe a disposizione da "BibleGet-I-O":{" "}
            <a href="https://www.bibleget.io/" target="_blank" >www.bibleget.io</a>, attraverso i
            seguenti{" "}
            <a href="https://github.com/BibleGet-I-O/endpoint" target="_blank" >Endpoints</a>.
          </p>
          <p>
            Grazie a tutti per il fantastico corso di web developer! Siete stati
            degli insegnanti straordinari, pazienti e appassionati. Ora posso
            cimentarmi nella creazione di siti web grazie a voi. Sono grato per
            le conoscenze acquisite e non vedo l'ora di mettere in pratica tutto
            ciò che ho imparato. Grazie ancora!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Foot;
