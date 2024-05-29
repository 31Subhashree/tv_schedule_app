import axios from 'axios';

const BASE_URL = 'https://api.tvmaze.com';

export const fetchShows = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/shows`);
    return response.data;
  } catch (error) {
    console.error('Error fetching shows:', error);
    return [];
  }
};

export const fetchShowDetails = async (showId) => {
  try {
    const response = await axios.get(`${BASE_URL}/shows/${showId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for show ${showId}:`, error);
    return null;
  }
};

export const fetchSchedule = async (country = 'US', date = null) => {
  try {
    let url = `${BASE_URL}/schedule?country=${country}`;
    if (date) {
      url += `&date=${date}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching schedule:', error);
    return [];
  }
};
