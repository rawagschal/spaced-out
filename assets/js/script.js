// Global Variables
var currentDate = moment();
const astrosInSpace = []
const astrosSection = document.getElementById('astroList')
//Mercury Retrograde Button
var mercuryRetroBtn = document.getElementById("button-1")
$("#button-1").text("Is Mercury in Retrograde?");
mercuryRetroBtn.onclick = getMercury;

// Is Mercury in Retrograde response
function getMercury() {
    var date = moment(currentDate).format("(YYYY-MM-DD)")
    fetch(
        (`https:mercuryretrogradeapi.com/?date=&${date}`)
    )
    .then(function(mercuryResponse) {
        return mercuryResponse.json();
      })
    .then(function(mercuryResponse) {
        console.log(mercuryResponse.is_retrograde);
    })
    if ("mercuryResponse.is_retrograde" === "true") {
        // Display the result
        $("#button-1").append("<h1>True</h1>");
    }
    else {
        // Display the result
        $("#button-1").append("<h1>False</h1>");
    }
};

console.log("hi");

var test = function () {
  fetch("http://api.open-notify.org/astros.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (astroResponse) {
      console.log(astroResponse);
    astroResponse.people.forEach(element => {
        fetch(
            "https://spacelaunchnow.me/api/3.3.0/astronaut/?search=" +
              element.name.split(" ")[1]
          )
            .then(function (response) {
              return response.json();
            })
            .then(function (bioResponse) {
              console.log(bioResponse);
              astrosInSpace.push(bioResponse.results[0])
    showAstros(bioResponse.results[0]);
            });
      })

    });
};
function showAstros(astroObj){
    console.log('finished loading' + astroObj.name);
    astrosSection.innerHTML += `
    <div class="row">
                <div class="col s12 m12">
                  <div class="card">
                    <div class="card-image">
                      <img src="${astroObj.profile_image}" />
                      <span class="card-title">${astroObj.name}</span>
                    </div>
                    <div class="card-content">
                      <p>
                        ${astroObj.bio}
                      </p>
                    </div>
                    <div class="card-action">
                      <a href="${astroObj.wiki}">Wikipedia</a>
                    </div>
                  </div>
                </div>
              </div>
    `
}
test();
// Astrobin Image of the Day
function getAstrobin() {
  fetch(
    `https://www.astrobin.com/api/v1/imageoftheday/?limit=1&api_key=44c950a81df45f010f9ada74487616c154e92b96&api_secret=9a1781a8d6378a530f3c81cf145464531279d658&format=json`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (astrobinResponse) {
      console.log(astrobinResponse.image);
    });
}
