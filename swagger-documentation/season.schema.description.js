/**
 * @swagger
 * components:
 *   schemas:
 *     Season:
 *       type: object 
 *       properties:
 *         id:
 *           type: string
 *           description: The Season's id
 *         name:
 *           type: string
 *           description: The Season's name 
 *         season_number:
 *           type: number
 *           description: The Season's number
 *         air_date:
 *           type: string
 *           format: date
 *           description: The date when the Season was released
 *         poster_path:
 *            type: string
 *            description: the path to the poster image
 *       example: 
 *         id: 182137
 *         name: Saison 1
 *         poster_path: /26yQPXymbWeCLKwcmyL8dRjAzth.jpg
 *         air_date":  2022-12-07T00:00:00.000+00:00 
 *         season_number: 1
 */