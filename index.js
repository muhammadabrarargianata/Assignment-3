const app = document.getElementById('app')
const myForm = document.getElementById('my-form')
const search = document.querySelector('#my-button')
const myButton = document.getElementById('my-button')

main()

function main () {
  renderButton()
}

function renderButton () {
    search.setAttribute('id', '#my-button')
    myButton.setAttribute('id', 'my-button')
    myForm.append(myButton)  

    search.addEventListener('click', fetchCovidData)
    myButton.addEventListener('click', fetchCovidData) 
}

function fetchCovidData () {
  const input = document.getElementById("country").value;
  if (!input) {
    alert("Silahkan Masukkan Nama Negara!");
    return;
  }
  const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '0d0c891fe3mshe83d5358980390dp18b106jsn76196d76599f',
		'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }
  };
  
  fetch('https://covid-193.p.rapidapi.com/statistics?country=' +input, options)
    .then(response => response.json())
    .then(response => {
      renderCovidData(response)
    })
    .catch(err => {
        console.error(err);
        alert("Maaf Data Negara Tidak Ditemukan!");
      });
}

function renderCovidData(data) {
  const currentActCases = (data.response[0].cases.active || '0').toString().replace('+', ''); 
  const currentCases = (data.response[0].cases.new || '0').toString().replace('+', ''); 
  const currentRecovered = (data.response[0].cases.recovered || '0').toString().replace('+', ''); 
  const currentTotalC = (data.response[0].cases.total || '0').toString().replace('+', ''); 
  const currentDeaths = (data.response[0].deaths.total || '0').toString().replace('+', ''); 
  const currentTests = (data.response[0].tests.total || '0').toString().replace('+', ''); 

  const divCurrentActive = document.getElementById('activec');
  divCurrentActive.innerHTML = `${currentActCases}`;
  divCurrentActive.classList.add('white-text');
  box1.append(divCurrentActive);

  const divCurrentNews = document.getElementById('ncase');
  divCurrentNews.innerHTML = `${currentCases}`;
  divCurrentNews.classList.add('black-text');
  box2.append(divCurrentNews);

  const divCurrentRecovered = document.getElementById('recoverc');
  divCurrentRecovered.innerHTML = `${currentRecovered}`;
  divCurrentRecovered.classList.add('black-text');
  box3.append(divCurrentRecovered);

  const divCurrentTotal = document.getElementById('totalc');
  divCurrentTotal.innerHTML = `${currentTotalC}`;
  divCurrentTotal.classList.add('black-text');
  box4.append(divCurrentTotal);

  const divCurrentDeaths = document.getElementById('tdeath');
  divCurrentDeaths.innerHTML = `${currentDeaths}`;
  divCurrentDeaths.classList.add('black-text');
  box5.append(divCurrentDeaths);

  const divCurrentTests = document.getElementById('ttest');
  divCurrentTests.innerHTML = `${currentTests}`;
  divCurrentTests.classList.add('black-text');
  box6.append(divCurrentTests);
}
