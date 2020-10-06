
   
     // Variables //
     let cities = [];
   
    // Get City from API //
    function getAPIs(city) {

    // API Key //
    const APIKey = "7b3dea9f51f9521ad1e328c3862e4254";
    let fiveDayQueryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},us&units=imperial&appid=${APIKey}`;
    let mainQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},us&units=imperial&appid=${APIKey}`;
  
    // API Calls //
    $.ajax({
        url: fiveDayQueryURL,
        method: "GET"
    })
    
        .then(function(response) {
        showFiveDayWeather(response);
    })
  
    $.ajax({
        url: mainQueryURL,
        method: "GET"
    })
    
        .then(function(response) {
        showCurrentWeather(response);
    })
  
        if (cities.indexOf(city) === -1) {
        cities.push(city);
    }
  
    saveCities();
    renderCities();

    };
  
    // Search Cities //
    $("#find-city").on("click", function(event) {
        event.preventDefault();

        let city = $("#city-input").val();
        getAPIs(city);
    
    });

    $("#city-list").on("click", ".city", function(event) {
        event.preventDefault();

        let city = $(this).text();
        getAPIs(city);
    
    });

    $("#clear-city-names").on("click", function() {
        cities = [];
        saveCities();
        renderCities();
    })

    // Previously Searched Cities Saved to Local Storage //
    function init() {
        let storedCities = JSON.parse(localStorage.getItem("cities"));

        if (storedCities !== null) {
        cities = storedCities;
        }
    }

    function saveCities() {
        localStorage.setItem("cities", JSON.stringify(cities));
    }

    // Current Weather //
    function showCurrentWeather(response) {
 
        let cityName = response.name;
        let cityDate = moment().format('LLL');
        let cityIcon = response.weather[0].icon;
        let cityTemp = Math.round(response.main.temp);
        let cityHumid = response.main.humidity;
        let cityWind = Math.round(response.wind.speed);
        let cityIconEl = $("<img>").attr("src", `https://openweathermap.org/img/w/${cityIcon}.png`)
        $("#city-name").text(cityName + ' (' + cityDate + ')').append(cityIconEl);
        $("#city-temp").text(cityTemp);
        $("#city-humid").text(cityHumid);
        $("#city-wind").text(cityWind);
        $("#UV-index").text(uvIndex);
    }

    // 5-Day Forecast //
    function showFiveDayWeather(response) {

    $("#five-day-deck").empty();

        for (let i = 6; i < 40; i += 8) {
        let cardDate = response.list[i].dt_txt;
        let date = new Date(cardDate).toLocaleDateString('en-US', {
            day : 'numeric',
            month : 'numeric',
            year : 'numeric'
    });

        let cardTemp = Math.round(response.list[i].main.temp);
        let cardHumid = Math.round(response.list[i].main.humidity);
        let iconSource = response.list[i].weather[0].icon;

        let cardEl = $("<div>").attr("class", "card");
        let cardBodyEl = $("<div>").attr("class", "card-body five-card");
        let cardTitleEl = $("<h6>").attr("class", "card-title").text(date);
        let cardIcon = $("<img>").attr("src", `https://openweathermap.org/img/w/${iconSource}.png`);
        let cardTempEl = $("<p>").attr("class", "card-text").text(`Temp: ${cardTemp} °F`);
        let cardHumidEl = $("<p>").attr("class", "card-text").text(`Humidity: ${cardHumid}%`);
        cardEl.append(cardBodyEl);
        cardBodyEl.append(cardTitleEl).append(cardIcon).append(cardTempEl).append(cardHumidEl);
        $("#five-day-deck").append(cardEl);
    }
}

    function renderCities() {

        $("#city-list").empty();

        cities.forEach(city => {

        let cityCard = $("<div>").attr("class", "card");
        let cityCardBody = $("<div>").attr("class", "card-body city").text(city);
        cityCard.append(cityCardBody);
        $("#city-list").prepend(cityCard);
    })
}

init();