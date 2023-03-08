import tvShow from "../model-data/tvShow.model.js"; 
import {isValidInteger} from '../utils/utils.js';
import { MyError } from "../utils/Error.js";
import dotenv from "dotenv";
dotenv.config();


const ItemPerPage = Number(process.env.ItemPerPage);
const SearchField = [
  "popularity",
  "first_air_date",
  "title",
  "number_of_seasons",
  "created_by",
];

/**
 * @date 2023-02-09
 * @param {Number} page
 * @param {Number} ItemPerPage
 * @returns {Number}
 * tells you how elements you should skip to get the first element according to the page number
 */
const number_of_item_to_skip = (page, ItemPerPage) =>(page - 1 >= 0 ? page - 1 : 0) * ItemPerPage;

/**
 * @date 2023-02-09
 * @param {Number} genderId
 * @returns {Promise<Number>}
 * returns the number of movie belong to a gender
 */
export async function number_of_tvShow_belong_to_a_gender(genderId) {
  if (
    isNaN(genderId) ||
    Number(genderId) < 1 ||
    !Number.isInteger(Number(genderId))
  )
  throw new MyError("The gender id should be and a positive integer");
  return await tvShow.count({
    "genres.id": {
      $in: [genderId],
    },
  });
}

/**
 * @date 2023-02-09
 * @param {Number} page
 * @returns {Promise<tvShow>}
 * returns movies according to their order in the data base in which they are store randomly and the paggination order .
 */
export async function get_tvShow_randomly(page) { 
  return await tvShow
    .find({})
    .sort({id:1})
    .skip(number_of_item_to_skip(page, ItemPerPage))
    .limit(Number(ItemPerPage));
}

/**
 * @date 2023-02-09
 * @returns {Promise<Number>}
 * returns a integer corresponding to the number of page when we split the tv show in blocks of (ItemPerPage)
 */
export async function get_tvShow_number_of_pages() {
  const quantity = await tvShow.countDocuments();
  return {
    pages: Math.ceil(quantity / ItemPerPage),
  };
}

/**
 * @date 2023-02-09
 * @param {Number} genderId
 * @param {Number} page
 * @returns {Promise<tvShow>}
 * returns all the tv show which correspond to this gender and which are in nth page block
 */
export async function get_tvShow_by_gender(genderId, page) {
  if (isNaN(page) || Number(page) < 0 || !Number.isInteger(Number(page)))
    throw new MyError("The page number should be and a positive integer"); 
     
  return await tvShow
    .find({ "genres.id": {$in: [genderId]}})
    .sort({id:1})
    .skip(number_of_item_to_skip(page, ItemPerPage))
    .limit(Number(ItemPerPage));
}

/**
 * @date 2023-02-09
 * @param {any} genderId
 * @returns {Promise<any>}
 */
export async function number_of_pages_of_a_gender(genderId) {
  const total = await number_of_tvShow_belong_to_a_gender(genderId);
  const result = Math.ceil(total / ItemPerPage);
  return { pages: result };
}

//------------------

/**
 * @date 2023-02-13
 * @param {any} order=-1
 * @param {any} page=1
 * @returns {Prmoise<tvShow>}
 * return the tv show belong to the nth page when the movies are
 * order either in ascending or descending alphabetic order
 */
export async function get_tvShow_sorted(
  field = "title",
  order = 1,
  page = 1,
  genres = []
) {
  if (!SearchField.includes(field))
  throw new MyError(`Unknown field *${field}* `);
  order = Number(order);
  page = Number(page);
  if (genres.length == 0) {
    switch (field) {
      case "title":
        return await sort_by_title(order, page);
      case "created_by":
        return await sort_by_author(order, page);
      case "number_of_seasons":
        return await sort_by_number_of_seasons(order, page);
      case "popularity":
        return await sort_by_popularity(order, page);
      case "first_air_date":
        return await sort_by_release_date(order, page);
    }
  } else {
    switch (field) {
      case "title":
        return await sort_by_title(order, page, genres);
      case "created_by":
        return await sort_by_author(order, page, genres);
      case "number_of_seasons":
        return await sort_by_number_of_seasons(order, page, genres);
      case "popularity":
        return await sort_by_popularity(order, page, genres);
      case "first_air_date":
        return await sort_by_release_date(order, page, genres);
    }
  }
}

/**
 * 描述
 * @date 2023-02-13
 * @param {any} order=1
 * @param {any} page=1
 * @returns {Promise<any>}
 * returns the tv show inside the nth page sorted according to the title
 */
export async function sort_by_title(order = 1, page = 1, genres = []) {
  if (genres.length == 0) {
    return await tvShow
      .find( { title: { $not: { $eq: "" } } })
      .sort({ title: order })
      .collation({ locale: "en", strength: 1 })
      .skip(number_of_item_to_skip(page, ItemPerPage))
      .limit(ItemPerPage);
  }else{
    return await tvShow
      .find({ 
          title: { $not: { $eq: "" } } ,
          "genres.id": { $in: genres  },
       })
      .sort({ title: order })
      .collation({ locale: "en", strength: 1 })
      .skip(number_of_item_to_skip(page, ItemPerPage))
      .limit(ItemPerPage);
  }
}

/**
 * 描述
 * @date 2023-02-13
 * @param {any} order=1
 * @param {any} page=1
 * @returns {Promise<tvShow>}
 * returns the tv show inside the nth page sorted according to the revenue
 */
async function sort_by_author(order = 1, page = 1, genres = []) {
  if (genres.length == 0) {
    return await tvShow
      .find( { "created_by.name ": { $not: { $eq: "" } } })
      .sort({ "created_by.name": order })
      .collation({ locale: "fr", strength: 1 })
      .skip(number_of_item_to_skip(page, ItemPerPage))
      .limit(ItemPerPage);
  }else {
      
    return await tvShow.find(
        {
          "created_by.name": { $not: { $eq: "" } },
          "genres.id": { $in: genres  },
        }
      )
      .sort({ "created_by.name": order })
      .collation({ locale: "fr", strength: 1 })
      .skip(number_of_item_to_skip(page, ItemPerPage))
      .limit(ItemPerPage);
  }
}


/**
 * 描述
 * @date 2023-02-13
 * @param {any} order=1
 * @param {any} page=1
 * @returns {Promise<tvShow>}
 * returns the tv show inside the nth page sorted according to the popularity
 */
async function sort_by_popularity(order = 1, page = 1, genres=[]) {
  if (genres.length == 0) {
  return await tvShow
    .find({ popularity: { $gt: 0 } })
    .sort({ popularity: order })
    .skip(number_of_item_to_skip(page, ItemPerPage))
    .limit(ItemPerPage);
  }else{
    return await tvShow
      .find(
        { 
          popularity: { $gt: 0 } ,
          "genres.id": { $in: genres  },
      })
      .sort({ popularity: order })
      .skip(number_of_item_to_skip(page, ItemPerPage))
      .limit(ItemPerPage);
  }
}

/**
 * 描述
 * @date 2023-02-13
 * @param {any} order=1
 * @param {any} page=1
 * @returns {Promise<tvShow>}
 * returns the tv show inside the nth page sorted according to the runtime
 */
async function sort_by_number_of_seasons(order = 1, page = 1, genres=[]) {
  if (genres.length == 0) {
  return await tvShow
    .find({ number_of_seasons: { $gt: 0 } })
    .sort({ number_of_seasons: order })
    .skip(number_of_item_to_skip(page, ItemPerPage))
    .limit(ItemPerPage);
  }else{
    return await tvShow
      .find(
        { 
          number_of_seasons: { $gt: 0 } ,
          "genres.id": { $in: genres  },
        }
      )
      .sort({ number_of_seasons: order })
      .skip(number_of_item_to_skip(page, ItemPerPage))
      .limit(ItemPerPage);
  }
}

/**
 * 描述
 * @date 2023-02-13
 * @param {any} order=1
 * @param {any} page=1
 * @returns {Promise<tvShow>}
 * returns the tv show inside the nth page sorted according to the release date
 */
async function sort_by_release_date(order = 1, page = 1, genres=[]) {
  if (genres.length == 0) {
  return await tvShow
    .find({ first_air_date: { $not: { $eq: "" } } })
    .sort({ first_air_date: order })
    .skip(number_of_item_to_skip(page, ItemPerPage))
    .limit(ItemPerPage);
  }else{
    return await tvShow
      .find(
        { 
          first_air_date: { $not: { $eq: "" } } ,
          "genres.id": { $in: genres  },
        }
      )
      .sort({ first_air_date: order })
      .skip(number_of_item_to_skip(page, ItemPerPage))
      .limit(ItemPerPage);

  }
}

export async function simlarTvShow(genres=[],page=0) {
  if (genres.some(element=> !isValidInteger(element) || Number(element)<0))
  throw new MyError("The gender array should contains positive integer");

  if(!isValidInteger(page) || Number(page)<0)
  throw new MyError("The page number parameter should be a positive integer");

  const results = await tvShow
  .find({ "genres.id":{$in: genres} })
  .sort({id:1})
  .skip(number_of_item_to_skip(page, ItemPerPage))
  .limit(ItemPerPage);

  const totalPage = await tvShow.countDocuments({ "genres.id":{$in: genres} })

  return  {
    results: await results,
    totalPage:   Math.ceil(await totalPage / ItemPerPage)
  }
 }


