const rootApiUrl = "https://swapi.dev/api/";

function getId(link) {
  return link.match(/(\d+)/)[0];
}

async function getDataAndInject(link, htmlRenderFn) {
  try {
    const data = await fetch(link);
    const { results } = await data.json();
    results.forEach(htmlRenderFn);
  } catch (error) {
    console.error(error);
  }
}

getDataAndInject(`${rootApiUrl}people`, (result) => {
  const html = `<div class="card d-inline-flex flex-wrap justify-content-center m-3 shadow p-3" style="width: 19rem; border: 0;">
                  <div class="card-body">
                      <h5 class="card-title">${result.name} </h5>
                      <p class="card-text"></p>
                  </div>
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item">Birth year: ${
                        result.birth_year
                      }</li>
                      <li class="list-group-item">Gender: ${result.gender} </li>
                      <li class="list-group-item">Eye color: ${
                        result.eye_color
                      }</li>  
                  </ul>
                  <div class="card-body">
                      <div class="d-flex justify-content-start mb-4"><a class="btn btn-primary text-uppercase" href="people.html?id=${getId(
                        result.url
                      )}">More Details →</a></div>
                  </div>
                </div> `;
  document.getElementById("cards_people").innerHTML += html;
});

getDataAndInject(`${rootApiUrl}films`, (result) => {
  const html = `<div class="card d-inline-flex justify-content-start m-3 col-4 shadow p-3" style="width: 19rem; border: 0;">
                  <div class="card-body ">
                      <h5 class="card-title">${result.title} </h5>
                      <p class="card-text"></p>
                  </div>
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item">Director: ${
                        result.director
                      }</li>
                      <li class="list-group-item">Producer: ${
                        result.producer
                      } </li>
                      <li class="list-group-item">Release date: ${
                        result.release_date
                      }</li>
                  </ul>
                  <div class="card-body">
                      <div class="d-flex justify-content-start mb-4"><a class="btn btn-primary text-uppercase" href="people.html?id=${getId(
                        result.url
                      )}">More Details →</a></div>
                  </div>
                </div> `;
  document.getElementById("cards_film").innerHTML += html;
});

getDataAndInject(`${rootApiUrl}planets`, (result) => {
  const html = `<div class="card d-inline-flex justify-content-start m-3 col-4 shadow p-3" style="width: 19rem; border: 0;">
                    <div class="card-body ">
                        <h5 class="card-title">${result.name} </h5>
                        <p class="card-text"></p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Diameter : ${
                          result.diameter
                        }</li>
                        <li class="list-group-item">Rotation period : ${
                          result.rotation_period
                        } </li>
                        <li class="list-group-item">Orbital period : ${
                          result.orbital_period
                        }</li>
                    </ul>
                    <div class="card-body">
                    <div class="d-flex justify-content-start mb-4"><a class="btn btn-primary text-uppercase" href="people.html?id=${getId(
                      result.url
                    )}">More Details →</a></div>
                    </div>
                </div> `;
  document.getElementById("cards_Planets").innerHTML += html;
});
