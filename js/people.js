//Root resource API
const rootApiUrl = "https://swapi.dev/api/";

function getId(link) {
  return link.match(/(\d+)/)[0];
}

async function getPeople(page) {
  const container = document.getElementById('container')
  container.innerHTML = ""
  const peopleUrl = `${rootApiUrl}/people?page=${page}`
  const data = await fetch(peopleUrl)
  const { next, previous, results } = await data.json()
  document.title = "People page - " + page
  results.forEach(character => {
    const characterId = getId(character.url)
    const characterHtml = `<div class="card d-inline-flex flex-wrap justify-content-center m-3 shadow p-3" style="width: 19rem; border: 0;">
                                <div class="card-body">
                                    <h5 class="card-title">${character.name} </h5>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Birth year: ${character.birth_year}</li>
                                    <li class="list-group-item">Gender: ${character.gender} </li>
                                    <li class="list-group-item">Eye color: ${character.eye_color}</li>
                                </ul>
                                <div class="card-body">
                                    <div class="d-flex justify-content-start mb-4"><a class="btn btn-primary text-uppercase" href="people.html?id=${characterId}">More Details →</a></div>
                                </div>
                            </div> `
    container.innerHTML += characterHtml;
  })

  const paginationContainer = document.getElementById("pagination")
  if (previous) {
    paginationContainer.innerHTML += ` <a class="btn btn-primary text-uppercase m-2" href="people.html?page=${getId(previous)}"> previous </a>`
  }
  if (next) {
    paginationContainer.innerHTML += `<a class="btn btn-primary text-uppercase m-2" href="people.html?page=${getId(next)}"> Next →</a>`
  }

}
async function getCharacter(id) {
  const characterUrl = `${rootApiUrl}people/${id}`
  const data = await fetch(characterUrl)
  const character = await data.json()
  document.getElementById("title").textContent = character.name;
  document.title = character.name
  const characterHtml = ` <div class="card-body shadow p-5">
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <th scope="row">Birth Year</th>
                                        <td>${character.birth_year}</td>
                                        <th scope="row">Eye color</th>
                                        <td>${character.eye_color}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Gender</th>
                                        <td>${character.gender}</td>
                                        <th scope="row">Hair color</th>
                                        <td>${character.hair_color}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Height </th>
                                        <td>${character.height}</td>
                                        <th scope="row">Mass</th>
                                        <td>${character.mass}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Skin color </th>
                                        <td>${character.skin_color}</td>
                                        <th scope="row">Homeworld</th>
                                        <td><a href="planets.html?id=${getId(character.homeworld)}">See home world</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                          </div> `;
  document.getElementById("card").innerHTML = characterHtml;

  //character films
  const films = character.films;
  const filmsContainer = document.getElementById("films")
  films.forEach(film => {
    fetch(film).then(data => data.json())
      .then(filmData => {
        const filmId = getId(filmData.url)
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
        filmsContainer.innerHTML += filmHtml
      })
  });


}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const page = urlParams.get("page")
try {
  if (page || (!page && !id)) {
    getPeople(page ?? 1)
  } else {
    getCharacter(id)
  }
} catch (error) {
  console.error(error)
}








