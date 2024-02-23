//document.addEventListener("DOMContentLoaded", function () {
  // Initialize the map
//  var map = L.map('map').setView([40.244025, -97.22], 4);

  // Add a tile layer (using OpenStreetMap)
//  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//    attribution: '&copy; OpenStreetMap contributors'
//  }).addTo(map);

  // Add a marker at a specific location
//  var marker = L.marker([-97.22, 32.244025]).addTo(map);
//});

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the map with a higher zoom level
  var map = L.map('map').setView([40.244025, -97.22], 4); // Adjust the zoom level (e.g., change from 13 to 10)

  // Add a tile layer (using OpenStreetMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);


  // Add click event listener to the map
  map.on('click', function (e) {
    // Display a popup with the clicked coordinates
    L.popup()
      .setLatLng(e.latlng)
      .setContent("Coordinates: " + e.latlng.toString())
      .openOn(map);
  });
});