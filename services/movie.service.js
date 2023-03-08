import movie from "../model-data/movie.model.js";
import { gender } from "../model-data/gender.model.js";
import { MyError } from "../utils/Error.js";
import {isValidInteger} from '../utils/utils.js';
import dotenv from "dotenv";
dotenv.config();

const ItemPerPage = Number(process.env.ItemPerPage);
const SearchField = [
  "popularity",
  "release_date",
  "title",
  "revenue",
  "runtime",
];

/**
 * @date 2023-02-09
 * @param {Number} page
 * @param {Number} ItemPerPage
 * @returns {Number}
 * tells you how elements you should skip to get the first element according to the page number
 */
const number_of_item_to_skip = (page, ItemPerPage) =>
  (page - 1 >= 0 ? page - 1 : 0) * ItemPerPage;
const genderObjectId = async (genders) =>
  await gender.find(
    {
      id: {
        $in: genders,
      },
    },
    { _id: 1 }
  );

/**
 * @date 2023-02-09
 * @param {Number} genderId
 * @returns {Promise<Number>}
 * returns the number of movie belong to a gender
 */
export async function number_of_movie_belong_to_a_gender(genderId) {
  if (
    isNaN(genderId) ||
    Number(genderId) < 1 ||
    !Number.isInteger(Number(genderId))
  )
    throw new MyError("The gender id should be and a positive integer");

  const mongoId = await gender.findOne({ id: genderId }, { _id: 1 });
  if (mongoId == null) return 0;
  return await movie.count({
    genres: {
      $in: [mongoId._id],
    },
  });
}

/**
 * @date 2023-02-09
 * @param {Number} page
 * @returns {Promise<movie>}
 * returns movies according to their order in the data base in which they are store randomly and the paggination order .
 */
export async function get_movies_randomly(page) { 
  return await movie
    .aggregate([
      {
        $lookup: {
          from: "genres",
          localField: "genres",
          foreignField: "_id",
          as: "genres",
        },
      },
      {
        $unwind: "$genres",
      },

      {
        $group: {
          _id: "$_id",
          movie: { $first: "$$ROOT" },
          genres: {
            $push: {
              name: "$genres.name",
              id: "$genres.id",
            },
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: ["$movie", { genres: "$genres" }] },
        },
      },
    ])
    .sort({id:1})
    .skip(number_of_item_to_skip(page, ItemPerPage))
    .limit(Number(ItemPerPage));
}

/**
 * @date 2023-02-09
 * @returns {Promise<Number>}
 * returns a integer corresponding to the number of page when we split the movies in blocks of (ItemPerPage)
 */
export async function get_movies_number_of_pages() {
  const quantity = await movie.countDocuments();
  return {
    pages: Math.ceil(quantity / ItemPerPage),
  };
}

/**
 * @date 2023-02-09
 * @param {Number} genderId
 * @param {Number} page
 * @returns {Promise<movie>}
 * returns all the movie which correspond to this gender and which are in nth page block
 */
export async function get_movie_by_gender(genderId, page) {
  if (isNaN(page) || Number(page) < 1 || !Number.isInteger(Number(page)))
    throw new MyError("The page number should be and a positive integer");
  const mongoId = await gender.findOne({ id: genderId }, { _id: 1 });
  if (!mongoId) return [];
  return await movie
    .aggregate([
      {
        $match: {
          genres: mongoId._id,
        },
      },
      {
        $lookup: {
          from: "genres",
          localField: "genres",
          foreignField: "_id",
          as: "genres",
        },
      },
      {
        $unwind: "$genres",
      },

      {
        $group: {
          _id: "$_id",
          movie: { $first: "$$ROOT" },
          genres: {
            $push: {
              name: "$genres.name",
              id: "$genres.id",
            },
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: ["$movie", { genres: "$genres" }] },
        },
      },
    ])
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
  const total = await number_of_movie_belong_to_a_gender(genderId);
  const result = Math.ceil(total / ItemPerPage);
  return { pages: result };
}

//------------------

/**
 * @date 2023-02-13
 * @param {any} order=-1
 * @param {any} page=1
 * @returns {Prmoise<movie>}
 * return the movie belong to the nth page when the movies are
 * order either in ascending or descending alphabetic order
 */
export async function get_movie_sorted(
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
      case "revenue":
        return await sort_by_revenue(order, page);
      case "runtime":
        return await sort_by_runtime(order, page);
      case "popularity":
        return await sort_by_popularity(order, page);
      case "release_date":
        return await sort_by_release_date(order, page);
    }
  } else {
    switch (field) {
      case "title":
        return await sort_by_title(order, page, genres);
      case "revenue":
        return await sort_by_revenue(order, page, genres);
      case "runtime":
        return await sort_by_runtime(order, page, genres);
      case "popularity":
        return await sort_by_popularity(order, page, genres);
      case "release_date":
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
 * returns the movie inside the nth page sorted according to the title
 */
export async function sort_by_title(order = 1, page = 1, genres = []) {
  if (genres.length == 0) {
    return await movie
      .aggregate([
        {
          $match: { title: { $not: { $eq: "" } } },
        },
        {
          $lookup: {
            from: "genres",
            localField: "genres",
            foreignField: "_id",
            as: "genres",
          },
        },
        {
          $unwind: "$genres",
        },

        {
          $group: {
            _id: "$_id",
            movie: { $first: "$$ROOT" },
            genres: {
              $push: {
                name: "$genres.name",
                id: "$genres.id",
              },
            },
          },
        },
        {
          $replaceRoot: {
            newRoot: { $mergeObjects: ["$movie", { genres: "$genres" }] },
          },
        },
      ])
      .sort({ title: order })
      .collation({ locale: "fr", strength: 1 })
      .skip(number_of_item_to_skip(page, ItemPerPage))
      .limit(ItemPerPage);
  } else {
    const Validgenders = genres.filter((item) =>
      Number.isInteger(Number(item))
    );
    const objectId = (await genderObjectId(Validgenders)).map(
      (item) => item._id
    );

    return await movie
      .aggregate([
        {
          $match: {
            title: { $not: { $eq: "" } },
            genres: { $in: await objectId },
          },
        },
        {
          $lookup: {
            from: "genres",
            localField: "genres",
            foreignField: "_id",
            as: "genres",
          },
        },
        {
          $unwind: "$genres",
        },

        {
          $group: {
            _id: "$_id",
            movie: { $first: "$$ROOT" },
            genres: {
              $push: {
                name: "$genres.name",
                id: "$genres.id",
              },
            },
          },
        },
        {
          $replaceRoot: {
            newRoot: { $mergeObjects: ["$movie", { genres: "$genres" }] },
          },
        },
      ])
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
 * @returns {Promise<any>}
 * returns the movie inside the nth page sorted according to the revenue
 */
async function sort_by_revenue(order = 1, page = 1, genres = []) {
  if (genres.length == 0) {
    return await movie
      .aggregate([
        {
          $match: { revenue: { $gt: 0 } },
        },
        {
          $lookup: {
            from: "genres",
            localField: "genres",
            foreignField: "_id",
            as: "genres",
          },
        },
        {
          $unwind: "$genres",
        },

        {
          $group: {
            _id: "$_id",
            movie: { $first: "$$ROOT" },
            genres: {
              $push: {
                name: "$genres.name",
                id: "$genres.id",
              },
            },
          },
        },
        {
          $replaceRoot: {
            newRoot: { $mergeObjects: ["$movie", { genres: "$genres" }] },
          },
        },
      ])
      .sort({ revenue: order })
      .skip(number_of_item_to_skip(page, ItemPerPage))
      .limit(ItemPerPage);
  }else {
     
    const objectId = (await genderObjectId(genres)).map(
      (item) => item._id
    );

    return await movie
      .aggregate([
        {
          $match: {
            revenue: { $not: { $eq: "" } },
            genres: { $in: await objectId },
          },
        },
        {
          $lookup: {
            from: "genres",
            localField: "genres",
            foreignField: "_id",
            as: "genres",
          },
        },
        {
          $unwind: "$genres",
        },

        {
          $group: {
            _id: "$_id",
            movie: { $first: "$$ROOT" },
            genres: {
              $push: {
                name: "$genres.name",
                id: "$genres.id",
              },
            },
          },
        },
        {
          $replaceRoot: {
            newRoot: { $mergeObjects: ["$movie", { genres: "$genres" }] },
          },
        },
      ])
      .sort({ revenue: order })
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
 * @returns {Promise<any>}
 * returns the movie inside the nth page sorted according to the popularity
 */
async function sort_by_popularity(order = 1, page = 1) {
  return await movie
    .aggregate([
      {
        $match: { popularity: { $gt: 0 } },
      },
      {
        $lookup: {
          from: "genres",
          localField: "genres",
          foreignField: "_id",
          as: "genres",
        },
      },
      {
        $unwind: "$genres",
      },

      {
        $group: {
          _id: "$_id",
          movie: { $first: "$$ROOT" },
          genres: {
            $push: {
              name: "$genres.name",
              id: "$genres.id",
            },
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: ["$movie", { genres: "$genres" }] },
        },
      },
    ])
    .sort({ popularity: order })
    .skip(number_of_item_to_skip(page, ItemPerPage))
    .limit(ItemPerPage);
}

/**
 * 描述
 * @date 2023-02-13
 * @param {any} order=1
 * @param {any} page=1
 * @returns {Promise<any>}
 * returns the movie inside the nth page sorted according to the runtime
 */
async function sort_by_runtime(order = 1, page = 1) {
  return await movie
    .aggregate([
      {
        $match: { runtime: { $gt: 0 } },
      },
      {
        $lookup: {
          from: "genres",
          localField: "genres",
          foreignField: "_id",
          as: "genres",
        },
      },
      {
        $unwind: "$genres",
      },

      {
        $group: {
          _id: "$_id",
          movie: { $first: "$$ROOT" },
          genres: {
            $push: {
              name: "$genres.name",
              id: "$genres.id",
            },
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: ["$movie", { genres: "$genres" }] },
        },
      },
    ])
    .sort({ runtime: order })
    .skip(number_of_item_to_skip(page, ItemPerPage))
    .limit(ItemPerPage);
}

/**
 * 描述
 * @date 2023-02-13
 * @param {any} order=1
 * @param {any} page=1
 * @returns {Promise<any>}
 * returns the movie inside the nth page sorted according to the release date
 */
async function sort_by_release_date(order = 1, page = 1) {
  return await movie
    .aggregate([
      {
        $match: { release_date: { $not: { $eq: "" } } },
      },
      {
        $lookup: {
          from: "genres",
          localField: "genres",
          foreignField: "_id",
          as: "genres",
        },
      },
      {
        $unwind: "$genres",
      },

      {
        $group: {
          _id: "$_id",
          movie: { $first: "$$ROOT" },
          genres: {
            $push: {
              name: "$genres.name",
              id: "$genres.id",
            },
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: ["$movie", { genres: "$genres" }] },
        },
      },
    ])
    .sort({ release_date: order })
    .skip(number_of_item_to_skip(page, ItemPerPage))
    .limit(ItemPerPage);
}

 
export async function simlarMovies(genres=[],page=0) {
  if (genres.some(element=> !isValidInteger(element) || Number(element)<0))
  throw new MyError("The gender array should contains positive integer");

  if(!isValidInteger(page) || Number(page)<0)
  throw new MyError("The page number parameter should be a positive integer");

  const mongoIds = (await gender.find({ id: {$in:genres} }, { _id: 1 })).map(el=>el._id); 
  if (mongoIds == null) return [];
  const results = await movie
  .aggregate([
    {
      $match: { genres:{$in: mongoIds} },
    },
    {
      $lookup: {
        from: "genres",
        localField: "genres",
        foreignField: "_id",
        as: "genres",
      },
    },
    {
      $unwind: "$genres",
    },

    {
      $group: {
        _id: "$_id",
        movie: { $first: "$$ROOT" },
        genres: {
          $push: {
            name: "$genres.name",
            id: "$genres.id",
          },
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: ["$movie", { genres: "$genres" }] },
      },
    },
  ]).sort({id:1})
  .skip(number_of_item_to_skip(page, ItemPerPage))
  .limit(ItemPerPage);

  const totalPage = await movie.countDocuments({ genres:{$in: mongoIds} })

  return  {
    results: await results,
    totalPage:   Math.ceil(await totalPage / ItemPerPage)
  }
 }


