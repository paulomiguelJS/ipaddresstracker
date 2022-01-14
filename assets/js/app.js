const apiKey = 'at_mThjThVI886MAVVj7geCt2R0MJw7o';
const apiUri = 'https://geo.ipify.org/api/v1';

let searchIp = document.getElementById('ip');
let searchLocation = document.getElementById('location');
let searchTime = document.getElementById('time');
let searchIsp = document.getElementById('isp');

const handleInput = document.getElementById('ipAddress');
const handleSubmit = document.getElementById('searchBtn');

const map = L.map('map').setView([34.505, 100.43], 13);
L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      'pk.eyJ1IjoibWFqZHVtbXlkZXYiLCJhIjoiY2twd2oweDl6MDUyeTJ2bjI4dWtyOXl6cSJ9.sG8ApuPSPja8lz-OsZa5DQ',
  },
).addTo(map);

updateMarker = (updateMarker = [40.73061, -73.935242]) => {
  map.setView(updateMarker, 13);
  L.marker(updateMarker).addTo(map);
};

let ipUrl;

getIpDetails = (defaultIp) => {
  if (defaultIp == undefined) {
     ipUrl = `${apiUri}?apiKey=${apiKey}`;
  } else {
   ipUrl = `${apiUri}?apiKey=${apiKey}&ipAddress=${defaultIp}`;
  }

  fetch(ipUrl)
    .then( results => results.json())
    .then( data => {
      searchIp.innerHTML = data.ip;
      searchLocation.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`;
      searchTime.innerHTML = data.location.timezone;
      searchIsp.innerHTML = data.isp;

      updateMarker([data.location.lat, data.location.lng]);
    })
    .catch((error) => {
      alert('Unable to get IP details');
      console.log(error);
    });
};

document.addEventListener('load', updateMarker());

handleSubmit.addEventListener('click', e => {
  e.preventDefault();
  if (handleInput.value != '' || handleInput != null) {
    getIpDetails(handleInput.value);

    return;
  }
  alert('Please, enter a valid IP address')
});