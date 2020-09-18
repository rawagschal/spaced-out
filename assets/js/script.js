// Global Variables
var currentDate = moment();

// Mercury Retrograde Button
var mercuryRetroBtn = document.getElementById("button-1")
$("#button-1").text("Is Mercury in Retrograde?");
mercuryRetroBtn.onclick = getMercury;

// Is Mercury in Retrograde response
function getMercury() {
    var date = moment(currentDate).format("(YYYY-MM-DD)")
    fetch(
        `https://mercuryretrogradeapi.com/?date=&${date}`
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

// Astrobin Image of the Day
function getAstrobin() {
    fetch(
        `https://www.astrobin.com/api/v1/imageoftheday/?limit=1&api_key=44c950a81df45f010f9ada74487616c154e92b96&api_secret=9a1781a8d6378a530f3c81cf145464531279d658&format=json`
    )
    .then(function(response) {
        return response.json();
      })
    .then(function(astrobinResponse) {
        console.log(astrobinResponse.image);
    })
};

