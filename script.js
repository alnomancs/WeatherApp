document.getElementById("getWeatherBtn").addEventListener("click", getWeather);

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
    })
    .catch((error) => {
      document.getElementById("weatherInfo").classList.add("hidden");
      document.getElementById("error").classList.remove("hidden");
    });
}
