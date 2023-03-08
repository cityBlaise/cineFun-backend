/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object 
 *       properties:
 *         id:
 *           type: string
 *           description: id of the Movie
 *         title:
 *           type: string
 *           description: The title of your Movie
 *         adulte:
 *            type: boolean
 *            description: Movie for Adults or not
 *         homepage: 
 *            type: string
 *            description: The home page dedicate to this Movie
 *         backdrop_path:
 *            type: string
 *            description: the path to the Movie poster
 *         genres:
 *            type: array 
 *            items:
 *              $ref: '#/components/schemas/Gender'
 *            description: list of gender that the Movie is belong to
 *         popularity:
 *            type: number
 *            description: till how much the Movie is popular
 *         overview:
 *            type: string
 *            description: a resume of the Movie
 *         status:
 *           type: string
 *           description: released or not
 *         vote_average:
 *            type: number
 *            description: average of votes for this Movie
 *         runtime: 
 *            type: number
 *            description: duration
 *         revenue:
 *            type: number
 *            description: Amount of money gained 
 *         release_date:
 *           type: string
 *           format: date
 *           description: The date the Movie was released
 *         poster_path:
 *            type: string
 *            description: the path to the poster image
 *         vote_count:
 *            type: number
 *            description: number of votes for the Movie
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