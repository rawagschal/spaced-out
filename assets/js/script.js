// // Global Variables
// var currentDate = moment();

// // Mercury Retrograde Button
// var mercuryRetroBtn = document.getElementById("button-1")
// $("#button-1").text("Is Mercury in Retrograde?");
// mercuryRetroBtn.onclick = getMercury;

// // Is Mercury in Retrograde response
// function getMercury() {
//     var date = moment(currentDate).format("(YYYY-MM-DD)")
//     fetch(
//         `https://mercuryretrogradeapi.com/?date=&${date}`
//     )
//     .then(function(mercuryResponse) {
//         return mercuryResponse.json();
//       })
//     .then(function(mercuryResponse) {
//         console.log(mercuryResponse.is_retrograde);
//     })
//     if ("mercuryResponse.is_retrograde" === "true") {
//         // Display the result
//         $("#button-1").append("<h1>True</h1>");
//     }
//     else {
//         // Display the result
//         $("#button-1").append("<h1>False</h1>");
//     }
// };
// console.log("hi");
var test = function(){
    fetch("http://api.open-notify.org/astros.json")
    .then(function (response) {
        return response.json()
    })
    .then(function (responseAstros) {
        console.log(responseAstros);
        Array.forEach(element => {
            
         })
        });  
        fetch("https://spacelaunchnow.me/api/3.3.0/astronaut/?search=" + responseAstros.people[0].name.split(" ")[1])
        .then(function (response) {
            return response.json();
        })
        .then(function (response){
            console.log(response);     
       })
     })
}    
test();