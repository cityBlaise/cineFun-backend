import https from  'https';
import http from 'http';
import dotenv from 'dotenv';
import chalk from "chalk";


const log = console.log;
const error = (message)=>log(chalk.red.bold(message))
const succes = (message)=> log(chalk.magenta(message))
 
dotenv.config() 
const port = process.env.PORT || 1998
const databasehost = process.env.Mongo_dev || process.env.Mongo_prod;
const protocol = (process.env?.NODE_ENV && process.env?.NODE_ENV ==='prod')? https: http;
const host = process.env.Prod_Host?`${process.env.Prod_Host}${port}`: `${process.env.Dev_Host}${port}`;
export  {protocol, host, port,error, succes, databasehost};