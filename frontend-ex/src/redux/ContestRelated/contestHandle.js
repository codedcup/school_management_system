import axios from 'axios';
import {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  postDone,
  getContestSuccess,
} from './contestSlice';

export const getAllContests = (adminID) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/ContestList/${adminID}`);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};

export const addContest = (fields) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const formData = new FormData();
    Object.keys(fields).forEach((key) => {
      if (key === 'syllabus') {
        formData.append(key, JSON.stringify(fields[key]));
      } else {
        formData.append(key, fields[key]);
      }
    });

    const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/ContestCreate`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch(postDone());
    dispatch(getAllContests(fields.adminID));
    return result.data;
  } catch (error) {
    dispatch(getError(error.message));
  }
};

export const getContestDetails = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Contest/${id}`);
    if (result.data) {
      dispatch(getContestSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};