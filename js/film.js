const rootApiUrl = "https://swapi.dev/api/";

function getId(link) {
  return link.match(/(\d+)/)[0];
}

async function getAllFilms() {
  const container = document.getElementById("container")
  container.innerHTML = "";
  const data = await fetch(`${rootApiUrl}films`);
  const { results } = await data.json()
  results.forEach(film => {
    const filmId = getId(film.url)
    const filmHtml = `<div class="card d-inline-flex justify-content-start m-3 col-4 shadow p-3" style="width: 19rem; border: 0;">
                          <div class="card-body ">
                              <h5 class="card-title">${film.title} </h5>
                          </div>
                          <ul class="list-group list-group-flush">
                              <li class="list-group-item">Director: ${film.director}</li>
                              <li class="list-group-item">Producer: ${film.producer} </li>
                              <li class="list-group-item">Release date: ${film.release_date}</li>
                          </ul>
                          <div class="card-body">
                              <div class="d-flex justify-content-start mb-4"><a class="btn btn-primary text-uppercase" href="film.html?id=${filmId}">More Details →</a></div>
                          </div>
                        </div> `
    container.innerHTML += filmHtml
  })
}

async function getSpecificFilm(id) {
  const filmUrl = `${rootApiUrl}films/${id}`;
  const data = await fetch(filmUrl);
  const film = await data.json();
  document.getElementById("name").textContent = film.title;
  console.log(film);
  const filmHtml = `<div class="card-body shadow p-5">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th scope="row">director</th>
                                    <td>${film.director}</td>
                                    <th scope="row">Producer</th>
                                    <td>${film.Producer}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Release date</th>
                                    <td>${film.release_date}</td>
                                    <th scope="row">episode_id</th>
                                    <td>${film.episode_id}</td>
                                </tr>
                                <tr>
                                    <th scope="row">opening crawl:</th>
                                    <td colspan="3">${film.opening_crawl}</td>
                                </tr>
                            </tbody>
                        </table>
                     </div> `;

  document.getElementById("card").innerHTML = filmHtml;

  //fetching characters data
  const characters = film.characters;
  const charactersContainer = document.getElementById("characters");
  characters.forEach((character) => {
    fetch(character)
      .then((data) => data.json())
      .then((characterData) => {
        const characterId = getId(characterData.url);
        const characterHtml = `<div class="card d-inline-flex flex-wrap justify-content-center m-3 shadow p-3" style="width: 19rem; border: 0;">
                                  <div class="card-body">
                                      <h5 class="card-title">${characterData.name}</h5>
                                  </div>
                                  <ul class="list-group list-group-flush">
                                      <li class="list-group-item">Birth year: ${characterData.birth_year}</li>
                                      <li class="list-group-item">Gender: ${characterData.gender} </li>
                                      <li class="list-group-item">Eye color: ${characterData.eye_color}</li>
                                  </ul>
                                  <div class="card-body">
                                      <div class="d-flex justify-content-start mb-4"><a class="btn btn-primary text-uppercase" href="people.html?id=${characterId}">More Details →</a></div>
                                  </div>
                                </div>  `;

        charactersContainer.innerHTML += characterHtml;
      });
  });

  //fetching planets data
  const planets = film.planets;
  const planetsContainer = document.getElementById("planets");
  planets.forEach((planet) => {
    fetch(planet)
      .then((data) => data.json())
      .then((planetData) => {
        const planetId = getId(planetData.url);
        const planetHtml = `<div class="card d-inline-flex justify-content-start m-3 col-4 shadow" style="width: 19rem; border: 0;">
                                <div class="card-body ">
                                    <h5 class="card-title">${planetData.name} </h5>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Diameter : ${planetData.diameter}</li>
                                    <li class="list-group-item">Rotation period : ${planetData.rotation_period} </li>
                                    <li class="list-group-item">Orbital period : ${planetData.orbital_period}</li>
                                </ul>
                                <div class="card-body">
                                    <div class="d-flex justify-content-start mb-4"><a class="btn btn-primary text-uppercase" href="planets.html?id=${planetId}">More Details →</a></div>
                                </div>
                              </div> `;
        planetsContainer.innerHTML += planetHtml;
      });
  });
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

try {
  if (!id) {
    getAllFilms();
  } else {
    getSpecificFilm(id);
  }
} catch (error) {
  console.error(error)
}
