import MovieService from "../services/movie.service.js";
export default function (app, handleErrors) {
  app.get("/api/movie/pages", async (req, res, next) => { 
    handleErrors(res, await MovieService.get_movies_number_of_pages(), next);
  });

  app.get("/api/movie/:page", async (req, res, next) => {
    console.log('ici la');
    const page = Number(req.params.page);
    handleErrors(res, await MovieService.get_movies_randomly(page), next);
  });

  app.get("/api/movie/gender/:genderId/:page", async (req, res, next) => {
    const id = req.params.genderId;
    const page = Number(req.params.page);
    handleErrors(res, await MovieService.get_movie_by_gender(id, page), next);
  });

  app.get("/api/movie/gender/:genderId/pages", async (req, res, next) => {
    const id = req.params.genderId; 
    handleErrors(res, await MovieService.number_of_pages_of_a_gender(id), next);
  });
}
