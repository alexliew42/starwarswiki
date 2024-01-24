let titleH1;
let episodeSpan;
let directorSpan;
let producerSpan;
let releaseDateSpan;
let openingCrawlSpan;
let charactersUl;
let planetsUl;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  titleH1 = document.querySelector("h1#title");
  episodeSpan = document.querySelector("span#episode");
  directorSpan = document.querySelector("span#director");
  producerSpan = document.querySelector("span#producer");
  releaseDateSpan = document.querySelector("span#release_date");
  openingCrawlSpan = document.querySelector("span#opening_crawl");
  charactersUl = document.querySelector("#characters>ul");
  planetsUl = document.querySelector("#planets>ul");
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getFilm(id);
});

async function getFilm(id) {
  console.log("in fetchFilm with id:", id);
  let film;
  try {
    film = await fetchFilm(id);
    console.log("film data:", film);
    // console.log("id:", id);
    film.characters = await fetchCharacters(id);
    console.log("character data:", film.characters);
    film.planets = await fetchPlanets(id);
    console.log("planet data:", film.planets);
  } catch (error) {
    console.error(`Error reading film ${id} data.`, error.message);
  }
  renderFilm(film);
}

async function fetchFilm(id) {
  console.log("in fetchFilm with id:", id);
  let filmUrl = `${baseUrl}/films/${id}`;
  console.log("in fetchFilm, using filmUrl:", filmUrl);
  return await fetch(filmUrl).then((res) => res.json());
}

async function fetchCharacters(film) {
  console.log("in fetchCharacters with film:", film);
  let characterUrl = `${baseUrl}/films/${film}/characters`;
  return await fetch(characterUrl).then((res) => res.json());
}

async function fetchPlanets(film) {
  console.log("in fetchPlanets with film:", film);
  const url = `${baseUrl}/films/${film}/planets`;
  const planets = await fetch(url).then((res) => res.json());
  return planets;
}

const renderFilm = (film) => {
  document.title = `SWAPI - ${film?.title}`; // Just to make the browser tab say their name
  titleH1.textContent = film?.title;
  episodeSpan.textContent = film?.episode_id;
  directorSpan.textContent = film?.director;
  producerSpan.textContent = film?.producer;
  releaseDateSpan.textContent = film?.release_date;
  openingCrawlSpan.textContent = film?.opening_crawl;
  const characterList = film?.characters?.map(
    (character) =>
      `<li><a href="/character.html?id=${character.id}">${character.name}</li>`
  );
  charactersUl.innerHTML = characterList.join("");
  const planetList = film?.planets?.map(
    (planet) =>
      `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`
  );
  planetsUl.innerHTML = planetList.join("");
};
