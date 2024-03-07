const apiKey = ""
const apiURL = ""

const searchButton = document.querySelector("#searchBtn")

searchButton.addEventListener("click", function(){
    let searchCity = document.querySelector("#searchCity")
    if(searchCity.value === ""){
        return alert("Please input atleast one city...")
    }
    
    console.log(searchCity.value)
    searchCity.value = ""
})