import fetchJsonp from 'fetch-jsonp';
import qs from 'qs';
import { replace } from 'react-router-redux';

const API_URL = 'https://shopping.yahooapis.jp/ShoppingWebService/V1/json/categoryRanking';
const APP_ID = 'dj00aiZpPUtSZWFsd0M4aUpDSyZzPWNvbnN1bWVyc2VjcmV0Jng9MDU-';


const startRequest = category => ({
  type: 'START_REQUEST',
  payload: { category },
});
const receiveData = (category, error, response) => ({
  type: 'RECEIVE_DATA',
  payload: { category, error, response },
});
const finishRequest = category => ({
  type: 'FINISH_REQUEST',
  payload: { category },
});


export const fetchRanking = categoryId => {

  return async (dispatch, getState) => {

    const categories = getState().shopping.categories;
    const category = categories.find(category => (category.id === categoryId));

    if (typeof category === 'undefined') {
      dispatch(replace('/'));
      return;
    }

    dispatch(startRequest(category));

    const queryString = qs.stringify({
      appid: APP_ID,
      category_id: categoryId,
    });
    try {
      const responce = await fetchJsonp(`${API_URL}?${queryString}`);
      const data = await responce.json();
      dispatch(receiveData(category, null, data));
    } catch (err) {
      dispatch(receiveData(category, err));
    }

    dispatch(finishRequest(category));
  };
};