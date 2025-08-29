import axios from "axios";
const VITE_TMDB_READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

//rename tmdb not tmdb data
//Look up an Axios Instance and configure the common properties

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${VITE_TMDB_READ_ACCESS_TOKEN}`,
  },
  params: {
    language: "en-US",
    include_adult: false,
  },
});

export const getPopular = async (page = 1) => {
  try {
    const response = await instance({
      url: "/movie/popular",
      method: "get",
      params: { ...instance.defaults.params, page },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTrending = async (page = 1) => {
  try {
    const response = await instance({
      url: "/trending/movie/day",
      method: "get",
      params: { ...instance.defaults.params, page },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSearch = async (searchTerm: string, page: number = 1) => {
  try {
    const encodedSearchTerm = encodeURIComponent(searchTerm);

    const response = await instance({
      url: "/search/movie",
      method: "get",
      params: { ...instance.defaults.params, page, query: encodedSearchTerm },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//
export const getDetails = async (id) => {
  try {
    const response = await instance({
      url: `/movie/${id}`,
      method: "get",
    });

    const videoResponse = await instance({
      url: `/movie/${id}/videos`,
      method: "get",
    });

    const creditResponse = await instance({
      url: `/movie/${id}/credits`,
      method: "get",
    });

    const reviewResponse = await instance({
      url: `/movie/${id}/reviews`,
      method: "get",
    });

    console.log("Cresponse", reviewResponse);

    const data = {
      ...response.data,
      trailers: videoResponse.data.results,
      credits: creditResponse.data.cast,
      reviews: reviewResponse.data.results,
    };

    return data;
  } catch (error) {}
};

export const getCast = async (id) => {
  try {
    const response = await instance({
      url: `/movie/${id}/credits`,
      method: "get",
    });

    return response.data.cast;
  } catch (error) {
    console.log(error);
  }
};

export const getVideo = async (id) => {
  try {
    const response = await instance({
      url: `/movie/${id}/videos`,
      method: "get",
    });

    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getReviews = async (id) => {
  try {
    const response = await instance({
      url: `/movie/${id}/reviews`,
      method: "get",
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
