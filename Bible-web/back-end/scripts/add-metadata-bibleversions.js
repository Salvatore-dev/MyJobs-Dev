import fs from 'node:fs/promises'
import axios from 'axios'

export const getVersions = async (req, res) => {
    const result = await axios.get("https://query.bibleget.io/v3/metadata.php?query=bibleversions")
    const udData = result.data

    await fs.writeFile("../db/metadata/bibleversions.json", JSON.stringify(udData, null, '  '))
}

getVersions()