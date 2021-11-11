import './global.css';
import '@fortawesome/fontawesome-free/js/all';
import renderHeader from './modules/view/header';
import renderSearchBox from './modules/view/search_box';
import renderInfoBox from './modules/view/info';
import { getWeatherData, renderDefaultCity } from './modules/logic/app_logic';
import renderImgElement from './modules/view/bg_img';
import renderSpinner from './modules/view/spinner';
require('@babel/polyfill');

const apiKeyWeather = process.env.apiKey_Weather;
const apiKeyImage = process.env.apiKey_Image;
const apiKeyExtra = process.env.apiKey_Extra;

renderHeader();
renderSearchBox();
renderInfoBox();
renderImgElement();
renderSpinner();
renderDefaultCity();
formListener();
function formListener() {
  const form = document.querySelector('.search-form');
  form.addEventListener('submit', getWeatherData);
}

export { apiKeyWeather, apiKeyImage, apiKeyExtra };
