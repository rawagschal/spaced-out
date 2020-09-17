// Global Variable
var currentDate = moment();
console.log(currentDate)

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
};

getMercury();
