import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const uploadImageForTextract = (image) => {
  const formData = new FormData();
  formData.append('image', image);

  return axios.post(`${API_BASE_URL}/textract`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const translateText = (text, targetLanguage) => {
  return axios.post(`${API_BASE_URL}/translate`, { text, targetLanguage });
};

export const analyzeSentiment = (text) => {
  return axios.post(`${API_BASE_URL}/sentiment`, { text });
};
