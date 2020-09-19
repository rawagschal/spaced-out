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
var test = function(){
    fetch("http://api.open-notify.org/astros.json")
    .then(function (response) {
        return response.json()
    })
    .then(function (astroResponse) {
        console.log(astroResponse);
        // Array.forEach(element => {
            
        //  })
        });  
    fetch("https://spacelaunchnow.me/api/3.3.0/astronaut/?search=" + astroResponse.people[0].name.split(" ")[1])
    .then(function (response) {
        return response.json();
    })
    .then(function (bioResponse){
        console.log(bioResponse);     
    })
};

test();
    

// Nasa Image of the Day
function getNasa() {
    fetch(
        `https://api.nasa.gov/planetary/apod?api_key=gnFNvMf5jFd0dEp5xPORKtYxKUXbb64ISb5kLNdU&count=12`
    )
    .then(function(response) {
        return response.json();
      })
    .then(function(response) {
        var imageTitle = response[0].title;
        console.log(imageTitle);
    })
};

// Astrobin Image of the Day
function getAstrobin() {
    fetch(
        `https://www.astrobin.com/api/v1/imageoftheday/?limit=1&api_key=44c950a81df45f010f9ada74487616c154e92b96&api_secret=9a1781a8d6378a530f3c81cf145464531279d658&format=json`
    )
    .then(function(response) {
        return response.json();
      })
    .then(function(response) {
        var astroImageInfo = response.objects[0].image
        console.log(astroImageInfo);
        
        // Use image info to fetch additional information - Hardcoded, need to make dynamic
        fetch(
            `https://www.astrobin.com/api/v1/image/nxqnot/?api_key=44c950a81df45f010f9ada74487616c154e92b96&api_secret=9a1781a8d6378a530f3c81cf145464531279d658&format=json`
        )
        .then(function(response) {
            return response.json();
          })
        .then(function(response) {
            // HD Image URL for image of the day
            var astroImage = response.url_hd
            console.log(astroImage);

            // Title for image of the day
            var astroTitle = response.title
            console.log(astroTitle);
        })
    })  
};

getNasa();
getAstrobin();


    
