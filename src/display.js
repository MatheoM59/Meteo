import { apiCall } from './ApiCall.js';

export const display = async () => {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h1>Meteo</h1>
    <div id='gifSearch'>
        <input type='text' id='research' placeholder='Put your location'/>
        <input type='submit' id='submitResearch'/>
    </div>
    <div id='mainMeteo'>
    </div>
    <div id='favourite'>
    </div>
  `;
  research();
  console.log(research);
};

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

const renderMain = (weatherData) => {
  const container = document.getElementById('mainMeteo');
  container.innerHTML = `
   <div>
  <h2>${weatherData.city}</h2>
  <h3>Zone horaire : ${weatherData.timezone}</h3>
</div>
<div>
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
};
