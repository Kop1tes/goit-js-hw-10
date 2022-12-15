export function fetchCountries(country) {
    const link = 'https://restcountries.com/v3.1/name/{name}';

    return fetch(
        `${link}/${country}?fields=name,capital,population,flags.svg,languages`
    ).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });
}