let APIKey = "7b3dea9f51f9521ad1e328c3862e4254";

// let cityName = $("<h2>").text(response.name);
// let tempEL = $("<p>").text("Temperature: " + response.main.temp);
// let humEl = $("<p>").text("Humidity: " + response.main.humidity);
// let windEl = $("<p>").text("Wind Speed: " + response.wind.speed);
// let currentWeather = response.weather[0].main;
// let displayMainDate = cityNameEl.append(" " + mainDate);


// let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + APIKey;
// let queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIKey;


//     $.ajax({
//         url: queryURL,
//         method: 'GET'
//     }).then(function (response) {
//         console.log(response);
//         console.log(queryURL);

//     

       
//         

//         if (currentWeather === "Rain") {
//             var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
//             currentIcon.attr("style", "height: 60px; width: 60px");
//         } else if (currentWeather === "Clouds") {
//             var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
//             currentIcon.attr("style", "height: 60px; width: 60px");
//         } else if (currentWeather === "Clear") {
//             var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
//             currentIcon.attr("style", "height: 60px; width: 60px");
//         }
//          else if (currentWeather === "Drizzle") {
//             var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
//             currentIcon.attr("style", "height: 60px; width: 60px");
//         }
//          else if (currentWeather === "Snow") {
//             var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
//             currentIcon.attr("style", "height: 60px; width: 60px");
//         }
//     }  

$(function() {

const inputEl = document.getElementById("city-input");
const searchEl = document.getElementById("searchCity");
const nameEl = document.getElementById("city-name");
const currentTempEl = document.getElementById("temperature");
const currentHumidityEl = document.getElementById("humidity");4
const currentWindEl = document.getElementById("windSpeed");
const currentUVEl = document.getElementById("uvIndex");
const historyEl = document.getElementById("history");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

    console.log(searchHistory);
    var currentDate = (moment().format('LLL'));
    $("#current-weather").append(currentDate);

        //When I click the search button, I am presented with current and future conditions. 
        $("button").on("click", function() {
            var searchCity = $("#searchCity").val();
            $("#searchCity").val("");
            searchWeather(searchCity);
        });
    
        function searchWeather(searchCity) {
    
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

        console.log(queryURL);
        console.log(searchCity);
    
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
    
                $("#currentCity").text(searchCity);
    
                var temperature = $("<p>").text("Temperature: " + response.main.temp + "°F");
    
                $('#currentCity').append(temperature);
    
                var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
    
                temperature.append(humidity);
    
                var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + "MPH");
    
                humidity.append(temperature);
    
            });
            
        
        }
    
        var history = JSON.parse(window.localStorage.getItem("history")) || [];
        if (history.length > 0) {
            searchWeather(history[history.length - 1]);
        }
    
        for ( var i = 0; i > history.length; i++){
            historyRow(history[i]); 
        }
            
    });


