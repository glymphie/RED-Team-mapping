// Setup map
var map = L.map('map', {
  minZoom: 1,
  maxZoom: 10,
  center: [0, 0],
  zoom: 1,
  doubleClickZoom: false,
  crs: L.CRS.Simple
});

// Choose picture
var bounds = [[0,0],[400,700]];
var image = './maps/Myst_Map.webp'
L.imageOverlay(image, bounds).addTo(map);
map.fitBounds(bounds);

// Variables
var clickedCoordinates = [];
var mode = 'pointer';
var markers = [];
var activeMenu = null;

// Set mode
switchMode(mode);

// Event handler for marker mode button
document.getElementById('markerMode').addEventListener('click', function() {
  switchMode('marker');
});

// Event handler for path mode button
document.getElementById('pathMode').addEventListener('click', function() {
  switchMode('path');
});

// Event handler for path mode button
document.getElementById('pointerMode').addEventListener('click', function() {
  switchMode('pointer');
});

// Click event listener on the map
map.on('click', function(event) {
  var clickedLatLng = event.latlng;

  if (mode === 'marker') {
    var marker = L.marker(clickedLatLng).addTo(map).on('click', handleMarkerClick);

    marker.setIcon(createColoredIcon(randomColor()));

    createMarkerMenu(marker);
    markers.push(marker);

    switchMode('pointer');
  } else if (mode === 'path') {
    clickedCoordinates.push(clickedLatLng);

    if (clickedCoordinates.length > 1) {
      var path = L.polyline(clickedCoordinates, { color: 'blue' }).addTo(map);
    }

  } else if (mode === 'pointer') {
    console.log()
  }
});

// Function to switch the mode
function switchMode(newMode) {
  mode = newMode;
  document.getElementById('currentMode').textContent = 'Current mode: ' + mode.charAt(0).toUpperCase() + mode.slice(1);
}

// Function to handle marker click
function handleMarkerClick() {

  var markerId = this._leaflet_id;
  var menu = document.getElementById('menu-' + markerId);

  activateMenu(this, menu);
}

function activateMenu(marker, menu) {

  if (activeMenu === menu) {
    activeMenu = null;
  } else if (activeMenu) {
    activeMenu.classList.toggle('show');
    activeMenu = menu;
  } else {
    activeMenu = menu;
  }
  menu.classList.toggle('show');
}

function createMarkerMenu(marker) {
  var markerId = marker._leaflet_id;
  var menuContainer = document.createElement('div');
  menuContainer.id = 'menu-' + markerId;
  menuContainer.className = 'menu';

  // Header
  menuContainer.innerHTML = '<h4>' + markerId + '</h4>';

  // Color menu
  var colorPicker = document.createElement('input');
  colorPicker.type = 'color';
  colorPicker.addEventListener('change', function(e) {
    marker.setIcon(createColoredIcon(e.target.value));
  });

  menuContainer.appendChild(colorPicker);

  // Finish
  document.body.appendChild(menuContainer);
}

function createColoredIcon(color) {
  return L.divIcon({
    className: 'custom-icon',
    html: '<div style="background-color: ' + color + '"></div>',
    iconSize: [32, 32],
    iconAnchor: [16, 36]
  });
}

function randomColor() {
  return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}
