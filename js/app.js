const beerButton = document.querySelector('#beer-button');
const asyncButton = document.querySelector('#beer-button-async');
const randomBeerTitle = document.querySelector('#random-beer');
const randomBeerDescription = document.querySelector('#description');
const beerImage = document.querySelector('#beer-image');

const getData = () => {
    fetch('https://api.punkapi.com/v2/beers/random')
        .then(response => response.json())
        .then(data => {

            const name = data[0].name;
            const description = data[0].description;
            const volumeUnit = data[0].volume.unit;
            const volumeValue = data[0].volume.value

            randomBeerTitle.textContent = name + " | " + volumeValue + volumeUnit;
            randomBeerDescription.textContent = description;
            beerImage.setAttribute('src', data[0].image_url)
        });
}


//const asyncGetData= () => {
async function asyncGetData() {
    const response = await fetch('https://api.punkapi.com/v2/beers/random')
    const data = response.json()
    console.log(data);
}

getData();

beerButton.addEventListener('click', getData);
asyncButton.addEventListener('click', asyncGetData);