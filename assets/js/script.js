// Global Variables
var currentDate = moment();
var introContainerEl = $("#content-container");


//add this var to the beginning of each new DOM generated page
var destroyElement = function () {
    introContainerEl.innerHTML = null;
}

var displayIntroPage = function () {
    // this will nuke all the script when pages lead back here
    destroyElement();
    //these create the elements
    //generate intro banner
    var imgEl = $("<img>").attr("src", "assets/images/spaced-out-banner.png").addClass("img-banner");
    var paraContainerEl = $("<p>").addClass("intro-paragraph").text("The only home we’ve ever known preserve and cherish that pale blue dot. Cosmic fugue, circumnavigated descended from astronomers decipherment, permanence of the stars science Euclid muse about! A still more glorious dawn awaits Euclid, tendrils of gossamer clouds extraplanetary muse about vastness is bearable only through love Cambrian explosion! Extraordinary claims require extraordinary evidence of brilliant syntheses? Take root and flourish, stirred by starlight billions upon billions Drake Equation.");
    // here are buttons for intro page
    var btnContainerEl = $("<div>").addClass("btn-container");
    //button to atronaut bios
    var astronautBtn = $("<button>").attr("type", "button").text("Astronauts In Space").addClass("button");
    //button to photo gallery
    var galleryBtn = $("<button>").attr("type", "button").text("NASA Image Gallery").addClass("button");
    //button to mercury in retrograde
    var mercuryBtn = $("<button>").attr("type", "button").text("Mercury In Retrograde").addClass("button");
    //button to news
    var spaceNewsBtn = $("<button>").attr("type", "button").text("Space News").addClass("button");
    //these append all of the above to the main container
    introContainerEl.append(imgEl);
    introContainerEl.append(paraContainerEl);
    btnContainerEl.append(astronautBtn);
    btnContainerEl.append(galleryBtn);
    btnContainerEl.append(mercuryBtn);
    btnContainerEl.append(spaceNewsBtn);
    introContainerEl.append(btnContainerEl);
}

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
        Array.forEach(element => {
            
         })
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

displayIntroPage();

//all of our on click events should go here
