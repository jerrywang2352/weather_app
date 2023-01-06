

async function getWeatherJSON(city) {
    /**
     * Returns the JSON weather file for the city 
     * Throws error if url is not valid 
     */
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c42af13053cc1c2a3369e33f927302c8`

    let response = await fetch(url,{mode: 'cors'}); 
    if(response.ok) {
        let json = await response.json();
        return json;   
    } else {
       throw new Error(response.statusText);  
    }
}

// class display {
//     constructor(json) {
//         this.json = json;
//         this.temp = json.main.temp;  
//     }
    
//     displayWeather() {
//         alert(this.json.main.temp); 
//     }

//     displayError() {
//         return; 
//     }
// }

async function displayWeather() {
    let city = prompt("Enter your city","London"); 
    try {
        weatherJSON = await getWeatherJSON(city);
        alert(weatherJSON.main.temp); 
    } catch {
        alert("Cannot find city");
        displayWeather(); 
    }
}
//displayWeather(); 