import axios from "axios";
const VITE_TMDB_READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

//rename tmdb not tmdb data
//Look up an Axios Instance and configure the common properties

export const getPopular = async (page = 1) => {
  try {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${VITE_TMDB_READ_ACCESS_TOKEN}`,
      },
      params: {
        language: "en-US",
        include_adult: false,
        page,
      },
    };

    const response = await axios.get(BASE_URL + "/movie/popular", options);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTrending = async (page = 1) => {
  try {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${VITE_TMDB_READ_ACCESS_TOKEN}`,
      },
      params: {
        language: "en-US",
        include_adult: false,
        page,
      },
    };

    const response = await axios.get(BASE_URL + "/trending/movie/day", options);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSearch = async (searchTerm: string, page: number = 1) => {
  try {
    const encodedSearchTerm = encodeURIComponent(searchTerm);

    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${VITE_TMDB_READ_ACCESS_TOKEN}`,
      },
      params: {
        query: encodedSearchTerm,
        page,
        include_adult: false,
      },
    };

    const response = await axios.get(BASE_URL + "/search/movie", options);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDetails = async (id) => {
  try {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${VITE_TMDB_READ_ACCESS_TOKEN}`,
      },
      params: {
        language: "en-US",
        include_adult: false,
      },
    };

    const response = await axios.get(BASE_URL + `/movie/${id}`, options);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
