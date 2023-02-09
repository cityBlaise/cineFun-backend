import { Schema, SchemaTypes, model,  } from 'mongoose';
// const movieSchema = new Schema({
//     adult: Boolean,
//     backdrop_path: String,
//     homepage: String,
//     id: {type:Number, required: true}, 
//     overview: String,
//     popularity: Number,
//     genres: [SchemaTypes.ObjectId],
//     poster_path: {type:String, required: true},
//     release_date: Date,
//     revenue: Number,
//     runtime: Number,
//     status: String,
//     title: {type:String, required: true}, 
//     vote_average: Number,
//     vote_count: Number,
//   });

  const movieSchema = new Schema({
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
  const movie = model('movie', movieSchema)
  export default movie