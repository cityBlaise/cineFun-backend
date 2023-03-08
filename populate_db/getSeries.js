import axios from "axios";
import tvShow from "../model-data/tvShow.model.js";
import {
  startConnection,
  stopConnection,
} from "../model-data/db.connection.js";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWY0MWIzZWY5YjM3MjAzZGI4OWJjYWNhMGUzNGE0MyIsInN1YiI6IjYzY2Q5NTdkNzVmMWFkMDBhMGViM2E4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yQt3dc4FIuGJwXLs5tD0JGCcS353iE1lfIR7dbdaH08";

async function populate(pageStart = 1) {
  try {
    const firstResponse = await axios.get(
      "https://api.themoviedb.org/3/tv/popular?language=fr"
    );
    const { total_pages } = firstResponse.data;
    await startConnection();
    console.log('connection established...');
    let j;
    for (j = pageStart; j <= total_pages; j++) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?page=${j + 1}&language=fr`
      );
      console.log(`page : ${j}`);
      const { results } = response.data;
      for (let index = 0; index < results.length; index++) {
        const element = results[index];
        let identifier = element.id;

        try {
          const alread_there = await tvShow.count({ id: identifier });
          if (alread_there < 1) {
            const tvDetails = await axios.get(
                encodeURI(`https://api.themoviedb.org/3/tv/${encodeURI(identifier)}?language=fr`)
            );
            const {
              adult,
              backdrop_path,
              homepage,
              created_by,
              id,
              overview,
              popularity,
              genres,
              poster_path,
              first_air_date,
              last_aire_date,
              number_of_episodes,
              number_of_seasons,
              seasons,
              name,
              vote_average,
              vote_count,
            } = tvDetails.data;
            if(!overview) continue
            const item = new tvShow({
              adult,
              backdrop_path: backdrop_path ,
              homepage: homepage,
              created_by: created_by,
              id: id,
              overview: overview,
              popularity: popularity,
              genres: genres,
              poster_path: poster_path,
              first_air_date: first_air_date,
              last_aire_date: last_aire_date,
              number_of_episodes: number_of_episodes,
              number_of_seasons: number_of_seasons,
              seasons: seasons,
              title: name,
              vote_average: vote_average,
              vote_count: vote_count,
            });
            await item.save();
            // eslint-disable-next-line no-unused-vars
            await new Promise((resolve,reject)=>{
                console.log('waiting for .1s');
                setTimeout(() => {
                    resolve()
                }, 100);
            })
            console.log("worked like a charm! ", identifier);
          }
        } catch (error) {
          console.error(error);
          console.log("error with item : ", identifier);
          console.log('restart to continue where stopped! at page: ',j)
          return await populate(j)
        }
      }
    }
    stopConnection();
  } catch (error) {
    console.error(error);
  }
}

await populate(12)