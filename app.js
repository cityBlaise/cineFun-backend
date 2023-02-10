import express from "express";
import { stopConnection, startConnection } from "./model-data/db.connection.js";
import cors from "cors";
import setRoutes from "./utils/setRoutes.js";
import { protocol, host } from "./utils/utils.js"; 
/**
 *on uncaughtException we end the database connection and exit the process
 */
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION\n", err.stack);
  stopConnection();
  process.exit(1);
});

/**
 *  initializing our express server
 */
const app = express();
const server = protocol.createServer(app);
app.use(cors());
const port = process.env.PORT || 1998;

/**
 *  database connection
 */
(async () => {
  try {
    await startConnection();
  } catch (error) {
    console.error(error.message);
    stopConnection();
    process.exit(1);
  }
})();

/**
 *  root path
 */
app.get("/", (req, res) =>
  res.status(200).json({ message: "welcome to you !" })
);

/**
 *  initialize all the business routes
 */
setRoutes(app);

// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  res.status(400).json({ error: "Bad Request" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.message, err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// if (import.meta.url.startsWith("file:")) {
//   const modulePath = url.fileURLToPath(import.meta.url);
//   if (process.argv[1] === modulePath) {
   
//   }

server.listen(port, () => {
  console.log(process.env.NODE_ENV);
  console.log(`cineFun server available at ${host}${port}`);
});
 
