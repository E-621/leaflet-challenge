///////////////////////////////////////////////////// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
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
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("mapid", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}


// //////////////////////////////////////////////////////////// Define streetmap and darkmap layers
// var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 10,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: API_KEY
// });

// // Create our map, giving it the streetmap and earthquakes layers to display on load
// var myMap = L.map("mapid", {
//   center: [
//     37.09, -95.71
//   ],
//   zoom: 5,

// });

// streetmap.addTo(myMap);

// // Store our API endpoint inside queryUrl
// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// d3.json(queryUrl, function(data) {

//   /// We will create three function. 
//   // function 1 for style, function 2 for color and function 3 for radiues

//   function mapStyle(feature) {
//     return {
//       opacity: 1,
//       fillOpacity: 1,
//       fillColor: mapColor(feature.properties.mag),
//       color: "#000000",
//       radius: mapRadius(feature.properties.mag),
//       stroke: true,
//       weight: 0.5
//     };
//   }
//   function mapColor(mag) {
//     switch (true) {
//       case mag > 5:
//         return "#ea2c2c";
//       case mag > 4:
//         return "#eaa92c";
//       case mag > 3:
//         return "#d5ea2c";
//       case mag > 2:
//         return "#92ea2c";
//       case mag > 1:
//         return "#2ceabf";
//       default:
//         return "#2c99ea";
//     }
//   }

//   function mapRadius(mag) {
//     if (mag === 0) {
//       return 1;
//     }

//     return mag * 4;
//   }
  


//   L.geoJson(data, {

//     pointToLayer: function(feature, latlng) {
//       return L.circleMarker(latlng);
//     },

//     style: mapStyle,

//     onEachFeature: function(feature, layer) {
//       layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);

//     }
//   }).addTo(myMap);

//   var legend = L.control({
//     position: "bottomright"
//   });

//   legend.onAdd = function() {
//     var div = L.DomUtil.create("div", "info legend");

//     var grades = [0, 1, 2, 3, 4, 5];
//     var colors = ["#2c99ea", "#2ceabf", "#92ea2c", "#d5ea2c","#eaa92c", "#ea2c2c"];


//   // loop thry the intervals of colors to put it in the label
//     for (var i = 0; i<grades.length; i++) {
//       div.innerHTML +=
//       "<i style='background: " + colors[i] + "'></i> " +
//       grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
//     }
//     return div;

//   };

//   legend.addTo(myMap)
  
// });