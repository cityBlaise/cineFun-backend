import * as MovieService from "../services/movie.service.js";
import { MyError } from "../utils/Error.js";
import { sort_by_title } from "../services/movie.service.js";
import dotenv from "dotenv";
import {
  startConnection,
  stopConnection,
} from "../model-data/db.connection.js";
import { movieProperties } from "../DTO/movie.dto.js";

const maxNumberOfItem = Number(process.env.ItemPerPage);
dotenv.config();
beforeAll(async () => {
  await startConnection();
}, 10000);

afterAll(async () => {
  await stopConnection();
}, 10000);

// describe("Test the the movie service", () => {
//     test("The number of pages for the movies should be a positive integer(>0)", async () => {
//       const result = await MovieService.get_movies_number_of_pages();
//       expect(result).toHaveProperty("pages");
//       expect(typeof result.pages).toBe("number");
//       expect(result.pages).toBeGreaterThan(0);
//     });

//     test("The number of movies belong to a gender should be a positive integer(>0)", async () => {
//       const result = await MovieService.number_of_movie_belong_to_a_gender(18);
//       expect(typeof result).toBe("number");
//       expect(result).toBeGreaterThanOrEqual(0);
//     });

//     test("should returns the movies in the nth page sorted in aphabetic order", async () => {
//       const result = await MovieService.get_movie_in_alphabetic_order(
//         "title",
//         1,
//         30
//       );
//       expect(Array.isArray(result)).toBe(true);
//       expect(result.length).toBeGreaterThanOrEqual(0);
//       expect(result.length).toBeLessThanOrEqual(maxNumberOfItem);
//       result.forEach(async (item) => {
//         expect(
//           Object.keys(await item._doc).every((property) =>
//             movieProperties.includes(property)
//           )
//         ).toBe(true);
//         expect(await item).toBeDefined();
//       });

//       for (let index = 1; index < (await result.length); index++) {
//         const element = await result[index];
//         expect(
//           element.title.localeCompare(result[index - 1], undefined, {
//             sensitivity: "base",
//           })
//         ).toBeGreaterThanOrEqual(0);
//       }
//     });

//     test("should returns the movies in the nth page sorted in by release_date descending order", async () => {
//       const result = await MovieService.get_movie_in_alphabetic_order(
//         "release_date",
//         -1,
//         30
//       );
//       expect(Array.isArray(result)).toBe(true);
//       expect(result.length).toBeGreaterThanOrEqual(0);
//       expect(result.length).toBeLessThanOrEqual(maxNumberOfItem);
//       result.forEach(async (item) => {
//         expect(
//           Object.keys(await item._doc).every((property) =>
//             movieProperties.includes(property)
//           )
//         ).toBe(true);
//         expect(await item).toBeDefined();
//       });

//       for (let index = 1; index < (await result.length); index++) {
//         const element = await result[index];
//         let date1 = new Date(element.release_date);
//         let date2 = new Date(result[index - 1].release_date);
//         expect(date1 <= date2).toBe(true);
//       }
//     });

//     test("should returns the movies in the nth page sorted in by release_date ascending order", async () => {
//       const result = await MovieService.get_movie_in_alphabetic_order(
//         "release_date",
//         1,
//         30
//       );
//       expect(Array.isArray(result)).toBe(true);
//       expect(result.length).toBeGreaterThanOrEqual(0);
//       expect(result.length).toBeLessThanOrEqual(maxNumberOfItem);
//       result.forEach(async (item) => {
//         expect(
//           Object.keys(await item._doc).every((property) =>
//             movieProperties.includes(property)
//           )
//         ).toBe(true);
//         expect(await item).toBeDefined();
//       });

//       for (let index = 1; index < (await result.length); index++) {
//         const element = await result[index];
//         let date1 = new Date(element.release_date);
//         let date2 = new Date(result[index - 1].release_date);
//         expect(date1 >= date2).toBe(true);
//       }
//     });

//     test("should returns the movies in the nth page sorted in by popularity descending order", async () => {
//       const result = await MovieService.get_movie_in_alphabetic_order(
//         "popularity",
//         -1,
//         30
//       );
//       expect(Array.isArray(result)).toBe(true);
//       expect(result.length).toBeGreaterThanOrEqual(0);
//       expect(result.length).toBeLessThanOrEqual(maxNumberOfItem);
//       result.forEach(async (item) => {
//         expect(
//           Object.keys(await item._doc).every((property) =>
//             movieProperties.includes(property)
//           )
//         ).toBe(true);
//         expect(await item).toBeDefined();
//       });

//       for (let index = 1; index < (await result.length); index++) {
//         const element = await result[index];
//         expect(element.popularity <= result[index - 1].popularity).toBe(true);
//       }
//     });

//     test("should returns the movies in the nth page sorted in by runtime descending order", async () => {
//       const result = await MovieService.get_movie_in_alphabetic_order(
//         "runtime",
//         -1,
//         30
//       );
//       expect(Array.isArray(result)).toBe(true);
//       expect(result.length).toBeGreaterThanOrEqual(0);
//       expect(result.length).toBeLessThanOrEqual(maxNumberOfItem);
//       result.forEach(async (item) => {
//         expect(
//           Object.keys(await item._doc).every((property) =>
//             movieProperties.includes(property)
//           )
//         ).toBe(true);
//         expect(await item).toBeDefined();
//       });

//       for (let index = 1; index < (await result.length); index++) {
//         const element = await result[index];
//         expect(element.runtime <= result[index - 1].runtime).toBe(true);
//       }
//     });

//   test("throws an error when the query field is not allowed", () => {
//     const field = "runtimes";
//     MovieService.get_movie_in_alphabetic_order(field, -1, 30).catch((error) => {
//       expect(error).toEqual(
//         new Error(`We can not sort on the field "${field}"`)
//       );
//     });
//   });
// });

// describe("Test the function that returns the number of Movies belong to a gender",  () => {

//     test("The result should be a positive integer", async () => {
//       const result = await MovieService.number_of_movie_belong_to_a_gender(
//         "18"
//       );
//       expect(typeof  result).toBe("number");
//       expect(Number.isInteger(result)).toBe(true);
//     });

//     test("The result should greather or egal than 0", async() => {
//       const result = await MovieService.number_of_movie_belong_to_a_gender(
//         "18"
//       );
//       expect( result).toBeGreaterThanOrEqual(0);
//     });

//     test("The entry parameter should be a positive integer if not an exception is thrown", async() => {
//       try {
//        await MovieService.number_of_movie_belong_to_a_gender(
//           "18dfsda"
//         );
//       } catch (error) {
//         if (error instanceof MyError) {
//           expect(error.message).toBe(
//             "The gender id should be and a positive integer"
//           );

//         }
//       }
//     });

// });

// describe(`Test the function that returns Movie belong to a given page number`, () => {
//       test(`The returned value should be an Array`, async () => {
//       const result = await MovieService.get_movies_randomly(1000);
//       expect(Array.isArray(result)).toBe(true);
//     });

//     test(`We should send [1,${maxNumberOfItem}] movies corresponding to the page number`, async () => {
//     const result = await MovieService.get_movies_randomly(1000);
//     expect(result.length).toBeGreaterThanOrEqual(0);
//     expect(result.length).toBeLessThanOrEqual(maxNumberOfItem);
//     });

//     test(`Each item of the response should match to the Movie Schema`, async () => {
//     const result = await MovieService.get_movies_randomly(1);
//       for (let index = 0; index < result.length; index++) {
//         const element = await result[index];
//         expect(
//           Object.keys(element).every((property) =>
//             movieProperties.includes(property)
//           )
//         ).toBe(true);
//       }

//     });

//     test(`If the page parameter is not a positive integer we throws an error`, async () => {
//       try {
//         await MovieService.get_movies_randomly(-1000)

//       } catch (error) {
//         if (error instanceof MyError) {
//           expect(error.message).toBe('The page number should be and a positive integer')
//         }
//       }
//     });
//  });

// describe('Test the function that returns the total number of pages for the Movies', () => {
//    test('the number of pages should be a positive integer', async () => {
//       const result = await MovieService.get_movies_number_of_pages();
//       expect(result).toHaveProperty('pages')
//       expect(result.pages).toBeGreaterThanOrEqual(0)
//       expect(Number.isInteger(result.pages)).toBe(true)
//     })
//  });

describe("Test the function that returns Movie belong to a gender that are inside the nth page", () => {
  test("We should get back an Array of Movie ", async () => {
    const result = await MovieService.get_movie_by_gender(18, 2);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(0);
    expect(result.length).toBeLessThanOrEqual(maxNumberOfItem);
    for (let index = 0; index < result.length; index++) {
      const element = await result[index];
      expect(
        Object.keys(element).every((property) =>
          movieProperties.includes(property)
        )
      ).toBe(true);
    }
  });
});

//   test("The function should throws an error if called with bad params", async () => {
//     try {
//       await MovieService.get_movie_by_gender(18, 2);
//     } catch (error) {
//       if (error instanceof MyError) {
//         expect(error.message).toBe(
//           "The page number should be and a positive integer"
//         );
//       }
//     }
//   });
// });

// describe("Test the function that returns the number of page corresponding to a specific gender of Movie", () => {
//   test("the number of pages should be a positive integer", async () => {
//     const result = await MovieService.number_of_pages_of_a_gender(18);
//     expect(result).toHaveProperty("pages");
//     expect(result.pages).toBeGreaterThanOrEqual(0);
//     expect(Number.isInteger(result.pages)).toBe(true);
//   });
// });

// test("should first", async () => {
//   const result = await sort_by_title(1, 1, [18]);
//   for (let index = 0; index < (await result.length); index++) {
//     const element = await result[index]; 
//     expect(
//       Object.keys(await element._doc).every((property) =>
//         movieProperties.includes(property)
//       )
//     ).toBe(true); 
//   } 
// });


test("should first", async () => {
  const result = await sort_by_title(1, 1, [18])
  .then();
  for (let index = 0; index < (await result.length); index++) {
    const element = await result[index]; 
    expect(
      Object.keys(await element._doc).every((property) =>
        movieProperties.includes(property)
      )
    ).toBe(true); 
  } 
});
