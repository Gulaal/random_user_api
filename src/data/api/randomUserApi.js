import { API_BASE_URL, DEFAULT_PARAMS } from '../../shared/constants.js';

export const fetchRandomUserRaw = async () => {
  const url = `${API_BASE_URL}${DEFAULT_PARAMS}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error('No user data received');
  }
  return data.results[0];
};