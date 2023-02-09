import { Schema, SchemaTypes, model } from "mongoose";
const tvShowSchema = new Schema({
  adult: Boolean,
  backdrop_path: {type:String, required:true},
  homepage: String,
  id:  {type:Number, required:true} , 
  overview: String,
  popularity: Number,
  genres: [SchemaTypes.ObjectId],
  poster_path:  {type:String, required:true} ,
  release_date: Date,
  revenue: Number,
  runtime: Number,
  status: String,
  title:  {type:String, required:true} , 
  vote_average: Number,
  vote_count: Number,
});
const tvShow = model("serie", tvShowSchema);
export default tvShow;
