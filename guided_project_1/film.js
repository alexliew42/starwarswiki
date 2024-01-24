const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
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
    // film.planets = await fetchPlanets(id);
    // film.characters = await fetchCharacters(id);
  } catch (error) {
    console.error(`Error reading film ${id} data.`, error.message);
  }
  // renderFilm(film);
}

async function fetchFilm(id) {
  console.log("in fetchFilm with id:", id);
  let filmUrl = `${baseUrl}/films/${id}`;
  console.log("in fetchFilm, using filmUrl:", filmUrl);
  return await fetch(filmUrl).then((res) => res.json());
}

async function fetchPlanets(id) {
  console.log("in fetchPlanets with film:", i);
  const url = `${baseUrl}/films/${id}/planets`;
  const planets = await fetch(url).then((res) => res.json());
  return planets;
}

async function fetchCharacters(id) {
  console.log("in fetchCharacters with film:", id);
  let characterUrl = `${baseUrl}/films/${id}/characters`;
  console.log("in fetchCharacters, using characterUrl:", filmUrl);
  return await fetch(characterUrl).then((res) => res.json());
}

