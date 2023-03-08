import  axios from 'axios';
import  fs from 'fs';
axios({
  method: 'get',
  url: 'https://image.tmdb.org/t/p/w500/sXL26Q5n7ayOdMHxJeHufOdjqb.jpg',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWY0MWIzZWY5YjM3MjAzZGI4OWJjYWNhMGUzNGE0MyIsInN1YiI6IjYzY2Q5NTdkNzVmMWFkMDBhMGViM2E4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yQt3dc4FIuGJwXLs5tD0JGCcS353iE1lfIR7dbdaH08' 
  },
  responseType: 'stream',
})
.then(response => {
  const totalLength = response.headers['content-length'];
  let loaded = 0;

  response.data.on('data', chunk => {
    loaded += chunk.length;
    const progress = (loaded / totalLength * 100).toFixed(2);
    console.log(`Progress: ${progress}%`);
  });

  response.data.pipe(fs.createWriteStream('Yellowstone.jpg'));
})
.catch(error => {
  console.error(error);
});