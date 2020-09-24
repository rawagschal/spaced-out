// Global Variables
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
};

//this creates the back button, you can add this to whereever you make a new page
var displayBackBtn = function () {
  var backBtnEl = $("<button>")
    .attr("type", "button")
    .addClass("back-button")
    .html(
      `<i class="tiny material-icons">navigate_before</i><span class="et-go-home"> Main Page</span>`
    )
    .on("click", displayIntroPage);
  headerContainerEl.append(backBtnEl);
};

//displays main page
var displayIntroPage = function () {
    // this will nuke all the script when pages lead back here
    destroyElement();
    destroyBackBtn();
    //these create the elements
    //generate intro banner
    var imgEl = $("<img>").attr("src", "assets/images/spaced-out-banner.png").addClass("img-banner");
    var paraContainerEl = $("<p>").addClass("intro-paragraph").text("Look up into the cosmos a little more often.");
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
};

// Below is Mercury in Retrograde response
function getMercury() {
    var date = moment(currentDate).format("(YYYY-MM-DD)")
    fetch(
        (`https:mercuryretrogradeapi.com/?date=&${date}`)
    )
    .then(function(mercuryResponse) {
        return mercuryResponse.json();
      })
    .then(function(mercuryResponse) {
        console.log("well it", mercuryResponse.is_retrograde);
        displayMercury(mercuryResponse);
    })
    
};

var mercuryAnswer = function (mercuryResponse) {
    if (mercuryResponse.is_retrograde === true) {
        // Display the result
        console.log("True")
        $("#mercuryAnswer").text("Mercury is currently in retrograde.");
    } else {
        // Display the result
        console.log("False")
        $("#mercuryAnswer").text("Mercury is not currently in retrograde.");
    }
}

var displayMercury = function () {
    destroyElement();
    displayBackBtn();
    //banner and paragraph
    var retrogradeHeaderEl = $("<h4>").text("Is Mercury in Retrograde?").addClass("mercury-header");
    var retrogradeBannerEl = $("<img>").attr("src", "assets/images/retrograde-banner.png").addClass("img-banner");
    var bannerCreditEl = $("<figure>").text("fig 1. Retrograde motion of Mars in 2005. Astrophotographer Tunc Tezel created this composite by superimposing images taken on 35 different dates, separated from each other by about a week.").addClass("credit-to");
    var retrogradeParaEl = $("<p>").text("I can guarantee you've heard of Mercury in Retrograde, but do you really know what that means? If you're into Astrology it might be the explanation for a bad day. But what is it really? Even in the research that went into writing this tiny paragraph, it was hard to find information that wasn't pseudoscience. Pseudoscience says when Mercury goes into Retrograde, communication of all sorts go haywire. Be that your cell phone, your laptop, or your train of thought. While that might be up for debate, one thing is certain, Retrograde is a real Astronomical event. It's an illusion that happens when the orbit of Mercury moves faster around the sun than Earth, creating the illusion that Mercury moves backward, creating a loop effect. The occurance takes roughly about a month and happens about 3 times a year, the length of time it takes Mercury to do a full orbit around us and the sun. It is an event that can be observed with most of the planets that we can see in the sky. With the chaos of everyday life, it's easy to see how this might have been a scapegoat for daily mishaps, but it's important to realize what this really is. An illusion and oddity of time.").addClass("mercury-paragragh");
    var btnPromptEl = $("<p>").text("Click below to find out.");
    var retrogradeBtn = $("<button>").attr("type", "button").text("Click here to find out").addClass("mercury-button").on("click", mercuryAnswer);
    var retroResponseEl = $("<div>").addClass("response-div").attr("id", "mercuryAnswer");
    var retroVideoContainerEl = $("<div>").addClass("mercury-iframe").html(`<iframe width="560" height="315" src="https://www.youtube.com/embed/FtV0PV9MF88" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
    // here are external links 
    var externalLinksContainer = $("<div>")
        .addClass("mercury-links")
        .html(` 
            <p>Click the links below to learn more about Mercury in Retrograde.
            <br/>
            <ol>
            <li><a href="https://www.youtube.com/watch?v=VXQh1xFce7s" target="_blank">Star Talk: Neil de Grass Tyson explains Mercury in Retrograde.</a></li>
            <li><a href="https://earthsky.org/space/what-is-retrograde-motion" target="_blank">EarthSky explains Mercury in Retrograde.</a></li>
            <li><a href="https://www.vox.com/videos/2018/11/16/18098729/what-is-mercury-retrograde-meaning" target="_blank">Vox's article on Mercury In Retrograde.</a></li>
            </ol></p>`);

    //appending all of them to the main container
    introContainerEl.append(retrogradeHeaderEl);
    introContainerEl.append(retrogradeBannerEl);
    introContainerEl.append(bannerCreditEl);
    introContainerEl.append(retrogradeParaEl);
    introContainerEl.append(btnPromptEl);
    retroResponseEl.append(retrogradeBtn);
    introContainerEl.append(retroResponseEl);
    introContainerEl.append(retroVideoContainerEl);
    introContainerEl.append(externalLinksContainer);
    introContainerEl.append(externalLinksContainer);
};

//this is how many astronauts are in space
var getAstronauts = function () {
    destroyElement();
    displayBackBtn(); //this is our back button
    var rowContainerEl = $("<div>").addClass("row").attr("id", "astronauts-row");
    introContainerEl.append(rowContainerEl);
    fetch("http://api.open-notify.org/astros.json", {method: 'GET'})
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
    `https://api.nasa.gov/planetary/apod?api_key=gnFNvMf5jFd0dEp5xPORKtYxKUXbb64ISb5kLNdU&date=` +
      currentDate.format("YYYY-MM-DD")
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      // Var of Image URL for image of the day
      var nasaImage = $("<img>").attr("src", response.url).addClass("day-img");

      // Var of Title & Description for image of the day
      var nasaTitle = $("<h5>")
        .text(response.title)
        .addClass("sidebar-subheader");
      // var nasaDesc = $("<p>").text(response[0].explanation)

      // Append Image, Title, and Descritpion to the sidebar
      $("#nasa").append(nasaImage, nasaTitle);
    });
}

// Astrobin Image of the Day
function getAstrobin() {
  fetch(
    `https://www.astrobin.com/api/v1/imageoftheday/?limit=1&api_key=44c950a81df45f010f9ada74487616c154e92b96&api_secret=9a1781a8d6378a530f3c81cf145464531279d658&format=json`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      var astroImageInfo = response.objects[0].image;

      // Use image info to fetch additional information
      fetch(
        `https://www.astrobin.com` +
          astroImageInfo +
          `?api_key=44c950a81df45f010f9ada74487616c154e92b96&api_secret=9a1781a8d6378a530f3c81cf145464531279d658&format=json.`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          // Var of HD Image URL for image of the day
          var astroImage = $("<img>")
            .attr("src", response.url_hd)
            .addClass("day-img");

          // Var of Title for image of the day
          var astroTitle = $("<h5>")
            .text(response.title)
            .addClass("sidebar-subheader");

          // Append Image & Title to the sidebar
          $("#astrobin").append(astroImage, astroTitle);
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
    .then(function (spaceNewsResponse) {
      displayNewsPage(spaceNewsResponse);
    });
};

// Display the News
var displayNewsPage = function (spaceNewsResponse) {
  destroyElement();
  displayBackBtn(); //this is our back button
  
  // Create row for the new
  introContainerEl.html("<h4>Space Flight News</h4>").append("<div class=\"row\">");
  var favoriteNews = $("<button>").addClass("material-icons waves-effect waves-light btn-small").text("star_border").attr("id", "favorite-news");
  introContainerEl.append(favoriteNews)
  
  // Loop through news
  loopNews(spaceNewsResponse);
  
  // Load More Button
  var loadMoreBtn = $("<button>")
    .attr("type", "button")
    .attr("id", "load-more")
    .text("Load More News")
    .addClass("main-button");
  introContainerEl.append(loadMoreBtn);
  
  // Clicking Load More, call Display More News
  $(document).on("click", "#load-more", function () {
    displayMoreNewsPage(spaceNewsResponse.nextPage);
    loadMoreBtn.remove();
  })

  // Clicking on Favorites, loads news articles
  $(document).on("click", "#favorite-news", function() {
    printFavoriteNews();
    loadMoreBtn.text("star");
  })
};

// Loop through News
var loopNews = function (spaceNewsResponse) {
  // Loop through the news
  for (let i =0; i < spaceNewsResponse.docs.length; i++) {

    // Container for Each Piece of News
    var spaceFlightCardContainer = $("<div>").addClass("col");
    var card = $("<div>").addClass("card flight-img-placement");
    var image = $("<div>").addClass("card-image");
    var body = $("<div>").addClass("card-stacked");

    // Favorite News
    var favoriteNews = $("<button>").addClass("material-icons").text("star_border").attr("id", "favorite-news-" + [i]);

    // Display Information

    var spaceFlightPubDate = $("<p>").addClass("card-content").text(moment(spaceNewsResponse.docs[i].published_date).format("MMM. Do, YYYY"));
    var spaceFlightImage = $("<img>").attr("src", spaceNewsResponse.docs[i].featured_image).addClass("center-align");
    var spaceFlightTitle = $("<p>").addClass("card-title center-align").text(spaceNewsResponse.docs[i].title);
    var readNow = $("<a>").text("Read Now").addClass("main-button").attr("href", spaceNewsResponse.docs[i].url).attr("target", "_blank");

    // Append Display to Container
    card.append(image.append(spaceFlightImage));
    card.append(body.append(favoriteNews, spaceFlightPubDate, spaceFlightTitle, readNow));
    spaceFlightCardContainer.append(card);
    introContainerEl.append(spaceFlightCardContainer);

    // Save Favorite News
    $(document).on("click", "#favorite-news-" + [i], function() {
      console.log("I was clicked");
      var newsTitle = spaceNewsResponse.docs[i].title
      console.log(newsTitle)
      // If news is not empty
      if (newsTitle !== "") {
          var newsSave =
          JSON.parse(window.localStorage.getItem("newsSave")) || [];
          
          var newsInfo = {
              title: newsTitle
          };
  
          // Save to Local Storage
          newsSave.push(newsInfo);
          window.localStorage.setItem("newsSave", JSON.stringify(newsSave));
      }
    })   
  }
};

// Display More News
var displayMoreNewsPage = function (spaceNewsResponse) {
  console.log(spaceNewsResponse);
  fetch(
    `https://spaceflightnewsapi.net/api/v1/articles?page=` + spaceNewsResponse
  )
    .then(function (spaceNewsResponse) {
      return spaceNewsResponse.json();
    })
    .then(function (spaceNewsResponse) {
      loopNews(spaceNewsResponse);
      var loadMoreBtn = $("<button>")
        .attr("type", "button")
        .attr("id", "load-more-2")
        .text("Load More News")
        .addClass("main-button");
      introContainerEl.append(loadMoreBtn);
      $(document).on("click", "#load-more-2", function () {
        displayMoreNewsPage(spaceNewsResponse.nextPage);
        loadMoreBtn.remove();
      });
    });
};

// Show favorites
function printFavoriteNews() {
  destroyElement();
  console.log("I was clicked")
  // Check Local Storage
  if(localStorage.length === 0) {
      console.log(" there is nothing in there")
  } else {
      var newsFavorites = JSON.parse(window.localStorage.getItem("newsSave")) || [];

      for (var i = 0; i < newsFavorites.length; i++) {
        fetch (
          `https://spaceflightnewsapi.net/api/v1/articles?title=` + newsFavorites[i].title
        )
        .then(function(spaceNewsResponse) {
          return spaceNewsResponse.json();
        })
        .then(function(spaceNewsResponse) {
          console.log(spaceNewsResponse.docs[0].title);
          loopNews(spaceNewsResponse);
        })
      }
  }
}

var displayInvaders = function () {
  destroyElement();
  displayBackBtn();
  var spaceInvadersContainerEl = $("<div>")
    .addClass("invader-iframe")
    .html(
      `<iframe src="https://funhtml5games.com?embed=spaceinvaders" style="width: 80%;height:450px;border:none;" frameborder="0" scrolling="no"></iframe>`
    );
  introContainerEl.append(spaceInvadersContainerEl);
  const highScoreForm = $(`<form id="scoreForm">
  <label for="initials">Enter Initials</label>
  <input type="text" name="initials" id="initials"></input>
  <label for="score">Save high score!:</label>
  <input type="number" name="score:" id="score"></input>
  <input type="submit" value="Submit"></input>
  </form>`)
  introContainerEl.append(highScoreForm)
  var scoreForm = document.getElementById("scoreForm")
  scoreForm.addEventListener("submit", function(event){
    event.preventDefault()
    var score = document.getElementById("score").value;
    var initials = document.getElementById("initials").value;
    saveHighscore(score, initials);
  })
  var highScores = JSON.parse(localStorage.getItem("highscores")) || [];
  var highScoreList = $(`<ul>`)
  for(var i=0; i<highScores.length; i++){
    var listItem = $(`<li>score:${highScores[i].score} initials:${highScores[i].initials}</li>`)
    highScoreList.append(listItem)
  }
  introContainerEl.append(highScoreList);
};

function saveHighscore(score, initials) {
  // If initials are empty
  if (initials !== "") {
    var highscores =
      JSON.parse(localStorage.getItem("highscores")) || [];
    // Get the score and initial info
    var newScore = {
      score: score,
      initials: initials,
    };

    // Save to Local Storage
    highscores.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
  }
}

//onclick event
$("#space-invaders").on("click", displayInvaders);
displayIntroPage();
getAstrobin();
getNasa();
