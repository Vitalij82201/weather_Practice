const getDataButton = document.querySelector("#get-button");
const userWeatherContainer = document.querySelector(".weather-container");
const spinner = document.querySelector(".spinner");
const icon = document.querySelector(".icon");

const getWeather = async () => {
  spinner.classList.add("visible");
  const APP_ID = "21aab3e1b4114f7cc188406045bc0a0e";
  const CITY_NAME = document.querySelector("#form");
  let userCityValue = CITY_NAME.userCity.value;
  let personNameCity = String(userCityValue);
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${personNameCity}&appid=${APP_ID}`;

  try {
    const response = await fetch(URL);
    const result = await response.json();

    if (response.ok) {
      let tempCelvin = Math.floor(result.main.temp);
      let tempCelciuc = tempCelvin - 273;
      userWeatherContainer.textContent =
        result.name + " " + tempCelciuc + "°C";
      let apiIcon = result.weather[0].icon;
      icon.style.backgroundImage = `url(http://openweathermap.org/img/w/${apiIcon}.png)`;
    } else if (response.status === 400) {
      alert("Enter the name of the city");
    } else {
      throw new Error("Some response error message");
    }
  } catch (error) {
    userWeatherContainer.textContent = error.message;
  } finally {
    spinner.classList.remove("visible");
  }
};

getDataButton.addEventListener("click", getWeather);
