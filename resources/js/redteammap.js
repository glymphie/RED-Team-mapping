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
