import { Schema, model } from "mongoose";
import  {genreSchema} from "./gender.model.js";
const creatorSchema = new Schema({
  id:{
    type: Number, required: true
  },
  name: String, 
  profile_path: String,
})

const seasonSchema =  new Schema({
  id: Number,
  name: String,
  air_date: Date, 
  poster_path: String,
  season_number: Number
})
const tvShowSchema = new Schema({
  id:  {type:Number, required:true} , 
  title:  {type:String, required:true} , 
  adult: Boolean,
  homepage: {type:String, default:''},
  backdrop_path:  {type:String, default:''},
  genres: [genreSchema],
  created_by:[creatorSchema],
  popularity: Number,
  overview: String,
  first_air_date: {type:String, default:''},  
  last_air_date: {type:String, default:''},
  vote_average: Number,
  poster_path:  {type:String, default:''} ,
  number_of_episodes:Number,
  number_of_seasons:Number,
  seasons:{type:[seasonSchema], default:[]},
  vote_count: Number,
});

const tvShow = model("serie", tvShowSchema); 
export default tvShow;
