import axios from 'axios';

const API_KEY = 'acd3e1918f36805b2e8d8b868384b633';
 
export const getTrending = async () => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=1`
    );
    return data.results.map(film => {
        return {
            id: film.id,
            title: film.title,
            poster: film.poster_path,
        };
    });
};

export const getDetails = async id => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    return {
        image: data.poster_path,
        title: data.title,
        date: data.release_date,
        score: data.vote_average,
        overview: data.overview,
        genres: data.genres,
    };
};

export const getByKeywords = async query => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&language=en-US&page=1&include_adult=false`
    );
    return data.results.map(film => {
        return {
            id: film.id,
            title: film.title,
            poster: film.poster_path,
        };
    });
};

export const getCasts = async id => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );
  return data.cast.map(elem => {
    return {
      avatar: elem.profile_path,
      name: elem.name,
      character: elem.character,
    };
  });
};

export const getReviewes = async id => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
  return data.results.map(review => {
    return {
      author: review.author,
      content: review.content,
      reviewId: review.id,
    };
  });
};