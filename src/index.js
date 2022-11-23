import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  container: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onCountry, DEBOUNCE_DELAY));

function onCountry(evt) {
  const searchValue = evt.target.value.trim();
  if(!searchValue) {
    refs.container.innerHTML = ''
    refs.list.innerHTML = ''
      return
    }
fetchCountries(searchValue).then(data => {
  if(data.length > 10) {
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
  } else if(data.length <= 10 & data.length > 1){
    createMarkupUntilTenCountry(data) + (refs.list.innerHTML = '');
  } else if(data.length >= 1){
    createMarkup(data) + (refs.container.innerHTML = '');

  }

}).catch(() => {

})
}

function createMarkup(arr){
  const markup = arr.map(item => {
    return `<div class="name-country"><img class="flags" src="${item.flags.svg}" alt="${item.name.official}" width="70" height="50">
    <h1 class="title-country">${item.name.official}</h1></div>
    <div class="container">
      <span class="descr"><b>Capital:</b> ${item.capital}</span>
      <span class="descr"><b>Population:</b> ${item.population}</span>
      <span class="descr"><b>languages:</b> ${Object.values(item.languages)}</span>
    </div>`
  }).join('');
  refs.list.innerHTML = markup;
};

function createMarkupUntilTenCountry(arr){
  const murkupTenCountry = arr.map(item => {
    return `<div class="name-country"><img class="flags" src="${item.flags.svg}" alt="${item.name.official}" width="70" height="50">
    <h1 class="title-country">${item.name.official}</h1></div>`
  }).join('');
  refs.container.innerHTML = murkupTenCountry;
};

// function creatMarkupOneCountry(arr){
//   const markup = arr.map(item => {
//     return `<div class="name-country"><img class="flags" src="${item.flags.svg}" alt="${item.name.official}" width="70" height="50">
//     <h1 class="title-country">${item.name.official}</h1></div>
//     <div class="container">
//       <span class="descr"><b>Capital:</b> ${item.capital}</span>
//       <span class="descr"><b>Population:</b> ${item.population}</span>
//       <span class="descr"><b>languages:</b> ${Object.values(item.languages)}</span>
//     </div>`
//   }).join('');
//   refs.list.innerHTML = markup;
// }







