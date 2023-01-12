async function displayWeather(place) {
    const errorDisplays = document.querySelectorAll(".error"); 
    try {
        weatherJSON = await getWeatherJSON(place);
        console.log(weatherJSON); 
        displayTemperature(weatherJSON.main.temp,weatherJSON.name,weatherJSON.weather[0].main,weatherJSON.weather[0].icon); 
        errorDisplays[0].innerHTML = '';
        errorDisplays[1].innerHTML = '';
    } catch {
        errorDisplays[0].innerHTML = "Location not found.";
        errorDisplays[1].innerHTML = 'Search must be in the form of "City", "City, State" or "City, Country".';
    }
}

async function getWeatherJSON(city) {
    /**
     * Returns the JSON weather file for the city 
     * Throws error if url is not valid 
     */
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c42af13053cc1c2a3369e33f927302c8`

    let response = await fetch(url,{mode: 'cors'}); 
    if(response.ok) {
        return response.json();  
    } else {
       throw new Error(response.statusText);  
    }
}


function displayTemperature(temp,city,precipitation,iconID) {
    //display current temperature
    const tempDisplay = document.querySelector(".temperature");
    const precipitationDisplay = document.querySelector(".precipitation");
    const cityDisplay = document.querySelector(".city");
    const iconDisplay = document.getElementById('icon');  
    tempDisplay.innerHTML = `${kelvinToF(temp)}&#8457`; 
    cityDisplay.innerHTML = city;
    precipitationDisplay.innerHTML = precipitation;
    console.log(iconID);
    const iconURL = `https://openweathermap.org/img/wn/${iconID}@2x.png`;
    iconDisplay.src = iconURL;
    
    //display forecast
    const forecastOne = document.getElementById('one');  
    const forecastTwo = document.getElementById('two'); 
    const forecastThree = document.getElementById('three'); 
    const forecastFour = document.getElementById('four'); 
    const forecastFive= document.getElementById('five'); 
    const forecastSix= document.getElementById('six'); 
    const forecastSeven = document.getElementById('seven'); 
}

function kelvinToF(kelvin) {
    return Math.round(1.8*(kelvin-273) + 32);
}


//event listener for location input 
const input = document.querySelector('input');
input.addEventListener('keypress', e => {
    if (e.key === "Enter") {
        let place = input.value;
        displayWeather(place);  
        input.value = "";
    }
}); 
