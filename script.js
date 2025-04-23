async function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "f54923ba88d84a1c9b1125035252304";
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no`;

  const resultDiv = document.getElementById("result");

  // Loader setup
  const loadingDiv = document.createElement("div");
  loadingDiv.classList.add("loading");
  loadingDiv.innerHTML = `
    <div class="loader"></div>
    <p>Fetching weather...</p>
  `;

  resultDiv.classList.remove("hidden");
  resultDiv.innerHTML = "";
  resultDiv.appendChild(loadingDiv);

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      resultDiv.innerText = data.error.message;
      document.body.style.background =
        "linear-gradient(to right, #83a4d4, #b6fbff)";
      return;
    }

    // Set background based on current weather condition
    const condition = data.current.condition.text.toLowerCase();
    if (condition.includes("sunny")) {
      document.body.style.background =
        "linear-gradient(to right, #ff7e5f, #feb47b)";
    } else if (condition.includes("rain")) {
      document.body.style.background =
        "linear-gradient(to right, #00c6ff, #0072ff)";
    } else if (condition.includes("cloud")) {
      document.body.style.background =
        "linear-gradient(to right, #a8c0ff, #3f4c6b)";
    } else if (condition.includes("snow")) {
      document.body.style.background =
        "linear-gradient(to right, #b4e1f2, #006f9b)";
    } else {
      document.body.style.background =
        "linear-gradient(to right, #83a4d4, #b6fbff)";
    }

    // Current weather
    const current = `
      <div class="current-weather">
        <p><strong>${data.location.name}, ${data.location.country}</strong></p>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>Condition: ${data.current.condition.text}</p>
        <img src="${data.current.condition.icon}" alt="weather icon">
      </div>
    `;

    // 5-Day forecast
    const forecastDays = data.forecast.forecastday
      .map((day) => {
        return `
        <div class="forecast-day">
          <p>${day.date}</p>
          <img src="${day.day.condition.icon}" alt="icon">
          <p>${day.day.avgtemp_c}°C</p>
          <p>${day.day.condition.text}</p>
        </div>
      `;
      })
      .join("");

    // Combine all
    resultDiv.innerHTML = `
      ${current}
      <h3>5-Day Forecast</h3>
      <div class="forecast-container">${forecastDays}</div>
    `;
  } catch (error) {
    resultDiv.innerText = "Failed to fetch weather data.";
    resultDiv.classList.remove("hidden");
    document.body.style.background =
      "linear-gradient(to right, #83a4d4, #b6fbff)";
  }
}

// geolocation
async function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = "f54923ba88d84a1c9b1125035252304";
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;

        const resultDiv = document.getElementById("result");
        const loadingDiv = document.createElement("div");
        loadingDiv.classList.add("loading");
        loadingDiv.innerHTML = `
        <div class="loader"></div>
        <p>Fetching weather...</p>
      `;

        resultDiv.classList.remove("hidden");
        resultDiv.innerHTML = "";
        resultDiv.appendChild(loadingDiv);

        try {
          const res = await fetch(url);
          const data = await res.json();

          if (data.error) {
            resultDiv.innerText = data.error.message;
          } else {
            resultDiv.innerHTML = `
            <p><strong>${data.location.name}, ${data.location.country}</strong></p>
            <p>Temperature: ${data.current.temp_c}°C</p>
            <p>Condition: ${data.current.condition.text}</p>
            <img src="${data.current.condition.icon}" alt="weather icon">
          `;

            const condition = data.current.condition.text.toLowerCase();
            if (condition.includes("sunny")) {
              document.body.style.background =
                "linear-gradient(to right, #ff7e5f, #feb47b)";
            } else if (condition.includes("rain")) {
              document.body.style.background =
                "linear-gradient(to right, #00c6ff, #0072ff)";
            } else if (condition.includes("cloud")) {
              document.body.style.background =
                "linear-gradient(to right, #a8c0ff, #3f4c6b)";
            } else if (condition.includes("snow")) {
              document.body.style.background =
                "linear-gradient(to right, #b4e1f2, #006f9b)";
            }

            resultDiv.classList.remove("hidden");
          }
        } catch (error) {
          resultDiv.innerText = "Failed to fetch weather data.";
        }
      },
      () => {
        alert("Location access denied. Please allow it to use this feature.");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}


//greeting
function showGreeting() {
  const now = new Date();
  const hour = now.getHours();
  let greeting = "";

  if (hour < 12) {
    greeting = "☀️ Good Morning!";
  } else if (hour < 18) {
    greeting = "🌤️ Good Afternoon!";
  } else {
    greeting = "🌙 Good Evening!";
  }

  const greetingDiv = document.getElementById("greeting");
  greetingDiv.innerText = greeting;
  greetingDiv.classList.remove("hidden");
}
window.onload = () => {
  showGreeting();
};




