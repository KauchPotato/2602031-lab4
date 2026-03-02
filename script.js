async function searchCountry(countryName){
    try{
        document.getElementById("spinner").classList.remove("hidden");
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        const borders = data[0].borders;
        console.log(borders);
        
    } catch(error){
        document.getElementById("error-message").innerHTML(error);
    } finally {
        document.getElementById("spinner").classList.add("hidden");
    }
}

document.getElementById('search-btn').addEventListener('click',() => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
})