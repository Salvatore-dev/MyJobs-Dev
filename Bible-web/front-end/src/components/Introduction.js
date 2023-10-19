import CEI2008 from "../data/index-version-Cei2008.json";
const books = CEI2008.indexes.CEI2008.biblebooks;
const abbreviations = CEI2008.indexes.CEI2008.abbreviations;
const chaptersLimit = CEI2008.indexes.CEI2008.chapter_limit;
const verseLimit = CEI2008.indexes.CEI2008.verse_limit;

const oldTestament = books.slice(0, 46); // 46 e l'indice del libro di matteo
const newTestament = books.slice(46);

export default function Introduction(params) {
  return (
    <div className="introduction">
      <h1>Benvenuto nel sito "In origine fu la Parola"</h1>
      <p className="invitation">
        Qui potrai consultare le pagine della Bibbia e trovare spunto per la tua
        riflessione e la tua preghiera
      </p>
      <h4>
        Scegli se vuoi consultare un
        libro del Antico Testamento oppure del Nuovo Testamento, scegli il libro
        corrispondente e scelgi il versetto.
      </h4>
      <br></br>
      <h2>I Libri dell'Antico Testamento sono: </h2>
      <ol className="list-book">
        {oldTestament.map((book, i) => (
          <li key={i}>{book} <span>" {abbreviations[i]} "</span></li>
        ))}
      </ol>
      <br></br>
      <h2>I Libri del Nuovo Testamento sono: </h2>
      <ol className="list-book">
        {newTestament.map((book, i) => (
          <li key={i}>{book} <span>" {abbreviations[i + 46]} "</span></li>
        ))}
      </ol>
      <br></br>
      <h5>Alrimenti...</h5>
      
      <h4>
        Scegli i versetti che ti interessano di un libro,
        selezionando il tipo di ricerca corrispondente.
      </h4>
      <p className="istruction-research">Per selezionare una serie di versetti specifici devi indicare l'abbreviazione del libro che cerchi seguito dal numero del capitolo desiderato, poi dopo una virgola ",", indica il numero del versetto, e se sono piu di uno inserisci un trattino "-" tra il primo e l'ultimo versetto cercato.</p>
      <p className="istruction-research">Ecco degli esempi: "Mc3,2" oppure "1Cor2, 3-5".</p>
      
      <br></br>
      <h5>Alrimenti...</h5>
      <h4>
        Scegli un argomento quindi inserisci il
        tema che vuoi cercare nelle pagine della Bibbia, selezionando il tipo di ricerca corrispondente.
      </h4>
    </div>
  );
}
