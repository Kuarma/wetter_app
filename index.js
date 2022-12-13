const axios = require("axios");

const APPID = "1c301784983f34eab08beeda2c6538f9";

async function main() {
  function weatherUrl(city) {
    return `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&units=metric&APPID=${APPID}`;
  }

  async function getWeather(city) {
    const url = weatherUrl(city);
    try {
      const response = await axios({ url });
      const { main, cod } = response.data;
      if (cod !== 200) {
        throw new Error(`Error getting weather data for ${city}: ${response.data.message}`);
      }
      const { temp, temp_min, temp_max } = main;
      return { temp, temp_min, temp_max };
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const city = e.target.elements.city.value;
    getWeather(city)
      .then(data => {
        document.querySelector(".temp").innerHTML = data.temp;
        document.querySelector(".temp_min").innerHTML = data.temp_min;
        document.querySelector(".temp_max").innerHTML = data.temp_max;
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  const form = document.querySelector("form");
  form.addEventListener("submit", handleSubmit);
}

main();
