import tvShowService from "../services/tvShow.service.js";
export default function (app, handleErrors) {
  app.get("/api/tvShow/pages", async (req, res, next) => { 
    handleErrors(res, await tvShowService.get_tvShow_number_of_pages(), next);
  });

  app.get("/api/tvShow/:page", async (req, res, next) => { 
    const page = Number(req.params.page);
    handleErrors(res, await tvShowService.get_tvShow_randomly(page), next);
  });

  app.get("/api/tvShow/gender/:genderId/:page", async (req, res, next) => {
    const id = req.params.genderId;
    const page = Number(req.params.page);
    handleErrors(res, await tvShowService.get_tvShow_by_gender(id, page), next);
  });

  app.get("/api/tvShow/gender/:genderId/pages", async (req, res, next) => {
    const id = req.params.genderId; 
    handleErrors(res, await tvShowService.number_of_pages_of_a_gender(id), next);
  });
}
