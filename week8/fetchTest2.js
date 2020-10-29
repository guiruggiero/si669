import fetch from 'node-fetch';

// async function fetchIt () {
//     let url = 'https://api.datamuse.com/words?rel_rhy=blue';
//     let result = await fetch(url);
//     let myJson = await result.json();
//     console.log(myJson);
// }

// fetchIt();


// function fetchSWAPIPromise() {
//     let url = 'https://swapi.dev/api/people/2/';
//     let charName, speciesName = '';

//     fetch(url)
//         .then((result) => {
//         return result.json();
//         })

//         .then((json) => {
//         charName = json.name;
//         return fetch(json.species[0]);
//         })
        
//         .then((result) => {
//         return result.json()
//         })

//         .then((json) => {
//         speciesName = json.name;
//         console.log(charName, 'is a', speciesName);
//     })
// }

// fetchSWAPIPromise();

async function fetchSWAPIAsync() {
    let url = 'https://swapi.dev/api/people/2/';
    let charName, speciesName = '';

    let result1 = await fetch(url);
    // console.log(result1);
    let myJson1 = await result1.json();
    // console.log(myJson2);
    charName = myJson1.name;
    // console.log(charName);

    let result2 = await fetch(myJson1.species[0]);
    // console.log(result2);
    let myJson2 = await result2.json();
    // console.log(myJson2);
    speciesName = myJson2.name;
    // console.log(speciesName);

    console.log(charName, 'is a', speciesName);
}

fetchSWAPIAsync();