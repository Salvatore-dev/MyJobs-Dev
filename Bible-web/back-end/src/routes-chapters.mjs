import axios from "axios";
import indexCei2008 from "../db/metadata/index-version-Cei2008.json" assert { type: "json" };

import { findChapter, insertChapters } from "./mongoDB.mjs";

const books = indexCei2008.indexes.CEI2008.biblebooks;
const abbreviations = indexCei2008.indexes.CEI2008.abbreviations;
const chapterLimit = indexCei2008.indexes.CEI2008.chapter_limit;

//console.log(books);

export const getChapter = async (req, res) => {
  const bookRequest = req.params.book;
  const chapterRequest = req.params.chapter;
  let versionMetaData = "3";
  let checkEster = false;
  if (bookRequest == "Ester") {
    versionMetaData = "1";
    checkEster = true;
  }
  //console.log(bookRequest);
  //console.log(chapterRequest);
  //console.log(abbreviations);
  //console.log(indexRequest);
  //console.log(books.includes(bookRequest));
  //console.log(chapterLimit[indexRequest]);
  const indexRequest = books.indexOf(bookRequest);
  try {
    if (
      books.includes(bookRequest) &&
      chapterRequest <= chapterLimit[indexRequest]
    ) {
      const abbreviation = abbreviations[indexRequest];
      const chapterToFind = abbreviation + chapterRequest;
      const chapter = await findChapter(chapterToFind);
      if (!chapter) {
        let response = false;
        if (checkEster) {
          // nota per Alberto: questo controllo mi serve per aggirare un bug della mia fonte, accedo ad un patch prededente perche nell'ultima i dati che si riferiscono al libro di "ester" sono inconsistenti
          response = await axios.get(
            `https://query.bibleget.io/v${versionMetaData}/?query=${chapterToFind}&version=CEI2008` // vedere questione appid parametro
          );
        } else {
          response = await axios.post(
            `https://query.bibleget.io/v${versionMetaData}/`,
            {
              query: chapterToFind,
              version: "CEI2008",
              appid: "salvatore.tosich.dev@gmail.com",
            }
          );
        }
        const newUpdate = response.data;
        const chapter = { chapter: chapterToFind };
        const newChapter = { ...chapter, ...newUpdate };
        insertChapters(newChapter);
        res.status(201).send({
          data: newUpdate.results,
          message: "chapter created",
        });
      } else {
        res.status(200).send({
          data: chapter.results,
          message: "chapter found",
        });
      }
    } else {
      res.status(400).send({
        data: {},
        error: true,
        message: "book or chapter not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      data: {},
      error: true,
      message: "server problem",
    });
  }
};
