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
  setTimeout(showSlidesAut, 7000); // Change image every 2 seconds
}


// CURRENCY RATE

// MAKE CURENCY ARRAY
const currCode = ["USD", "CNY", "EUR", "RUB", "UZS", "AFN", "JPY", "BGN"];

const currImg = ["united-states", "china", "european-union", "russia", "uzbekistan", "afghanistan", "japan", "united-kingdom"];


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
    currencyContainer.appendChild(currencyItem);
  };

  currencyRequest.send();
}

// LOCAL TIME AND DATE 
// const time = new Date();
// console.log(time);

// const localTime = document.createElement('p');
// localTime.setAttribute('class', 'local-time');

// const getTime = new Date();

// localTime.textContent = `${getTime.getHours()}:${getTime.getMinutes()}, Almaty`;
// console.log(localTime.textContent);

// const weekDay = ['Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// const localDate = document.createElement('p');
// localDate.setAttribute('class', 'local-date');
// localDate.textContent = `${weekDay[getTime.getDay() - 1]}, ${months[getTime.getMonth()]} ${getTime.getDate()}, ${getTime.getFullYear()}`;
// console.log(localDate.textContent);

// const almatyDate = document.getElementById('almatyTime');

// almatyDate.appendChild(localTime);
// almatyDate.appendChild(localDate);



