import { Schema, model  } from 'mongoose';
  const movieSchema = new Schema({
    adult: Boolean,
    backdrop_path: {type:String, required:true},
    homepage: String,
    id:  {type:Number, required:true} , 
    overview: String,
    popularity: Number,
    genres: [Object],
    poster_path:  {type:String, required:true} ,
    release_date: Date,
    revenue: Number,
    runtime: Number,
    status: String,
    title:  {type:String, required:true} , 
    vote_average: Number,
    vote_count: Number,
  });
  const movie = model('movie', movieSchema)
  export default movie