document.getElementById("getWeatherBtn").addEventListener("click", getWeather);

document
  .getElementById("cityInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      getWeather();
    }
  });

// Fetch city names from the JSON file and populate the datalist
fetch("cities.json")
  .then((response) => response.json())
  .then((cities) => {
    const cityList = document.getElementById("cityList");
    cities.forEach((city) => {
      const option = document.createElement("option");
      option.value = city;
      cityList.appendChild(option);
    });
  });
function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "10cabe48cb40a5d3a48a30b545047a24"; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      document.getElementById("cityName").textContent = data.name;
      document.getElementById(
        "temperature"
      ).textContent = `Temperature: ${data.main.temp} °C`;
      document.getElementById(
        "description"
      ).textContent = `Description: ${data.weather[0].description}`;
      document.getElementById(
        "weatherIcon"
      ).src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      document.getElementById("weatherInfo").classList.remove("hidden");
      document.getElementById("error").classList.add("hidden");

      updateBackground(data.weather[0].main.toLowerCase());
    })
    .catch((error) => {
      document.getElementById("weatherInfo").classList.add("hidden");
      document.getElementById("error").classList.remove("hidden");
    });
}

function updateBackground(weather) {
  document.body.className = ""; // Reset any existing background class
  switch (weather) {
    case "clear":
      document.body.classList.add("sunny");
      break;
    case "clouds":
      document.body.classList.add("cloudy");
      break;
    case "rain":
    case "drizzle":
    case "thunderstorm":
      document.body.classList.add("rainy");
      break;
    // Add more cases for different weather conditions if needed
    default:
      document.body.classList.add("default"); // Optional: add a default background
      break;
  }
}
