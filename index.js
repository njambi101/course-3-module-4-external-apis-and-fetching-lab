
const allertd = document.getElementById('alerts-display');
const errorm = document.getElementById('error-message');

async function fetchAPI(words) {
  
    let result; 
    try {
       
        const weatherApi = `https://api.weather.gov/alerts/active?area=${words}`;
        
        const response = await fetch(weatherApi);
        result = await response.json();
        
        
        if (result && result.features) {
           
            allertd.innerText = result.features[0]?.id || 'No ID found';
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




