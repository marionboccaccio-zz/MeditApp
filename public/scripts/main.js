var map;
var infoWindow;

var request;
var service;
var markers = [];
const result1 = document.getElementById("results_list");

function initMap1() {
  var center = new google.maps.LatLng(48.86667, 2.349014);
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 12
  });

  request = {
    location: center,
    radius: "1000",
    name: "yoga"
  };
  infoWindow = new google.maps.InfoWindow();

  service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, callback);

  google.maps.event.addListener(map, "click", function(event) {
    clearResults(markers);
    const latLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };

    var request = {
      location: latLng,
      radius: "1000",
      name: "yoga"
    };
    service.nearbySearch(request, callback);
  });
}

function initMap2() {
  var center = new google.maps.LatLng(48.86667, 2.349014);
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 12
  });

  request = {
    location: center,
    radius: "1000",
    name: "meditation"
  };
  infoWindow = new google.maps.InfoWindow();

  service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, callback);

  google.maps.event.addListener(map, "click", function(event) {
    clearResults(markers);
    const latLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };

    var request = {
      location: latLng,
      radius: "1000",
      name: "meditation"
    };
    service.nearbySearch(request, callback);
  });
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      markers.push(createMarker(results[i]));
    }
    for (let i = 0; i < results.length; i++) {
      result1.innerHTML += `<li><span style="font-weight: italic;">${results[i].name}</span> : ${results[i].vicinity}</li>`;
    }
  }
}
function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, "mouseover", function() {
    infoWindow.setContent(place.name);
    infoWindow.open(map, this);
  });
  return marker;
}

function clearResults(markers) {
  console.log("hey");
  for (var m in markers) {
    markers[m].setMap(null);
  }
  markers = [];
}

// console.log(markers);
google.maps.event.addDomListener(window, "load", initMap1);
google.maps.event.addDomListener(window, "load", initMap2);
