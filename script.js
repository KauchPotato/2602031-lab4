

async function searchCountry(countryName){
    try{
        document.getElementById('loading-spinner').classList.remove("hidden");
        document.getElementById('bordering-countries').innerHTML = '';
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        
        const country = data[0];

        document.getElementById('country-info').innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital[0]}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <img src="${country.flags.svg}" alt="${country.name.common} flag">`;
        
    } catch(error){
        document.getElementById("error-message").innerHTML = error;
    } finally {
        document.getElementById('loading-spinner').classList.add("hidden");
    }
}



document.getElementById('search-btn').addEventListener('click',() => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
})