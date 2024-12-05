import axios from 'axios';

const config = require('../env.json');

// Create an instance of axios
//允许跨域
const api = axios.create({
  baseURL: config.REACT_APP_APIENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
/*
  NOTE: intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
*/

export default api;
