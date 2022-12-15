import './css/styles.css';
import { fetchCountries } from './fetchCountries';


const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('#search-box'),
    ulList: document.querySelector('.country-list'),
    infoCountry: document.querySelector('.country-info'),
}