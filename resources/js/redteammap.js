/* Leaflet Example
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
*/

var map = L.map('map', {
  minZoom: 1,
  maxZoom: 10,
  center: [0, 0],
  zoom: 1,
  crs: L.CRS.Simple
});

var bounds = [[0,0],[400,700]];
var image = './maps/Myst_Map.webp'
L.imageOverlay(image, bounds).addTo(map);
map.fitBounds(bounds);

var clickedCoordinates = [];


var mode = 'pointer';
var markers = [];

// Event handler for marker mode button
document.getElementById('markerMode').addEventListener('click', function() {
  switchMode('marker');
});

// Event handler for path mode button
document.getElementById('pathMode').addEventListener('click', function() {
  switchMode('path');
});

// Click event listener on the map
map.on('click', function(event) {
  var clickedLatLng = event.latlng;

  if (mode === 'marker') {
    var marker = L.marker(clickedLatLng).addTo(map);
    markers.push(marker);
    mode = 'pointer';
    switchMode(mode);
  } else if (mode === 'path') {
    clickedCoordinates.push(clickedLatLng);

    if (clickedCoordinates.length > 1) {
      var path = L.polyline(clickedCoordinates, { color: 'blue' }).addTo(map);
    }

  }
});

// Function to switch the mode
function switchMode(newMode) {
  mode = newMode;
  document.getElementById('currentMode').textContent = 'Current mode: ' + mode.charAt(0).toUpperCase() + mode.slice(1);
}



