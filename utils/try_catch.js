import { MyError } from "./Error.js";
import {succes} from './utils.js'
export default async function handleErrors(res, fn,param, next) { 
  try {
    const response =await res.json(await fn(...param));
    succes('    RESPONSE STATUS: 200')
    return response
  } catch (err) {
    if (err instanceof MyError) {
      return res.status(400).json({
        message: "Bad request",
        details: err.message,
      });
    }
    next(err);
  }
}
