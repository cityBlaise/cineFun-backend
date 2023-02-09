import express from "express";
import { stopConnection, startConnection } from "./model-data/db.connection.js";
import https from "https";
import MovieRouter from './routers/movie.router.js'
import TvShowRouter from './routers/tv_show.router.js'
import cors from 'cors';

//on uncaughtException we end the database connection and exit the process
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION\n", err.stack);
  stopConnection();
  process.exit(1);
});

const app = express();
const server = https.createServer(app);
app.use(cors())
const port = process.env.PORT || 1998;

const handleErrors = (res,fn,next) => { 
    try { 
      return res.json(fn);
    } catch (err) {
      next(err);
    } 
};

//database connection
(async () => {

  try {
    await startConnection();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
})();


//serves static ressources
app.use(express.static("public"));

app.get('/',(req, res)=>res.json({message:"welcome to you !"}))

MovieRouter(app,handleErrors);

TvShowRouter(app,handleErrors);

app.use((err, req, res, next) => {
  console.error(err.message, err.stack)
  res.status(500).json({error: "Internal Server Error"})
})

server.listen(port, () => {
  if (!process.env.PORT)
    console.log("cineFun server available at http://localhost:1998");
});
