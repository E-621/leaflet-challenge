///////////////////////////////////////////////////// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// Perform a GET request to the query URL, Once we get a response, send the data.features object to the createFeatures function
d3.json(queryUrl, function(data) {createFeatures(data.features);});
function createFeatures(earthquakeData) {
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + "Earthquake Data" + "</h3>" + "</h3><hr><p>" + "Magnitude: " + feature.properties.mag + "</p>" +
       "Location: " + feature.properties.place + "</p>" + "Depth: " + feature.geometry.coordinates[2]+" km");
  }
  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });
  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}
function createMap(earthquakes) {
  // Define streetmap and darkmap layers
  var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  // tileSize: 512,
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});
  // Define a baseMaps object to hold our base layers
  var baseMaps = {Light: light};
  // Create overlay object to hold our overlay layer
  var overlayMaps = {Earthquakes: earthquakes};
  // Create our map, giving it the map and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [light, earthquakes]
  });
  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  // L.control.layers(baseMaps, overlayMaps, {
  //   collapsed: false
  // }).addTo(myMap);
}


