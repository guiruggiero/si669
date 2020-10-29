import fetch from 'node-fetch';

let url = 'https://api.datamuse.com/words?rel_rhy=forgetful'
fetch(url)
  .then(result => result.json())
  .then(res => console.log(res));

async function fetchIt () {
  let url = 'https://api.datamuse.com/words?rel_rhy=blue';
  let result = await fetch(url);
  let myJson = await result.json();
  console.log(myJson);
}
fetchIt();

// get "person" and species

async function fetchSWAPIAsync() {
  let url = 'https://swapi.dev/api/people/2/';
  let result = await fetch(url);
  let json = await result.json();
  let characterName = json.name;
  url = json.species[0];
  result = await fetch(url);
  json = await result.json();
  let speciesName = json.name;
  console.log(characterName, 'is a', speciesName);
}

function fetchSWAPIPromise() {
  let url = 'https://swapi.dev/api/people/2/';
  let charName, speciesName = '';
  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      charName = json.name;
      return fetch(json.species[0]);
    })
    .then((result) => {
      return result.json()
    })
    .then((json) => {
      speciesName = json.name;
      console.log(charName, 'is a', speciesName, '(I Promise)');
    })
}
//fetchSWAPIAsync();
fetchSWAPIPromise();