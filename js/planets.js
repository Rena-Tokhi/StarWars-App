const rootApiUrl = "https://swapi.dev/api/";
function getId(link) {
  return link.match(/(\d+)/)[0];
}
async function getPlanets(page) {
  const container = document.getElementById("container");
  container.innerHTML = "";
  const planetsUrl = `${rootApiUrl}/planets?page=${page}`;
  const data = await fetch(planetsUrl);
  const { next, previous, results } = await data.json();
  document.title = "Planets Page - " + page;
  results.forEach((planet) => {
    const planetId = getId(planet.url);
    const planetHtml = `<div class="card d-inline-flex justify-content-start m-3 col-4 shadow p-3" style="width: 19rem; border: 0;">
                            <div class="card-body ">
                                <h5 class="card-title">${planet.name} </h5>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Diameter : ${planet.diameter}</li>
                                <li class="list-group-item">Rotation period : ${planet.rotation_period} </li>
                                <li class="list-group-item">Orbital period : ${planet.orbital_period}</li>
                            </ul>
                            <div class="card-body">
                                <div class="d-flex justify-content-start mb-4"><a class="btn btn-primary text-uppercase" href="people.html?id=${planetId}">More Details →</a></div>
                            </div>
                        </div> `;
    container.innerHTML += planetHtml;
  });

  const paginationContainer = document.getElementById("pagination");
  if (previous) {
    paginationContainer.innerHTML += `
    <a class="btn btn-primary text-uppercase m-2" href="planets.html?page=${getId(previous)}"> previous </a>`;
  }
  if (next) {
    paginationContainer.innerHTML += `<a class="btn btn-primary text-uppercase m-2" href="planets.html?page=${getId(next)}"> Next →</a>`;
  }
}

async function getPlanet(id) {
  const planetUrl = `${rootApiUrl}planets/${id}`;
  const data = await fetch(planetUrl);
  const planet = await data.json();
  document.getElementById("name").textContent = planet.name;
  const planetHtml = `<div class="card-body shadow p-5">
                          <table class="table">
                              <tbody>
                                  <tr>
                                      <th scope="row">Diameter</th>
                                      <td>${planet.diameter}</td>
                                      <th scope="row">Climate</th>
                                      <td>${planet.climate}</td>
                                  </tr>
                                  <tr>
                                      <th scope="row">Orbital period </th>
                                      <td>${planet.orbital_period}</td>
                                      <th scope="row">Rotation period</th>
                                      <td>${planet.rotation_period}</td>
                                  </tr>
                                  <tr>
                                      <th scope="row">Population </th>
                                      <td>${planet.population}</td>
                                      <th scope="row">Gravity</th>
                                      <td>${planet.gravity}</td>
                                  </tr>
                                  <tr>
                                      <th scope="row">Terrain </th>
                                      <td>${planet.terrain}</td>
                                      <th scope="row">Surface water</th>
                                      <td>${planet.surface_water}</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div> `;

  document.getElementById("card").innerHTML = planetHtml;

  const residents = planet.residents;
  const residentsContainer = document.getElementById("characters");
  residents.forEach((resident) => {
    fetch(resident)
      .then((data) => data.json())
      .then((residentData) => {
        const residentId = getId(residentData.url);
        const residentHtml = `<div class="card d-inline-flex flex-wrap justify-content-center m-3 shadow p-3" style="width: 19rem; border: 0;">
                                <div class="card-body">
                                    <h5 class="card-title">${residentData.name} </h5>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Birth year: ${residentData.birth_year}</li>
                                    <li class="list-group-item">Gender: ${residentData.gender} </li>
                                    <li class="list-group-item">Eye color: ${residentData.eye_color}</li>
                                </ul>
                                <div class="card-body">
                                    <div class="d-flex justify-content-start mb-4"><a class="btn btn-primary text-uppercase" href="people.html?id=${residentId}">More Details →</a></div>
                                </div>
                              </div>  `;
        residentsContainer.innerHTML += residentHtml;
      });
  });

  const films = planet.films;
  const filmsContainer = document.getElementById("Films");
  films.forEach((film) => {
    fetch(film)
      .then((data) => data.json())
      .then((filmData) => {
        const filmId = getId(filmData.url);
        const filmHtml = `<div class="card d-inline-flex justify-content-start m-3 col-4 shadow p-3" style="width: 19rem; border: 0;">
                              <div class="card-body ">
                                  <h5 class="card-title">${filmData.title} </h5>
                              </div>
                              <ul class="list-group list-group-flush">
                                  <li class="list-group-item">Director: ${filmData.director}</li>
                                  <li class="list-group-item">Producer: ${filmData.producer} </li>
                                  <li class="list-group-item">Release date: ${filmData.release_date}</li>
                              </ul>
                              <div class="card-body">
                                <div class="d-flex justify-content-start mb-4"><a class="btn btn-primary text-uppercase" href="people.html?id=${filmId}">More Details →</a></div>
                              </div>
                          </div> `;
        filmsContainer.innerHTML += filmHtml;
      });
  });
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const page = urlParams.get("page");
try {
  if (page || (!page && !id)) {
    getPlanets(page ?? 1);
  } else {
    getPlanet(id);
  }
} catch (error) {
  console.error(error);
}
