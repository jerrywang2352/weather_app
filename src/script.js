async function displayWeather(place) {
    /**
     * Effect: Displays current weather and 5-day forecast 
     * Alerts the User of an input error 
     */
    const errorDisplays = document.querySelectorAll(".error"); 
    try {
        weatherJSON = await getWeatherJSON(place);
        forecastJSON = await getForecastJSON(place); 
        weather = convertJSON(weatherJSON,forecastJSON);
        console.log(forecastJSON);
        displayTemperature(weather); 
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

async function getForecastJSON(city) {
    /**
     * Returns the JSON forecast file for the city 
     * Throws error if url is not valid 
     */
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c42af13053cc1c2a3369e33f927302c8`;
    
    let response = await fetch(url,{mode: 'cors'}); 
    if(response.ok) {
        return response.json();  
    } else {
        throw new Error(response.statusText);  
    }
}


function convertJSON(JSON,forecast) {
    data = {
        curr: {
            temp:JSON.main.temp,
            city:JSON.name,
            precipitation:JSON.weather[0].main,
            iconID: JSON.weather[0].icon
        },
        forecast: {}
    }
    let highTemp = Number.MIN_VALUE ;
    let lowTemp = Number.MAX_VALUE; 
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for(let i = 0; i <= 39 ; i ++) {
        highTemp = Math.max(highTemp,forecast.list[i].main.temp_max);
        lowTemp = Math.min(lowTemp,forecast.list[i].main.temp_min); 

        if ((i + 1)%8 == 0) {
            let day = (i + 1)/8;       
            weather = {};
            const d = new Date(forecast.list[i].dt_txt.substring(0,10)); 
            weather.date = days[d.getDay()];
            weather.high = highTemp;
            weather.low = lowTemp; 
            weather.iconID = forecast.list[i].weather[0].icon; 
            data.forecast[day] = weather;

            highTemp = Number.MIN_VALUE;
            lowTemp = Number.MAX_VALUE;
        }
    }
    return data;
}


function displayTemperature(data) {
    //display current temperature
    const tempDisplay = document.querySelector(".temperature");
    const precipitationDisplay = document.querySelector(".precipitation");
    const cityDisplay = document.querySelector(".city");
    const iconDisplay = document.getElementById('icon');  

    tempDisplay.innerHTML = `${kelvinToF(data.curr.temp)}&#8457`; 
    cityDisplay.innerHTML = data.curr.city;
    precipitationDisplay.innerHTML = data.curr.precipitation;
    const iconURL = `https://openweathermap.org/img/wn/${data.curr.iconID}@2x.png`;
    iconDisplay.src = iconURL;
    
    
    //display forecast
    for(let i = 1; i <= 5; i++) {
        let card = document.getElementById(`${i}`);
        card.querySelector('.day').innerHTML = data.forecast[i].date;  
        card.querySelector('.high').innerHTML = `${kelvinToF(data.forecast[i].high)}&#8457`;   
        card.querySelector('.low').innerHTML = `${kelvinToF(data.forecast[i].low)}&#8457`;
        card.querySelector('#daily-icon').src = `https://openweathermap.org/img/wn/${data.forecast[i].iconID.substring(0,2)}d@2x.png`;
    }

}

function kelvinToF(kelvin) {
    return Math.round(1.8*(kelvin-273) + 32);
}

displayWeather("London"); 

//event listener for location input 
const input = document.querySelector('input');
input.addEventListener('keypress', e => {
    if (e.key === "Enter") {
        let place = input.value;
        displayWeather(place);  
        input.value = "";
    }
}); 
