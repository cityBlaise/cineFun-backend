/**
 * @swagger
 * tags:
 *   name: TvShow
 *   description: The Movie manager API
 */
import {isValidInteger} from '../utils/utils.js'
import * as tvShowService from "../services/tvShow.service.js";
export default function (app, handleErrors) {
  /**
   * @swagger
   * /api/TvShow/pages:
   *   get:
   *     summary: Number of pages in which all the TvShow have been split
   *     tags: [TvShow]
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
  app.get("/api/TvShow/pages", async (req, res, next) => {
    return await handleErrors(res, tvShowService.get_tvShow_number_of_pages,[], next);
  });


    /**
   * @swagger
   * /api/TvShow/ordered:
   *   get:
   *     summary: Get the TvShow sorted according to a given field
   *     tags: [TvShow]
   *     parameters:
   *       - in: query
   *         name: genders
   *         schema:
   *           type: [number] 
   *           description: list of gender Id
   *           example: 37,12
   *       - in: query
   *         name: page
   *         schema:
   *           type: number
   *           description: page number
   *           example: 3
   *       - in: query
   *         name: field
   *         schema:
   *           type: string
   *           description: field on which the ordering will be process
   *           example: title
   *       - in: query
   *         name: desc
   *         schema:
   *           type: string
   *           description: describe the type of order (descending | ascending)
   *           example: 1
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/TvShow'
   *       500:
   *         description: Some server error
   *       400:
   *          description: Bad request
   */
  app.get("/api/TvShow/ordered", async (req, res,next) => {
    const page = req.query?.page
    if(!isValidInteger(page) || Number(page)<0){
      return res.status(400).json({
        message:'Bad request',
        details:"the page parameter should be a positive integer"
      })
    }

    const field = req.query?.field || ''
    const desc = req.query?.desc
    if(!isValidInteger(desc) || ![-1,1].includes(Number(desc))){
      return res.status(400).json({
        message:'Bad request',
        details:"the desc parameter can only take [-1,1] as value"
      })
    }

    let genders = req.query?.genders || []
    if(genders.length>0){  
      let gendersArray =  genders.split(',')  
      if(gendersArray.some(element=> !isValidInteger(element) || Number(element)<0))
      return res.status(400).json({
        message:'Bad request',
        details:"the genders should be an array of positive integer"
      })
      genders=gendersArray
    } 
       return handleErrors(res, tvShowService.get_tvShow_sorted, [field,desc,page,genders] ,next);
  });



  /**
 * @swagger
 * /api/TvShow/gender/{genderId}/pages:
 *   get:
 *     summary: Get the number of page of TvShow that belong to a specific gender
 *     tags: [TvShow]
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
  app.get("/api/TvShow/gender/:genderId/pages", async (req, res, next) => {
    let id =req.params.genderId 

    if(!isValidInteger(id) || Number(id)<0)
    return res.status(400).json({
      message:'Bad request',
      details:"the genderId parameter should be a positive integer"
    })
    
    id = Number(id)
    return await handleErrors(
      res,
      tvShowService.number_of_pages_of_a_gender, [id],
      next
    );

  });

  /**
   * @swagger
   * /api/TvShow/gender/{genderId}:
   *   get:
   *     summary: Get the TvShow that belongs to a specific gender and that are inside the specified page number
   *     tags: [TvShow]
   *     parameters:
   *       - in: path
   *         name: genderId
   *         schema:
   *           type: number
   *           required: true
   *           description: page number
   *           example: 12
   *       - in: query
   *         name: page
   *         schema:
   *           type: number 
   *           description: page number
   *           example: 3
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/TvShow'
   *       500:
   *         description: Some server error
   *       400:
   *          description: Bad request
   */
  app.get("/api/TvShow/gender/:genderId", async (req, res, next) => {
    let id =req.params.genderId
    let  page =req.query?.page || 0

    if(!isValidInteger(id) || Number(id)<0)
    return res.status(400).json({
      message:'Bad request',
      details:"the genderId parameter should be a positive integer"
    })
    
    if(!isValidInteger(page) || Number(page)<0)
    return res.status(400).json({
      message:'Bad request',
      details:"the page parameter should be a positive integer"
    })
    
    id = Number(id)
    page = Number(page)
    return await handleErrors(res, tvShowService.get_tvShow_by_gender, [id, page], next);
  });


  /**
 * @swagger
 * /api/TvShow/gender:
 *   get:
 *     summary: List of TvShow belong to some categories
 *     tags: [TvShow]
 *     parameters:
 *       - in: query
 *         name: genders
 *         schema:
 *           type: string
 *           required: true
 *           description: gender of the TvShow
 *           example: 12,99
 *       - in: query
 *         name: page
 *         schema:
 *           type: number 
 *           description: page number
 *           example: 1
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TvShow'
 *       500:
 *         description: Some server error
 *       400:
 *          description: Bad request
 */
  app.get("/api/TvShow/gender", async (req, res, next) => {
    let  page =req.query?.page || 0
    let genders = req.query?.genders || []
    if(genders.length>0){  
      let gendersArray =  genders.split(',')  
      if(gendersArray.some(element=> !isValidInteger(element) || Number(element)<0))
      return res.status(400).json({
        message:'Bad request',
        details:"the genders should be an array of positive integer"
      })
      genders = gendersArray
    } 
    
    if(!isValidInteger(page) || Number(page)<0)
    return res.status(400).json({
      message:'Bad request',
      details:"the page parameter should be a positive integer"
    })
       
      page = Number(page)
      return await handleErrors(res, tvShowService.simlarTvShow, [genders, page], next);
  });



  /**
   * @swagger
   * /api/TvShow:
   *   get:
   *     summary: Get all those TvShow that are contains in the specified page number
   *     tags: [TvShow]
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: number 
   *         description: page number
   *         example: 30
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/TvShow'
   *       500:
   *         description: Some server error
   *       400:
   *          description: Bad request
   */
  app.get("/api/TvShow", async (req, res, next) => {  
    let  page =req.query?.page || 0
  
    if(!isValidInteger(page) || Number(page)<0)
    return res.status(400).json({
      message:'Bad request',
      details:"the page parameter should be a positive integer"
    })
     
    page = Number(page)
    return await handleErrors(res, tvShowService.get_tvShow_randomly, [page], next);
  });


}
