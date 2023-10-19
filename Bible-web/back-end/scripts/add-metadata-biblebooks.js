import fs from 'node:fs/promises'
import axios from 'axios'

export const getBooks = async (req, res) => {
    const result = await axios.get("https://query.bibleget.io/v3/metadata.php?query=biblebooks")
    const udData = result.data

    await fs.writeFile("../db/metadata/biblebooks.json", JSON.stringify(udData, null, '  '))
}

getBooks()