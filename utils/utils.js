import https from  'https';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config() 

const protocol = (process.env?.NODE_ENV && process.env?.NODE_ENV ==='prod')? https: http;
const host = (process.env?.NODE_ENV && process.env?.NODE_ENV ==='prod')? process.env.Prod_Host : process.env.Dev_Host;
export  {protocol, host};