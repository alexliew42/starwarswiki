let nameTD;
let nameH1;
let climateTD;
let terrainTD;
let gravityTD;
let populationTD;

addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name')
    nameTD = document.querySelector('td#name');
    climateTD = document.querySelector('td#climate');
    terrainTD = document.querySelector('td#terrain');
    gravityTD = document.querySelector('td#gravity');
    populationTD = document.querySelector('td#population');
    characterSPAN = document.querySelector('span#character');
    filmSPAN = document.querySelector('span#film')
    const planetURL = new URLSearchParams(window.location.search);
    const id = planetURL.get('id');
    getPlanetId(id)
})

async function getPlanetId(id) {
    let planet;
    try{
        planet = await getPlanets(id);
        planet.character = await getCharacters(id);
        planet.film = await getFilms(id);
    } catch (ex) {
        console.error("error reading data")    
    }
    renderPlanet(planet);
}

async function getPlanets(id) {
    let response = await fetch(`https://swapi2.azurewebsites.net/api/planets/${id}`)
    const planet = await response.json()
    return planet
}

async function getCharacters(id) {
    const response = await fetch(`https://swapi2.azurewebsites.net/api/planets/${id}/characters`)
    const character = await response.json()
    return character
}

async function getFilms(id) {
    const response = await fetch(`https://swapi2.azurewebsites.net/api/planets/${id}/films`)
    const film = await response.json()
    return film
}

async function checkClimate(planet) {
    console.log(nameH1)
    first_climate = nameH1.textContent.split(", ")
    if (planet?.climate === "temperate") {
        first_climate[0].style.color = "green";
    } else if (planet?.climate === "frozen") {
        first_climate[0].style.color = "blue";
    } console.log(first_climate)
}


const renderPlanet = planet => {
    document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = planet?.name;
    checkClimate(planet)
    nameTD.textContent = " " + planet?.name;
    climateTD.textContent = " " + planet?.climate;
    terrainTD.textContent = " " + planet?.terrain;
    gravityTD.textContent = " " + planet?.gravity;
    populationTD.textContent = planet?.population;
    const characterList = planet?.character?.map(c => `<li><a href="/character.html?id=${c.id}"> ${c.name}</li>`)
    characterSPAN.innerHTML = characterList.join("");
    const filmsLis = planet?.film?.map(fil => `<li><a href="/film.html?id=${fil.id}">${fil.title}</li>`)
    filmSPAN.innerHTML = filmsLis.join("");
    // heightSpan.textContent = planet?.height;
    // massSpan.textContent = planet?.mass;
    // birthYearSpan.textContent = planet?.birth_year;
    // homeworldSpan.innerHTML = `<a href="/planet.html?id=${planet?.homeworld.id}">${planet?.homeworld.name}</a>`;
    // const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    // filmsUl.innerHTML = filmsLis.join("");
}