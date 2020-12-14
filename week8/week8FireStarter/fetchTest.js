import fetch from 'node-fetch';

// fetch('http://google.com');

async function fetchIt () {
  let url = 'https://api.datamuse.com/words?rel_rhy=forgetful';
  let result = await fetch(url);
  let myJson = await result.json();
  console.log(myJson);
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
      console.log(charName, 'is a', speciesName);
    })
}

async function fetchSWAPIAsync() {  
  let url = 'https://swapi.dev/api/people/2/';
  let characterName, speciesName = '';

  let result = await fetch(url);
  let json = await result.json();
  characterName = json.name;
  
  url = json.species[0];
  result = await fetch(url);
  json = await result.json();
  speciesName = json.name;

  console.log(characterName, 'is a', speciesName);
}

// fetchIt();
// fetchSWAPIPromise();
fetchSWAPIAsync();