let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

let slideIndex1 = 0;
showSlidesAut();

function showSlidesAut() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex1++;
  if (slideIndex1 > slides.length) {slideIndex1 = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex1-1].style.display = "block";  
  dots[slideIndex1-1].className += " active";
  setTimeout(showSlidesAut, 196200); // Change image every 2 seconds
}


// CURRENCY RATE

// MAKE CURENCY ARRAY
const currCode = ["USD", "CNY", "EUR", "RUB"];
const currCode2 = ["USD", "EUR"];

const currImg = ["united-states", "china", "european-union", "russia"];
const currImg2 = ["united-states", "european-union"];

const toKzt = document.createElement("div");
toKzt.setAttribute("class", "to-kzt");

const toCny = document.createElement("div");
toCny.setAttribute("class", "to-cny");

// GET CURRENT DATE
const currentDate = new Date();

const currentMonth = (currentDate.getMonth() + 1) < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1;

const currentDay = (currentDate.getDate()) < 10 ? `0${currentDate.getDate()}` : currentDate.getDate();

// CREATE END DATE FOR API
const endDate = `${currentDate.getFullYear()}-${currentMonth}-${currentDay}`;

// GET PREVIOUS DATE
const previousDate = new Date();
previousDate.setDate(currentDate.getDate() - 1);

// CREATE START DATE FOR API
const previousMonth = (previousDate.getMonth() + 1) < 10 ? `0${previousDate.getMonth() + 1}` : currentDate.getMonth() + 1;

const previousDay = (previousDate.getDate()) < 10 ? `0${previousDate.getDate()}` : previousDate.getDate();

const startDate = `${previousDate.getFullYear()}-${previousMonth}-${previousDay}`;

const baseKzt = document.createElement("p");
baseKzt.setAttribute("class", "base");
baseKzt.textContent = "KZT as a base";

const baseCny = document.createElement("p");
baseCny.setAttribute("class", "base");
baseCny.textContent = "CNY as a base";


for (let i = 0; i < currCode.length; i++) {
  const currencyRequest = new XMLHttpRequest();
  const curr = currCode[i];

  const currencyURL = `https://api.exchangerate.host/fluctuation?start_date=${startDate}&end_date=${endDate}&symbols=USD,CNY,KZT,EUR,RUB&base=${curr}`;

  currencyRequest.open("GET", currencyURL, true);

  const currencyContainer = document.getElementById("currency-container");
  const currencyItem = document.createElement('div');
  currencyItem.setAttribute('class', 'currency-item');

  currencyRequest.onload = function () {
    const currency = JSON.parse(this.response);

    const currencyValue = document.createElement("p");
    currencyValue.textContent = `${curr} : ${
      Math.round(currency.rates.KZT.end_rate * 100) / 100
    }`;

    const currValImg = document.createElement('div');
    const currImage = document.createElement('img');
    currImage.src = `./assets/media/${currImg[i]}.png`;
    
    currValImg.appendChild(currImage);
    currValImg.setAttribute('class', 'curr-val-img');

    currValImg.appendChild(currencyValue);

    const currencyChangeImg = document.createElement("img");
    const currencyChange = document.createElement('p');
    currencyChange.setAttribute('class', 'currency-change');
    currencyChange.textContent = - (Math.round(currency.rates.KZT.change * 100)) / 100;

    if (currency.rates.KZT.change > 0) {
      currencyChangeImg.src = './assets/media/down-arrow.png';
    } else {
      currencyChangeImg.src = './assets/media/up-arrow.png';
    }

    const currAndLogo = document.createElement('div');
    currAndLogo.setAttribute('class', 'curr-logo');

    currAndLogo.appendChild(currencyChangeImg)
    currAndLogo.appendChild(currencyChange);

    currencyItem.appendChild(currValImg);
    currencyItem.appendChild(currAndLogo);

    toKzt.appendChild(currencyItem);
    currencyContainer.appendChild(baseKzt);
    currencyContainer.appendChild(toKzt);
  };

  currencyRequest.send();
}
for (let i = 0; i < currCode2.length; i++) {
  const currencyRequest = new XMLHttpRequest();
  const curr = currCode2[i];

  const currencyURL = `https://api.exchangerate.host/fluctuation?start_date=${startDate}&end_date=${endDate}&symbols=USD,CNY,EUR&base=${curr}`;

  currencyRequest.open("GET", currencyURL, true);

  const currencyContainer = document.getElementById("currency-container");
  const currencyItem = document.createElement('div');
  currencyItem.setAttribute('class', 'currency-item');

  currencyRequest.onload = function () {
    const currency = JSON.parse(this.response);

    const currencyValue = document.createElement("p");
    currencyValue.textContent = `${curr} : ${
      Math.round(currency.rates.CNY.end_rate * 100) / 100
    }`;

    const currValImg = document.createElement('div');
    const currImage = document.createElement('img');
    currImage.src = `./assets/media/${currImg2[i]}.png`;
    
    currValImg.appendChild(currImage);
    currValImg.setAttribute('class', 'curr-val-img');

    currValImg.appendChild(currencyValue);

    const currencyChangeImg = document.createElement("img");
    const currencyChange = document.createElement('p');
    currencyChange.setAttribute('class', 'currency-change');
    currencyChange.textContent = - (Math.round(currency.rates.CNY.change * 100)) / 100;

    if (currency.rates.CNY.change > 0) {
      currencyChangeImg.src = './assets/media/down-arrow.png';
    } else {
      currencyChangeImg.src = './assets/media/up-arrow.png';
    }

    const currAndLogo = document.createElement('div');
    currAndLogo.setAttribute('class', 'curr-logo');

    currAndLogo.appendChild(currencyChangeImg)
    currAndLogo.appendChild(currencyChange);

    currencyItem.appendChild(currValImg);
    currencyItem.appendChild(currAndLogo);

    toCny.appendChild(currencyItem);
    currencyContainer.appendChild(baseCny);
    currencyContainer.appendChild(toCny);
  };

  currencyRequest.send();
}

// MODAL WINDOW NOTICE 
const openModal = document.getElementById("openModal");

const modalContainer = document.getElementById("modalContainer");

const closeModal = document.getElementById("closeModal");

openModal.onclick = () => {
  modalContainer.style.display = "block";
}

closeModal.onclick = () => {
  modalContainer.style.display = "none";
}

window.onclick = (event) => {
  if (event.target == modalContainer) {
    modalContainer.style.display = "none";
  }
}