async function getCountryByCode(countryCode){
    try{
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const data = await response.json();
        const name = document.createElement('h2');
        const flag = document.createElement('img');
        name.innerHTML = data[0].name.common;
        flag.src = data[0].flags.svg;
        document.getElementById('bordering-countries').style.display = "block";
        document.getElementById('bordering-countries').appendChild(name);
        document.getElementById('bordering-countries').appendChild(flag);
    } catch(error){
        document.getElementById('error-message').innerHTML = error;
    }
}



async function searchCountry(countryName){
    try{
        document.getElementById("loading-spinner").classList.remove("hidden");
        document.getElementById('bordering-countries').innerHTML = '';
        document.getElementById('country-info').innerHTML = '';
        if(countryName.trim() === "") throw "Please enter a valid country";
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName.trim()}?fullText=true`);
        const data = await response.json();
        if (!response.ok) throw "Please enter a valid country"
        const borders = data[0].borders;
        const country = data[0];
        if(borders){
            document.getElementById('bordering-countries').innerHTML = "<h1>Bordering Countries</h1>"
            borders.forEach(element => {
                getCountryByCode(element);
            });
        }
        document.getElementById('country-info').style.display = "block";
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

document.addEventListener('DOMContentLoaded',() =>{
    document.getElementById('loading-spinner').classList.add("hidden");
    document.getElementById('bordering-countries').style.display = "none";
    document.getElementById('country-info').style.display = "none";
})



document.getElementById('search-btn').addEventListener('click',() => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
})