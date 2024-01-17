import axios from 'axios';
import _ from 'lodash';
export const baseURL = 'https://mvt-play.herokuapp.com/';

export const API = (token: string) =>
  axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const errorResponse = (error: any): any => {
  const hasError = _.hasIn(error?.response?.data, 'error');
  console.log('Error...', error);
  if (hasError) {
    return error.response.data;
  }
  return {error: 'Internal Error'};
};

export const get = async (url: string, token: string = ''): Promise<any> => {
  try {
    // console.log('token..', token, url);
    const response = await API(token).get(url);
    // console.log('resp...', url, response);
    return response.data;
  } catch (error) {
    // console.log('err..', error);
    return errorResponse(error);
  }
};

export const post = async (
  url: string,
  token: string = '',
  data: any,
): Promise<any> => {
  try {
    const response = await API(token).post(url, data);
    // console.log('resp ..', response)
    return response.data;
  } catch (error) {
    return errorResponse(error);
  }
};

export const put = async (
  url: string,
  token: string = '',
  data = {},
): Promise<any> => {
  try {
    const response = await API(token).put(url, data);
    return response.data;
  } catch (error) {
    return errorResponse(error);
  }
};

export const deleteMethod = async (
  url: string,
  token: string = '',
): Promise<any> => {
  try {
    // console.log('token..', token, url);
    const response = await API(token).delete(url);
    // console.log('resp...', response);
    return response.data;
  } catch (error) {
    return errorResponse(error);
  }
};

export const appUrl = {
  menu: `${baseURL}list_menu.json`,
  categories: `${baseURL}categories.json`,
};
