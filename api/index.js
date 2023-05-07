const url = "http://www.omdbapi.com/?apikey=d0aca1e3";

/* Fetch API to get list of popular movies or the ones searched by the user.
   Same API is used for pagination using page key.
*/
export const fetchMovies = async (title, page) => {
  try {
    const res = await fetch(`${url}&s=${title}&page=${page}`);

    return res;
  } catch (error) {
    console.log(
      "There has been a problem with your fetch operation: " + error.message
    );
    return error;
  }
};

/* Fetch API to get specific movie results. This API is called when the user clicks on a movie
   from the list.
*/

export const fetchSpecificMovieDetails = async (id) => {
  try {
    const res = await fetch(`${url}&i=${id}`);
    const data = res.json();
    return data;
  } catch (error) {
    console.log(
      "There has been a problem with your fetch operation: " + error.message
    );
    return error;
  }
};
