/**
 * @swagger
 * components:
 *   schemas:
 *     TV-SHOW:
 *       type: object 
 *       properties:
 *         id:
 *           type: string
 *           description: id of the TV-SHOW
 *         title:
 *           type: string
 *           description: The title of your TV-SHOW
 *         adulte:
 *            type: boolean
 *            description: TV-SHOW for Adults or not
 *         homepage: 
 *            type: string
 *            description: The home page dedicate to this TV-SHOW
 *         backdrop_path:
 *            type: string
 *            description: the path to the TV-SHOW poster
 *         genres:
 *            type: array
 *            description: list of gender that the TV-SHOW is belong to
 *         popularity:
 *            type: number
 *            description: till how much the TV-SHOW is popular
 *         overview:
 *            type: string
 *            description: a resume of the TV-SHOW
 *         status:
 *           type: string
 *           description: released or not
 *         vote_average:
 *            type: number
 *            description: average of votes for this TV-SHOW
 *         runtime: 
 *            type: number
 *            description: duration
 *         revenue:
 *            type: number
 *            description: Amount of money gained 
 *         release_date:
 *           type: string
 *           format: date
 *           description: The date the TV-SHOW was released
 *         poster_path:
 *            type: string
 *            description: the path to the poster image
 *         vote_count:
 *            type: number
 *            description: number of votes for the TV-SHOW
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