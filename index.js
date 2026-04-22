
/*const allertd = document.getElementById('alerts-display');
const errorm = document.getElementById('error-message');

async function fetchAPI(words) {
  
    let result; 
    try {
       
        const weatherApi = `https://api.weather.gov/alerts/active?area=${words}`;
        
        const response = await fetch(weatherApi);
        result = await response.json();
        
        
        if (result && result.features) {
           
            allertd.innerText = result.features[0].id || 'No ID found';
        }else{
            allertd.innerText='no active alerts for this area';
        }
    } catch (error) {
        console.error("Fetch error:", error);
        errorm.innerText = "Failed to load weather data.";
    }
}


    


fetchAPI(); 
const buttonelem = document.getElementById('button-id'); 
buttonelem.addEventListener('click', (e) => {
    const inputVal = document.getElementById('input-id').value; 
    if (inputVal) {
        fetchAPI(inputVal);
}}
);
*/
// index.js
const stateInput = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");

/* =========================
   Fetch Weather Alerts
========================= */
function fetchWeatherAlerts(state) {
  if (!state) {
    displayError("State abbreviation is required");
    return;
  }

  // Call the National Weather Service API
  return fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch weather alerts");
      }
      return response.json();
    })
    .then(data => {
      clearError();
      displayAlerts(data);  // display alerts in the page
      stateInput.value = ""; // clear input
    })
    .catch(error => {
      displayError(error.message);
    });
}

/* =========================
   Display Alerts on Page
========================= */
function displayAlerts(data) {
  // Clear previous alerts
  alertsDisplay.innerHTML = "";

  const count = data.features.length;

  // Title matches Jest test requirement
  const title = document.createElement("h2");
  title.textContent = `Weather Alerts: ${count}`;
  alertsDisplay.appendChild(title);

  // List each alert headline
  const ul = document.createElement("ul");
  data.features.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    ul.appendChild(li);
  });

  alertsDisplay.appendChild(ul);
}

/* =========================
   Error Handling
========================= */
function displayError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
}

function clearError() {
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");
}

/* =========================
   Button Click Event
========================= */
button.addEventListener("click", () => {
  const state = stateInput.value.trim().toUpperCase();
  fetchWeatherAlerts(state);
});

/* =========================
   Exports for Jest Testing
========================= */
module.exports = {
  fetchWeatherAlerts,
  displayAlerts,
  displayError,
  clearError
};