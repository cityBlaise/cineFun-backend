import https from  'https';
import http from 'http';
import dotenv from 'dotenv';
import chalk from "chalk";


const log = console.log;
const error = (message)=>log(chalk.red.bold(message))
const succes = (message)=> log(chalk.magenta(message))
const info = (message)=>  log(chalk.blue(message))
const isValidInteger =(value)=>!(isNaN(Number(value)) || !Number.isInteger(Number(value)) )
const formatQueryParams = (object)=>{
    let result =''
    for(let key in object)
    result+= `${key}: ${object[key]}
    \t    `
    return result
}
dotenv.config() 
const port = process.env.PORT || 1998
const databasehost = (process.env?.PORT)? process.env.Mongo_prod : process.env.Mongo_dev;
const protocol = (process.env?.NODE_ENV && process.env?.NODE_ENV ==='prod')? https: http;
const host = process.env?.PORT?`${process.env.Prod_Host}`: `${process.env.Dev_Host}${port}`;
export  {formatQueryParams,info, isValidInteger, protocol, host, port,error, succes, databasehost};