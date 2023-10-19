# Primo Server 
Per installare le dipendenze 
```
npm install
```
Per far partire il server : 
```
npm start
```
Per far partire il server in development mode:
```
npm run dev
```
src: https://github.com/BibleGet-I-O/endpoint#

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
}); // da spiegazione alberto, per gestire chiamate client-server in index abilitare il cors

app.use(cors) // questa la versione piu aggiornata

 
serve npm install corse // istallare corse, bisogna importarlo nell'index

vedi https://expressjs.com/en/resources/middleware/cors.html