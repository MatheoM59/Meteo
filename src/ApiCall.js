import { processData } from './processData.js';
export const apiCall = async (search) => {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search}?unitGroup=metric&include=days%2Chours%2Calerts%2Ccurrent&key=UMUE8HALBZJ8LMWEBA9ETB4N8`
  );
  if (!response.ok) throw new Error('Network error : ' + response.status);

  const data = await response.json();

  if (!data.currentConditions) throw new Error('Any result found');
  return processData(data);
};
