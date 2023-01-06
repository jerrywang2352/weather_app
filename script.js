class Weather {
    constructor(city) {
    /**
     * city -> string: city name  
     * url -> string: Openweather API url  
     */
        this.city = city; 
        this.url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c42af13053cc1c2a3369e33f927302c8`;
    }
    async getWeatherJSON() {
    /**
     * Returns the JSON weather file for the city 
     * Throws 404 error if url is not valid 
     */
        let response = await fetch(this.url); 
        if(response.status == 200) {
            let json = await response.json();
            console.log(json);
            return json;   
        } else {
           throw new Error("404 Error");  
        }
    }
}

function displayWeather() {

}

function displayError() {

}

let London = new Weather("London"); 
console.log(London.url); 
London.getWeather(); 