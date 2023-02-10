import MovieRouter from "../routers/movie.router.js";
import TvShowRouter from "../routers/tv_show.router.js";
import handleErrors from "./try_catch.js";

export default function setRoutes(app){
    MovieRouter(app,handleErrors);
    TvShowRouter(app,handleErrors);
}