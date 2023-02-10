/**
 * @swagger
 * tags:
 *   name: Movie
 *   description: The Movie managing API
 */
import MovieService from "../services/movie.service.js";

export default function (app, handleErrors) {
  /**
   * @swagger
   * /api/movie/pages:
   *   get:
   *     summary: Number of pages in which all the Movies have been split
   *     tags: [Movie]
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  pages:
   *                    type: integer
   *                    minimum: 1
   *                    example: 4
   *       500:
   *         description: Some server error
   */
  app.get("/api/movie/pages", async (req, res, next) => {
    handleErrors(res, await MovieService.get_movies_number_of_pages(), next);
  });

  /**
   * @swagger
   * /api/movie/{page}:
   *   get:
   *     summary: List of Movies contains in the  nth page
   *     tags: [Movie]
   *     parameters:
   *       - in: path
   *         name: page
   *         schema:
   *           type: number
   *         required: true
   *         description: page number
   *         example: 30
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Movie'
   *       500:
   *         description: Some server error
   *       400:
   *          description: Bad request
   */
  app.get("/api/movie/:page", async (req, res, next) => {
    const page = Number(req.params.page);
    if (page < 1) {
      console.log(page);
      res.status(303).redirect(`/badRequest`);
    } else
      handleErrors(res, await MovieService.get_movies_randomly(page), next);
  });

  /**
   * @swagger
   * /api/movie/gender/{genderId}/pages:
   *   get:
   *     summary: Returns the number of pages when we the movies have been split in block; those movie belong to the categorie corresponding to the genderId
   *     tags: [Movie]
   *     parameters:
   *       - in: path
   *         name: genderId
   *         schema:
   *           type: number
   *           required: true
   *           description: page number
   *           example: 12
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *               schema:
   *                type: object
   *                properties:
   *                   pages:
   *                     type: integer
   *                     example: 4
   *       500:
   *         description: Some server error
   *       400:
   *          description: Bad request
   */
  app.get("/api/movie/gender/:genderId/pages", async (req, res, next) => {
    const id = Number(req.params.genderId);
    if (id < 1) {
      console.log(id);
      res.status(303).redirect(`/badRequest`);
    } else
      return await handleErrors(
        res,
        await MovieService.number_of_pages_of_a_gender(id),
        next
      );
  });

  /**
   * @swagger
   * /api/movie/gender/{genderId}/{page}:
   *   get:
   *     summary: List of Movies contains in the nth page that belong to the categorie that the id is genderId
   *     tags: [Movie]
   *     parameters:
   *       - in: path
   *         name: genderId
   *         schema:
   *           type: number
   *           required: true
   *           description: page number
   *           example: 12
   *       - in: path
   *         name: page
   *         schema:
   *           type: number
   *           required: true
   *           description: page number
   *           example: 3
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Movie'
   *       500:
   *         description: Some server error
   *       400:
   *          description: Bad request
   */
  app.get("/api/movie/gender/:genderId/:page", async (req, res, next) => {
    const id = Number(req.params.genderId);
    const page = Number(req.params.page);
    if (page < 1 || id < 1) res.status(303).redirect(`/badRequest`);
    else
      handleErrors(res, await MovieService.get_movie_by_gender(id, page), next);
  });
}
