import axios from 'axios';

const handleResponse = ({ data }) => data;
// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
const BASE_URL = process.env.GATSBY_REDPANDA_API;

/** @param {string} resource */
/** @param {string} id */
const get = (resource: string) => {
  return axios.get(`${BASE_URL}/${resource}`).then(handleResponse);
};

export const apiProvider = {
  get,
};
