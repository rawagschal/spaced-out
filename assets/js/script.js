//Global Variables
var currentDate = moment();
var introContainerEl = $("#content-container");
var headerContainerEl = $("#header-container");

//add this var to the beginning of each new DOM generated page
var destroyElement = function () {
  introContainerEl.html(null);
};

//this function is only for the home page
var destroyBackBtn = function () {
    headerContainerEl.html(null);
}

//this creates the back button, you can add this to whereever you make a new page
var displayBackBtn = function () {
    var backBtnEl = $("<button>")
        .attr("type", "button")
        .addClass("back-button")
        .html(`<i class="tiny material-icons">navigate_before</i><span class="et-go-home"> Main Page</span>`)
        .on("click", displayIntroPage);
    headerContainerEl.append(backBtnEl);
}

//displays main page
var displayIntroPage = function () {
    // this will nuke all the script when pages lead back here
    destroyElement();
    destroyBackBtn();
    //these create the elements
    //generate intro banner
    var imgEl = $("<img>").attr("src", "assets/images/spaced-out-banner.png").addClass("img-banner");
    var paraContainerEl = $("<p>").addClass("intro-paragraph").text("The only home we’ve ever known preserve and cherish that pale blue dot. Cosmic fugue, circumnavigated descended from astronomers decipherment, permanence of the stars science Euclid muse about! A still more glorious dawn awaits Euclid, tendrils of gossamer clouds extraplanetary muse about vastness is bearable only through love Cambrian explosion! Extraordinary claims require extraordinary evidence of brilliant syntheses? Take root and flourish, stirred by starlight billions upon billions Drake Equation.");
    // here are buttons for intro page
    var btnContainerEl = $("<div>").addClass("btn-container");
    //button to atronaut bios
    var astronautBtn = $("<button>").attr("type", "button").text("Astronauts In Space").addClass("main-button");
    astronautBtn.on("click", getAstronauts);
    //button to photo gallery
    var galleryBtn = $("<button>").attr("type", "button").text("NASA Image Gallery").addClass("main-button");
    // galleryBtn.on("click", getSpaceFlightN);
    //button to mercury in retrograde
    var mercuryBtn = $("<button>").attr("type", "button").text("Mercury In Retrograde").addClass("main-button");
    mercuryBtn.on("click", displayMercury);
    //button to news
    var spaceNewsBtn = $("<button>").attr("type", "button").text("Space News").addClass("main-button");
    spaceNewsBtn.on("click", getSpaceFlightNews);
    //these append all of the above to the main container
    introContainerEl.append(imgEl);
    introContainerEl.append(paraContainerEl);
    btnContainerEl.append(astronautBtn);
    btnContainerEl.append(galleryBtn);
    btnContainerEl.append(mercuryBtn);
    btnContainerEl.append(spaceNewsBtn);
    introContainerEl.append(btnContainerEl);
f};

//below is the mercury in retrograde stuff
// Is Mercury in Retrograde response
function getMercury() {
  var date = moment(currentDate).format("(YYYY-MM-DD)");
  fetch(`https:mercuryretrogradeapi.com/?date=&${date}`)
    .then(function (mercuryResponse) {
      return mercuryResponse.json();
    })
    .then(function (mercuryResponse) {
      console.log(mercuryResponse.is_retrograde);
    });
  displayMercury(mercuryResponse);
}

var displayMercury = function (mercuryResponse) {
  if ("mercuryResponse.is_retrograde" === "true") {
    // Display the result
    console.log("True");
  } else {
    // Display the result
    console.log("False");
  }
};

//this is the name of the astronaut stuff
function scrapeAstroNames() {
  fetch(
    "https://cors-anywhere.herokuapp.com/https://www.howmanypeopleareinspacerightnow.com/peopleinspace.json"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      var people = response.people;
      getAstronauts(people)
    });
}

var getAstronauts = function (people) {
  destroyElement();
  var rowContainerEl = $("<div>").addClass("row").attr("id", "astronauts-row");
  introContainerEl.append(rowContainerEl);

  people.forEach((element) => {
    fetch(
      "https://spacelaunchnow.me/api/3.3.0/astronaut/?search=" +
        element.name.split(" ")[1]
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (bioResponse) {
        console.log(bioResponse);
        displayAstro(bioResponse.results[0]);
      });
  });
};

//this displays the astronaut stuff
var displayAstro = function (astronautArray) {
    var colContainerEl = $("<div>").addClass("col s12 m12 l4");
    colContainerEl.html(
        `<div class="card-wrapper">
            <div class="card card-astro">
                <div class="card-image astronaut-wrapper">
                    <img src="${astronautArray["profile_image"]}" />
                    <span class="card-title">${astronautArray.name}</span>
                </div>
                <div class="card-content-wrapper">
                    <div class="card-content">
                        <p>${astronautArray.bio}</p>
                    </div>
                </div>
                
                <div class="card-action cyan darken-4">
                    <a href="${astronautArray.wiki}" target="_blank"><span class="white-text">Wikipedia</span></a>
                </div>
            </div>
        </div>`
  );
  $("#astronauts-row").append(colContainerEl);
};

// Below Images of the Day that will displayed on sidebar
// Nasa Image of the Day
function getNasa() {
    fetch(
        `https://api.nasa.gov/planetary/apod?api_key=gnFNvMf5jFd0dEp5xPORKtYxKUXbb64ISb5kLNdU&date=` + currentDate.format("YYYY-MM-DD")
    )
    .then(function(response) {
        return response.json()
      }  )
    .then(function(response) {

        // Var of Image URL for image of the day
        var nasaImage = $("<img>").attr("src", response.url).addClass("day-img");
            
        // Var of Title & Description for image of the day
        var nasaTitle = $("<h5>").text(response.title).addClass("sidebar-subheader");
        // var nasaDesc = $("<p>").text(response[0].explanation)
        
        // Append Image, Title, and Descritpion to the sidebar
        $("#nasa").append(nasaImage, nasaTitle);
    })
    .then(function (response) {
      var imageTitle = response[0].title;
      console.log(imageTitle);
    });
}

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
        
        // Use image info to fetch additional information
        fetch(
            `https://www.astrobin.com` + astroImageInfo +`?api_key=44c950a81df45f010f9ada74487616c154e92b96&api_secret=9a1781a8d6378a530f3c81cf145464531279d658&format=json.`
        )
        .then(function(response) {
            return response.json();
          })
        .then(function(response) {
            // Var of HD Image URL for image of the day
            var astroImage = $("<img>").attr("src", response.url_hd).addClass("day-img");
            
            // Var of Title for image of the day
            var astroTitle = $("<h5>").text(response.title).addClass("sidebar-subheader");
            
            // Append Image & Title to the sidebar
            $("#astrobin").append(astroImage, astroTitle);
        })
        .then(function (response) {
          // HD Image URL for image of the day
          var astroImage = response.url_hd;
          console.log(astroImage);

          // Title for image of the day
          var astroTitle = response.title;
          console.log(astroTitle);
        });
    });
}

// Below is the Recent Space News
// Space News - Fetch News By Spaceflight
var getSpaceFlightNews = function () {
  fetch(`https://spaceflightnewsapi.net/api/v1/articles`)
    .then(function (spaceNewsResponse) {
      return spaceNewsResponse.json();
    })
    .then(function(spaceNewsResponse) {
        console.log(spaceNewsResponse);
        displayNewsPage(spaceNewsResponse);  
    })
} 

// Display the News 
var displayNewsPage = function (spaceNewsResponse) {
  destroyElement();
  displayBackBtn(); //this is our back button
  // Create row for the news
  introContainerEl
    .html("<h4>Space Flight News</h4>")
    .append('<div class="row">');

  // Loop through the news
  for (i =0; i < spaceNewsResponse.docs.length; i++) {
      // Container for Each Piece of News
      var spaceFlightCardContainer = $("<div>").addClass("col");
      var card = $("<div>").addClass("card flight-img-placement");
      var image = $("<div>").addClass("card-image");
      var body = $("<div>").addClass("card-stacked");

      // Display Information
      var spaceFlightPubDate = $("<p>").addClass("card-content").text(moment(spaceNewsResponse.docs[i].published_date).format("MMM. Do, YYYY"));
      var spaceFlightImage = $("<img>").attr("src", spaceNewsResponse.docs[i].featured_image).addClass("center-align");
      var spaceFlightTitle = $("<p>").addClass("card-title center-align").text(spaceNewsResponse.docs[i].title);
      var readNow = $("<a>").text("Read Now").addClass("waves-effect waves-light btn-large").attr("href", spaceNewsResponse.docs[i].url).attr("target", "_blank");
      
      // Append Display to Container
      card.append(image.append(spaceFlightImage));
      card.append(body.append(spaceFlightPubDate, spaceFlightTitle, readNow));
      spaceFlightCardContainer.append(card);
      introContainerEl.append(spaceFlightCardContainer);
  }
};

displayIntroPage();
getAstrobin();
getNasa();
