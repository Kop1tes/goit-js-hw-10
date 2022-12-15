import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';

const refs = {
    input: document.querySelector('#search-box'),
    listCountry: document.querySelector('.country-list'),
    infoCountry: document.querySelector('.country-info'),
}
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    const searchQuery = e.target.value.trim();

    fetchCountries(searchQuery)
        .then(data => {
            if (data.length > 10) {
                return Notify.failure(
                    'Too many matches found. Please enter a more specific name.'
                );
            }
            if (data.length > 2 && data.length < 10) {
                renderListCountry(data);
                refs.infoCountry.innerHTML = '';
            }
            if (data.length === "") {
                refs.listCountry.innerHTML = '';
                refs.infoCountry.innerHTML = '';
            }
            if (data.length === 1) {
                refs.listCountry.innerHTML = '';
                renderInfoCountry(data);
                return;
            }
        })
        .catch(error => {
            Notify.failure('Oops, there is no country with that name');
            refs.listCountry.innerHTML = '';
            refs.infoCountry.innerHTML = '';
        });
}

function makeCountryList(data) {
    return data
        .map(({ name, flags }) =>
            `<li class="country-list__item">
                <img src="${flags.svg}" alt="flag" width="25px" height="20px">
                <h2>${name.official}</h2>
            </li>`
        ).join('');
}

function makeCountryInfo(data) {
    return data
        .map(({ name, capital, population, flags, languages }) =>
            `<div class="infoCountry">
                <img src="${flags.svg}" alt="flag" width="40px" height="25px">
                <h2>${name.official}</h2>
            </div>
            <div>
                <p><b>Capital:</b> ${capital}</p>
                <p><b>Population:</b> ${population}</p>
                <p><b>Languages:</b> ${Object.values(languages)}</p>
            </div>`
        ).join('');
}

function renderListCountry(data) {
    refs.listCountry.innerHTML = makeCountryList(data);
}

function renderInfoCountry(data) {
    refs.infoCountry.innerHTML = makeCountryInfo(data);
}