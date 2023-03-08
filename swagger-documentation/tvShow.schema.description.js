/**
 * @swagger
 * components:
 *   schemas:
 *     TvShow:
 *       type: object 
 *       properties:
 *         id:
 *           type: number
 *           description: id of the TvShow
 *         title:
 *           type: string
 *           description: The title of the TvShow
 *         adulte:
 *            type: boolean
 *            description: TvShow for Adults or not
 *         homepage: 
 *            type: string
 *            description: The home page dedicated to the TvShow
 *         backdrop_path:
 *            type: string
 *            description: the path to the TvShow poster
 *         created_by:
 *            type: array
 *            items:
 *               $ref: '#/components/schemas/Author'
 *            description: the authors of the TvShow
 *         genres:
 *            type: array
 *            items:
 *               $ref: '#/components/schemas/Gender'
 *            description: list of gender that the TvShow is belong to
 *         popularity:
 *            type: number
 *            description: till how much the TvShow is popular
 *         overview:
 *            type: string
 *            description: a summary of the TvShow
 *         first_air_date:
 *           type: string
 *           format: date
 *           description: The first released date
 *         last_air_date:
 *           type: string
 *           format: date
 *           description: The last released date
 *         vote_average:
 *            type: number
 *            description: average of votes for this TvShow
 *         number_of_episodes:
 *            type: number
 *            description: number of votes for the TvShow
 *         number_of_seasons:
 *            type: number
 *            description: number of votes for the TvShow
 *         seasons:
 *            type: array
 *            items:
 *               $ref: '#/components/schemas/Season'
 *            description: List of season of the TvShow
 *         vote_count:
 *            type: number
 *            description: number of votes for the TvShow
 *         poster_path:
 *            type: string
 *            description: the path to the poster image
 *       example:
 *         adult: false
 *         backdrop_path: /5pMy5LF2JAleBNBtuzizfCMWM7k.jpg
 *         id: 653851
 *         overview: "Jonathan Majors et Glen Powell sont les vedettes de l'histoire vraie épique et inspirante de deux pilotes de chasse d'élite de la marine américaine qui ont contribué à renverser le cours de la bataille la plus brutale de la guerre de Corée : Jesse Brown, le premier aviateur noir de l'histoire de la marine, et son collègue pilote de chasse et ami, Tom Hudner. Leurs sacrifices héroïques et leur amitié tenace ont fait d'eux les pilotes d'élite les plus célèbres de la marine."
 *         popularity: 2256.342
 *         genres: [{id: 12, name: aventure}]
 *         poster_path: /26yQPXymbWeCLKwcmyL8dRjAzth.jpg
 *         release_date":  2022-12-07T00:00:00.000+00:00
 *         revenue: 20000000
 *         runtime: 139
 *         status: Released
 *         title: Devotion
 *         vote_average: 7.6
 *         vote_count: 186  
 * 
 */