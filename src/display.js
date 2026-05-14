import { apiCall } from './ApiCall.js';
import { favouriteLocation } from './favourite.js';
const importFavourite = favouriteLocation();
export const display = async () => {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h1>Meteo</h1>
    <div id='searchBar'>
        <input type='text' id='research' placeholder='Put your location'/>
        <input type='submit' id='submitResearch'/>
    </div>
    <div id='mainMeteo'>
    </div>
    <div id='favourite'>
    </div>
  `;
  research();
  const result = await getFavourite();
  renderFirst(result);
  renderFavourite(result);
  manageFavourite();
  getFavouriteRander();
};

// ---RENDER---

const renderMain = (weatherData) => {
  const container = document.getElementById('mainMeteo');
  container.innerHTML = `
    <div id='top'>
      <div id='cityAndFav'>
        <h2>${weatherData.city}</h2>
        <input id='favCase' type='checkbox' data-city='${weatherData.city}'/>
        <label for='favCase'></label>
      </div>
      <h3>Zone horaire : ${weatherData.timezone}</h3>
    </div>
    <div id='information'>
      <p>Temp : ${weatherData.current.temp}C°</p>
      <p>Temp feeling : ${weatherData.current.feelsLike}C°</p>
      <p>Humidity : ${weatherData.current.humidity}%</p>
      <p>Conditions :${weatherData.current.conditions}</p>
      <p>Wind speed : ${weatherData.current.windspeed}km/h</p>
    </div>
    <div id="week">
      ${weatherData.week
        .map(
          (day) => `
        <div>
          <p>${day.date}</p>
          <p>${day.tempMax}°C / ${day.tempMin}°C</p>
          <p>${day.conditions}</p>
        </div>
      `
        )
        .join('')}
    </div>
    `;

  if (importFavourite.favourite.includes(weatherData.city)) {
    document.getElementById('favCase').checked = true;
  }
};
const renderFirst = async (result) => {
  const container = document.getElementById('mainMeteo');
  const data = result[0];
  if (data !== undefined) {
    renderMain(data);
  } else {
    const weatherData = await apiCall('Paris');
    renderMain(weatherData);
  }
};

const renderFavourite = async (result) => {
  const container = document.getElementById('favourite');
  container.innerHTML = `
    <div id='top'>
      <h1>Favourite City</h1>
    </div>  
    <div id='favouriteContainer'>
     ${result
       .map(
         (item) => `
  <div id='card' data-city='${item.city}'>
    <h2>${item.city}</h2>
    <p>${item.current.temp}°C</p>
    <p>${item.current.conditions}</p>
  </div>
`
       )
       .join('')}
    </div>  
  `;
};

// ---FUNCTION---

const research = () => {
  const researchSubmit = document.getElementById('submitResearch');
  const searchInput = document.getElementById('research');

  researchSubmit.addEventListener('click', async () => {
    const search = searchInput.value;
    try {
      const weatherData = await apiCall(search);
      renderMain(weatherData);
    } catch (error) {
      console.error(error.message);
    }
  });
};

const manageFavourite = () => {
  document.getElementById('mainMeteo').addEventListener('change', async (e) => {
    if (!e.target.matches('input[type="checkbox"]')) return;
    const city = e.target.dataset.city;
    if (e.target.checked) {
      importFavourite.addFavourite(city);
    } else {
      importFavourite.removeFavourite(city);
    }
    importFavourite.saveData();
    const newResult = await getFavourite();
    renderFavourite(newResult);
  });
};

//---GET---

const getFavourite = async () => {
  const results = await Promise.all(
    importFavourite.favourite.map((city) => apiCall(city))
  );
  return results;
};

const getFavouriteRander = () => {
  document.getElementById('favourite').addEventListener('click', (e) => {
    const card = e.target.closest('[data-city]');
    if (!card) return;
    const city = card.dataset.city;
    apiCall(city).then((weatherData) => renderMain(weatherData));
  });
};
