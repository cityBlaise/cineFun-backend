import tvShow from "../model-data/tvShow.model.js";
import gender from "../model-data/gender.model.js";
import dotenv from "dotenv";
dotenv.config();
const ItemPerPage = Number(process.env.ItemPerPage);

/**
 * @date 2023-02-09
 * @param {Number} page
 * @param {Number} ItemPerPage
 * @returns {Number}
 * tells you how elements you should skip to get the first element according to the page number
 */
const number_of_item_to_skip = (page, ItemPerPage) => (page - 1) * ItemPerPage;

export default {
  /**
   * @date 2023-02-09
   * @param {Number} page
   * @returns {Promise<movie>}
   * returns tvShow according to their order in the data base in which they are store randomly and the paggination order .
   */
  get_tvShow_randomly: async (page) => {
    return await tvShow
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
            serie: { $first: "$$ROOT" },
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
            newRoot: { $mergeObjects: ["$serie", { genres: "$genres" }] },
          },
        },
      ])
      .skip(number_of_item_to_skip(page, ItemPerPage))
      .limit(Number(ItemPerPage));
  },

  /**
   * @date 2023-02-09
   * @returns {Promise<Number>}
   * returns a integer corresponding to the number of page when we split the tvShow in blocks of (ItemPerPage)
   */
  get_tvShow_number_of_pages: async () => {
    const quantity = await tvShow.countDocuments();
    return {
      pages: Math.ceil(quantity / ItemPerPage),
    };
  },

  /**
   * @date 2023-02-09
   * @param {Number} genderId
   * @param {Number} page
   * @returns {Promise<movie>}
   * returns all the movie which correspond to this gender and which are in nth page block
   */
  get_tvShow_by_gender: async (genderId, page) => {
    if (page < 1) return { result: [] };
    const mongoId = await gender.findOne({ id: genderId }, { _id: 1 });
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
            serie: { $first: "$$ROOT" },
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
            newRoot: { $mergeObjects: ["$serie", { genres: "$genres" }] },
          },
        },
      ])
      .skip(number_of_item_to_skip(page, ItemPerPage))
      .limit(Number(ItemPerPage));
  },

  /**
   * @date 2023-02-09
   * @param {Number} genderId
   * @returns {Number}
   * returns the number of movie belong to a gender
   */
  number_of_movie_belong_to_a_gender: async (genderId) => {
    const mongoId = await gender.findOne({ id: genderId }, { _id: 1 });
    return await tvShow.count({
      genres: mongoId._id,
    });
  },

  /**
   * @date 2023-02-09
   * @param {any} genderId
   * @returns {any}
   */
  number_of_pages_of_a_gender: async (genderId) => {
    const total = await number_of_movie_belong_to_a_gender(genderId);
    return Math.ceil(total / ItemPerPage);
  },
};
