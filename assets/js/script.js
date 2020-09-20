// Global Variables
var currentDate = moment();
var introContainerEl = $("#content-container");


//add this var to the beginning of each new DOM generated page
var destroyElement = function () {
    introContainerEl.html(null);
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
    astronautBtn.on("click", getAstronauts);
    //button to photo gallery
    var galleryBtn = $("<button>").attr("type", "button").text("NASA Image Gallery").addClass("button");
    galleryBtn.on("click", getImgGallery);
    //button to mercury in retrograde
    var mercuryBtn = $("<button>").attr("type", "button").text("Mercury In Retrograde").addClass("button");
    mercuryBtn.on("click", displayMercury);
    //button to news
    var spaceNewsBtn = $("<button>").attr("type", "button").text("Space News").addClass("button");
    spaceNewsBtn.on("click", getSpaceFlightNews);
    //these append all of the above to the main container
    introContainerEl.append(imgEl);
    introContainerEl.append(paraContainerEl);
    btnContainerEl.append(astronautBtn);
    btnContainerEl.append(galleryBtn);
    btnContainerEl.append(mercuryBtn);
    btnContainerEl.append(spaceNewsBtn);
    introContainerEl.append(btnContainerEl);
};

//below is the mercury in retrograde stuff
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
  displayMercury(mercuryResponse)
};

var displayMercury = function (mercuryResponse) {
  if ("mercuryResponse.is_retrograde" === "true") {
    // Display the result
    console.log("True")
  }
  else {
    // Display the result
    console.log("False")
  }
};

//Photo Gallery
var getImgGallery = function () {
  fetch("https://images-api.nasa.gov")
  .then(function(response) {
    return response.json();
  })
  .then(function(galleryResponse) {
    console.log(galleryResponse);
    displayGallery(galleryResponse);
  });
}

var displayGallery = function (galleryResponse) {
  destroyElement();
  introContainerEl.html("<h4>NASA Photo Gallery</h4>");
  //Image Search Bar
  var imageSearchWrapper = $("<div>").addClass("image-search-wrapper col s12 m12 l12")
  var imageSearchLabel = $("<label class=\"label-icon\" for=\"search\">")
  var imageSearchInput = $("<input type=\"search\" id=\"search\" placeholder=\"Search for an Image\">")
  var searchIcon = $("<i>").addClass("far fa-search")
  //Gallery Container
  var galleryContainer = $("<div>").addClass("galleryContainer col s12 m12 l12")
  // Gallery
  // var gallery = $()
  // Append Display to Container
  // galleryContainer.append(gallery);
  introContainerEl.append(imageSearchWrapper);
  imageSearchWrapper.append(imageSearchLabel, imageSearchInput, searchIcon);
  introContainerEl.append(galleryContainer);
}

//this is the name of the astronaut stuff
var getAstronauts = function () {
    destroyElement();
    var rowContainerEl = $("<div>").addClass("row").attr("id", "astronauts-row");
    introContainerEl.append(rowContainerEl);
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
                displayAstro(bioResponse.results[0]);
              });
        })
    });
};

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
                
                <div class="card-action blue lighten-1">
                    <a href="${astronautArray.wiki}" target="_blank">Wikipedia</a>
                </div>
            </div>
        </div>`
    );
    $("#astronauts-row").append(colContainerEl);
    
};

// Below Images of the Day 
// Nasa Image of the Day
function getNasa() {
    fetch(
        `https://api.nasa.gov/planetary/apod?api_key=gnFNvMf5jFd0dEp5xPORKtYxKUXbb64ISb5kLNdU`
    )
    .then(function(response) {
        return response.json();
      })
    .then(function(response) {

        // Var of Image URL for image of the day
        var nasaImage = $("<img>").attr("src", response.url).attr("width", 220);
            
        // Var of Title & Description for image of the day
        var nasaTitle = $("<h5>").text(response.title).addClass("sidebar-subheader")
        // var nasaDesc = $("<p>").text(response[0].explanation)
        
        // Append Image, Title, and Descritpion to the sidebar
        $("#nasa").append(nasaImage, nasaTitle);
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
        
        // Use image info to fetch additional information
        fetch(
            `https://www.astrobin.com` + astroImageInfo +`?api_key=44c950a81df45f010f9ada74487616c154e92b96&api_secret=9a1781a8d6378a530f3c81cf145464531279d658&format=json.`
        )
        .then(function(response) {
            return response.json();
          })
        .then(function(response) {
            // Var of HD Image URL for image of the day
            var astroImage = $("<img>").attr("src", response.url_hd).attr("width", 220);
            
            // Var of Title for image of the day
            var astroTitle = $("<h4>").text(response.title).addClass("sidebar-subheader")
            
            // Append Image & Title to the sidebar
            $("#astrobin").append(astroImage, astroTitle);
        })
    })  
};


// Below is the Recent Space News
// Space News - Fetch News By Spaceflight
var getSpaceFlightNews = function() {
    fetch(
        `https://spaceflightnewsapi.net/api/v1/articles`
    )
    .then(function(spaceNewsResponse) {
        return spaceNewsResponse.json();
    })
    .then(function(spaceNewsResponse) {
        console.log(spaceNewsResponse);
        displayNewsPage(spaceNewsResponse);  
    })
} 
    
// Space News - Fetch News By Hubble
    
// Display the News 
var displayNewsPage = function (spaceNewsResponse) {
  destroyElement();
  // Create row for the news
  introContainerEl.html("<h4>Space Flight News</h4>").append("<div class=\"row\">");

  // Loop through the news
  for (i =0; i < spaceNewsResponse.docs.length; i++) {
      // Container for Each Piece of News
      var spaceFlightCardContainer = $("<div>").addClass("col");
      var card = $("<div>").addClass("card horizontal");
      var image = $("<div>").addClass("card-image hide-on-med-and-down");
      var body = $("<div>").addClass("card-stacked");

      // Display Information
      var spaceFlightPubDate = $("<p>").addClass("card-content").text(moment(spaceNewsResponse.docs[i].published_date).format("MMM. Do, YYYY"));
      var spaceFlightImage = $("<img>").attr("src", spaceNewsResponse.docs[i].featured_image).attr("width", 100).addClass("center-align");
      var spaceFlightTitle = $("<p>").addClass("card-title center-align").text(spaceNewsResponse.docs[i].title);
      var readNow = $("<a>").text("Read Now").addClass("waves-effect waves-light btn-small").attr("href", spaceNewsResponse.docs[i].url).attr("target", "_blank");
      
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
