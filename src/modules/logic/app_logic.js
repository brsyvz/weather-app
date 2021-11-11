import { apiKeyExtra, apiKeyImage, apiKeyWeather } from '../..';

let weatherData = {};

async function getWeatherData(e) {
  try {
    const spinner = document.getElementById('spinner');
    let errorText = document.querySelector('.error');
    let city = document.querySelector('.input');
    e.preventDefault();
    spinner.removeAttribute('hidden');
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKeyWeather}&q=${city.value}&aqi=yes`,
      {
        mode: 'cors',
      }
    );
    const obj = await response.json();
    const data = {
      city: obj.location.name,
      condition: obj.current.condition.text,
      icon: obj.current.condition.icon,
      temp: Math.round(obj.current.temp_c),
      temp_fl: Math.round(obj.current.feelslike_c),
      humidity: obj.current.humidity,
      cloud: obj.current.cloud,
      wind_deg: convertWindDegree(obj.current.wind_degree),
      wind_speed: obj.current.wind_kph,
      local_time: obj.location.localtime,
      air_q: convertAirQuality(obj.current.air_quality['us-epa-index']),
      lat: obj.location.lat,
      lon: obj.location.lon,
    };
    weatherData = data;

    renderCityImage();
    renderWeatherData();
    renderCountryFlag();
    city.value = '';
    spinner.setAttribute('hidden', '');
    errorText.textContent = '';
  } catch (err) {
    let errorText = document.querySelector('.error');
    const spinner = document.getElementById('spinner');
    errorText.textContent = 'city not found';
    errorText.style.visibility = 1;
    clearValues();
    spinner.setAttribute('hidden', '');
  }
}

async function renderCountryFlag() {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${weatherData.lat}%2C${weatherData.lon}&key=${apiKeyExtra}8&language=en&pretty=1`,
      {
        mode: 'cors',
      }
    );
    const obj = await response.json();

    const data = {
      currency: obj.results[0].annotations.currency.iso_code,
      call_code: obj.results[0].annotations.callingcode,
      drive_on: obj.results[0].annotations.roadinfo.drive_on,
      country: obj.results[0].components.country,
      country_code: obj.results[0].components.country_code,
    };
    document.querySelector('.currency').textContent = ` ${data.currency}`;
    document.querySelector('.country').textContent = ` ${data.country}`;
    document.querySelector('.call_code').textContent = ` ${data.call_code}`;
    document.querySelector('.drive_on').textContent = ` ${data.drive_on}`;

    let flag = document.querySelector('.flag');
    flag.src = `https://flagcdn.com/w40/${data.country_code}.png`;
    flag.srcset = `https://flagcdn.com/w80/${data.country_code}.png 2x`;
    flag.alt = `${data.country}`;
  } catch (err) {}
}

//get city image from unsplash.com and render it.
async function renderCityImage() {
  try {
    let city = document.querySelector('.input');
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${city.value}&client_id=${apiKeyImage}`,
      {
        mode: 'cors',
      }
    );
    const image = await response.json();
    document.getElementById('bgImg').src = image.results[1].urls.regular;
  } catch (err) {
    document.getElementById('bgImg').src = '';
  }
}

function renderWeatherData() {
  document.querySelector(
    '.city'
  ).textContent = `Weather in ${weatherData.city}`;
  document.querySelector('.status').textContent = weatherData.condition;
  document.querySelector('.icon').src = weatherData.icon;
  document.querySelector('.temp').textContent = `${weatherData.temp} °C`;
  document.querySelector(
    '.temp_fl'
  ).textContent = `Feels like ${weatherData.temp_fl} °C`;
  document.querySelector('.humidity').textContent = `%${weatherData.humidity}`;
  document.querySelector('.cloud').textContent = `%${weatherData.cloud}`;
  document.querySelector('.wind-degree').textContent = weatherData.wind_deg;
  document.querySelector(
    '.wind-speed'
  ).textContent = `${weatherData.wind_speed} km/h`;
  document.querySelector('.time').textContent = weatherData.local_time;
  document.querySelector('.air_q').textContent = weatherData.air_q;
}
// convert us-epa-indexvalue to text
function convertAirQuality(val) {
  let result = null;
  switch (val) {
    case 1:
      result = 'Good';
      break;
    case 2:
      result = 'Fair';
      break;
    case 3:
      result = 'Moderate';
      break;
    case 4:
      result = 'Unhealthy';
      break;
    case 5:
      result = 'Very Unhealthy';
      break;
    case 6:
      result = 'Hazardous';
      break;
  }
  return result;
}
// callback to convert wind_degree from number to text
function convertWindDegree(degree) {
  const directions = [
    'North',
    'Northeast',
    'East',
    'Southeast',
    'South',
    'Southwest',
    'West',
    'Northwest',
  ];
  // Split into the 8 directions
  degree = (degree * 8) / 360;
  // round to nearest integer.
  degree = Math.round(degree, 0);
  // Ensure it's within 0-7
  degree = (degree + 8) % 8;
  return directions[degree];
}
export { getWeatherData, renderDefaultCity };

function clearValues() {
  let x = document.querySelectorAll('.values');

  for (let i = 0; i < x.length; i++) {
    x[i].textContent = '';
  }
  let icon = document.querySelector('.icon');
  icon.src = '';
  const flag = document.querySelector('.flag');
  flag.src = '';
  flag.srcset = '';
  flag.alt = '';
}

async function renderDefaultCity() {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKeyWeather}&q=london&aqi=yes`,
      {
        mode: 'cors',
      }
    );
    const obj = await response.json();
    const data = {
      city: obj.location.name,
      condition: obj.current.condition.text,
      icon: obj.current.condition.icon,
      temp: Math.round(obj.current.temp_c),
      temp_fl: Math.round(obj.current.feelslike_c),
      humidity: obj.current.humidity,
      cloud: obj.current.cloud,
      wind_deg: convertWindDegree(obj.current.wind_degree),
      wind_speed: obj.current.wind_kph,
      local_time: obj.location.localtime,
      air_q: convertAirQuality(obj.current.air_quality['us-epa-index']),
      lat: obj.location.lat,
      lon: obj.location.lon,
    };

    weatherData = data;
    renderDefaultCityImage();
    renderWeatherData();
    renderCountryFlag();
  } catch (err) {
    console.log(err);
  }
}

async function renderDefaultCityImage() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=london&client_id=${apiKeyImage}`,
      {
        mode: 'cors',
      }
    );
    const image = await response.json();
    document.getElementById('bgImg').src = image.results[1].urls.regular;
  } catch (err) {
    document.getElementById('bgImg').src = '';
  }
}
