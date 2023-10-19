import express  from 'express'
import 'dotenv/config' // per usare pocess.env nell'applicazione
import {run} from './mongoDB.mjs'

const app = express()
const port = 8000

import session from "express-session";
app.use(
  session({
    name: `BibleProject`, // eventuale
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false, // true
    cookie: { 
      secure: false,
      // domain: 'localhost',
       httpOnly: true,
      maxAge: 60000 * 60
     }, // un minuto per il numero scelto
  })
);

import  bodyParser from 'body-parser'
app.use(bodyParser.json())

import cors from 'cors'
//app.use(cors())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

import {getIndexVersion} from "./ruotesMetaData.mjs"
import { getChapter } from './routes-chapters.mjs'
import { login, logout, removeFavoritesVerse, signup, upDateFavoritesVerse } from './routes-users.mjs';
import { getKeyword, getVerse } from './ruotesSearches.mjs';


//console.log(process.env.SECRET_SESSION);

function sessionChecked(req, res, next) {
  //console.log("verifico id", req.session.id);
  console.log('utente in sessione', req.session.user);
  if (req.session.user) {
    next();
  } else {
    res.status(403).send({
      error: true,
      message: "unauthorized user",
    });
  }
}
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/metadata/indexes', getIndexVersion) // ok

app.get('/books/:book/chapters/:chapter', getChapter) // ok
app.get('/books/:book/chapters/:chapter/verses/:verse', getVerse) // ok
app.get('/books/keywords/search', getKeyword) // ok

app.post("/users/signup", signup) // ok
app.post("/users/session", login) //ok
app.delete("/users/session", sessionChecked,  logout) // ok


app.put("/users/:username/profile/favorite", sessionChecked, upDateFavoritesVerse) // ok
app.patch("/users/:username/profile/favorite", sessionChecked, removeFavoritesVerse) // ok


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
 run()