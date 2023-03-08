import { Schema, model } from "mongoose";
const genreSchema = new Schema({
  id:   {type:Number, required:true}   ,
  name:  {type:String, required:true} ,
});
const gender = model('genre',genreSchema)
export  {gender,genreSchema}
