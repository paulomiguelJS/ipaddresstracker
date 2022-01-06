const apiKey = 'at_mThjThVI886MAVVj7geCt2R0MJw7o';
const apiUri = 'https://geo.ipify.org/api/';

let searchIp = document.getElementById('ip');
let searchLocation = document.getElementById('location');
let searchTime = document.getElementById('time');
let searchIsp = document.getElementById('isp');

const gotIp = document.getElementById('ipAddress').value;
const searchBtn = document.getElementById('ipAddress');

const headersOption = {
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const map = L.map('mapId', {
  center: [0, 0],
  zoom: 0,
  layers: [
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }),
  ],
});

updateMarker = (updateMarker = [-20, 20]) => {
  map.setView(updateMarker, 13);
  L.marker(updateMarker).addTo(map);
};

getIpDetails = (defaultIp) => {
  if (defaultIp == undefined) {
    let ipUrl = `${apiUri}?apiKey=${apiKey}`;
  } else {
    let ipUrl = `${apiUri}?apiKey=${apiKey}&ipAddress=${defaultIp}`;
  }
  fetch(ipUrl, headersOption)
    .then((results) => results.json())
    .then((data) => {
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

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (gotIp.value != '' && gotIp != null) {
    getIpDetails(gotIp.value);

    return;
  }
});
