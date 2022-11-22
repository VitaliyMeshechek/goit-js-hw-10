const BASE_URL = 'https:restcountries.com/v3.1/name/';
const FIELDS = 'name,capital,languages,flags,population';

export default function fetchCountries(name){
  return fetch(`${BASE_URL}${name}?fields=${FIELDS}`).then(response => {
  if(!response.ok){
      throw new Error(response.statusText);
    }
    return response.json();
  })
}