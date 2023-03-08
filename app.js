import express from "express";
import { startConnection } from "./model-data/db.connection.js";
import cors from "cors";
import setRoutes from "./utils/setRoutes.js";
import { protocol, host, port,databasehost, error as erreur, succes, info, formatQueryParams } from "./utils/utils.js";
import * as url from "node:url";
import swaggerInit from "./swagger-documentation/swagger.init.js";

let dataBaseConnectionAttentLimit = 5;
/**
 *on uncaughtException we end the database connection and exit the process
 */
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION city\n", err.stack);
  // stopConnection();
  // process.exit(1);
});

/**
 *  initializing our express server
 */
const app = express();
const server = protocol.createServer(app);
app.use((req, res, next) => {
  res.set("x-powered-by", "Blaise Nkwanhou Sitchi");
  next();
});

app.use(cors());

/**
 *  database connection
 */
await (async () => {
  let connected = false;
  while (!connected && dataBaseConnectionAttentLimit > 0) {
    try {
      await startConnection();
      connected = true;
      succes("Connection established with the data ...");
      succes(`database name: ${databasehost}`);
      return
    } catch (error) {
      dataBaseConnectionAttentLimit--;
      let attend = dataBaseConnectionAttentLimit > 1 ? "attends" : "attend";
      erreur(
        `Error during the connection to the database${error.message}\n ${dataBaseConnectionAttentLimit} ${attend} remainning`
      );
    }
  }
  succes('process exit')
  process.exit(1);
})();

app.use((req, res, next) => {
  info(
    `\nGot a new ${req.method} request 
    from: ${req.ip}
    path: ${req.path} 
    params: ${formatQueryParams(req.query)}`);
  next();
});

/**
 *  initialize all the business routes
 */
setRoutes(app); 

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  erreur("Server Internal error\n"+err.message+"\n"+ err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

/**
 * Enable Swagger documentation for this API
 */
swaggerInit(host, app);

/**
 *  root path redirect to the swagger page of the API
 */



if (import.meta.url.startsWith("file:")) {
  const modulePath = url.fileURLToPath(import.meta.url);
  if (process.argv[1] === modulePath) {
    server.listen(port, () => {
      console.log(process.env.NODE_ENV);
      console.log(`cineFun server available at ${host}`);
    });
  }
}

export default app;
