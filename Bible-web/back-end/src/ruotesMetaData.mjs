import indexCei2008 from "../db/metadata/index-version-Cei2008.json" assert { type: "json" };
import indexLuzzi from "../db/metadata/index-version-LUZZI.json" assert { type: "json" };

const versionIndexCEI =
  "https://query.bibleget.io/metadata.php?query=versionindex&versions=CEI2008"; // il secondo parametro della quesry vuole la versione, vedi quelle supportate in versions. // puo essere inpostato come variabile per differenziare le versioni richieste
const vesionIndexLuzzi =
  "https://query.bibleget.io/metadata.php?query=versionindex&versions=LUZZI";

export const getIndexVersion = (req, res) => {
  try {
    res.status(200).send({
      message:
        "controlla struttura dati, accedi Cei con .data.Cei; accedi LUZZI con .data.Luzzi",
      data: {
        Cei: indexCei2008,
        Luzzi: indexLuzzi,
      },
      origins: {
        Cei: versionIndexCEI,
        Luzzi: vesionIndexLuzzi,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      data: {},
      error: true,
      message: error.message,
    });
  }
};
