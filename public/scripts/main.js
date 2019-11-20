var map;
var infoWindow;

var request;
var service;
var markers = [];
const result1 = document.getElementById("results_list");

function initMapYoga() {
  var center = new google.maps.LatLng(48.86667, 2.349014);
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 12
  });

  request = {
    location: center,
    radius: "1000",
    name: ["yoga"]
  };
  infoWindow = new google.maps.InfoWindow();

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);

  google.maps.event.addListener(map, "click", function(event) {
    result1.innerHTML = "";
    clearResults(markers);
    const latLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };

    var request = {
      location: latLng,
      radius: "1000",
      name: ["yoga"]
    };
    service.nearbySearch(request, callback);
  });

  const geocoder = new google.maps.Geocoder();

  geocodeMainAddress(geocoder, map);
  geocodeOtherAddress(geocoder, map);
}

function initMapMedit() {
  var center = new google.maps.LatLng(48.86667, 2.349014);
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 12
  });

  request = {
    location: center,
    radius: "1000",
    name: ["meditation"]
  };
  infoWindow = new google.maps.InfoWindow();

  service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, callback);

  google.maps.event.addListener(map, "click", function(event) {
    result1.innerHTML = "";
    clearResults(markers);
    const latLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };

    var request = {
      location: latLng,
      radius: "1000",
      name: ["meditation"]
    };
    service.nearbySearch(request, callback);
  });
  const geocoder = new google.maps.Geocoder();
  geocodeMainAddress(geocoder, map);
  geocodeOtherAddress(geocoder, map);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      markers.push(createMarker(results[i]));
    }
    for (let i = 0; i < results.length; i++) {
      console.log("photo", results[i].photos);
      result1.innerHTML += `<a href="/yoga/${results[i].id}}"><li><span style="font-weight: bold; color:rgb(226, 177, 162)">${results[i].name}</span> : <br> ${results[i].vicinity} <br></li></a>`;
      console.log(results);
    }
  }
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    icon: {
      url: "https://image.flaticon.com/icons/svg/1187/1187564.svg",
      scaledSize: new google.maps.Size(40, 52)
    },
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, "mouseover", function() {
    infoWindow.setContent(place.name);
    infoWindow.open(map, this);
  });
  return marker;
}

function clearResults(markers) {
  for (var m in markers) {
    markers[m].setMap(null);
  }
  markers = [];
}

function geocodeMainAddress(geocoder, resultsMap) {
  let address = document.getElementById("map").getAttribute("data-mainAddress");

  geocoder.geocode({ address: address }, function(results, status) {
    if (status === "OK") {
      resultsMap.setCenter(results[0].geometry.location);
      let marker = new google.maps.Marker({
        map: resultsMap,
        icon: {
          url: "https://image.flaticon.com/icons/svg/1119/1119071.svg",
          scaledSize: new google.maps.Size(40, 52)
        },
        position: results[0].geometry.location
      });
    } else {
      console.log(
        "Geocode was not successful for the following reason: " + status
      );
    }
  });
}

function geocodeOtherAddress(geocoder, resultsMap) {
  let address = document
    .getElementById("map")
    .getAttribute("data-otherAddress");

  geocoder.geocode({ address: address }, function(results, status) {
    if (status === "OK") {
      resultsMap.setCenter(results[0].geometry.location);
      let marker = new google.maps.Marker({
        map: resultsMap,
        icon: {
          url: "https://image.flaticon.com/icons/svg/787/787535.svg",
          scaledSize: new google.maps.Size(40, 52)
        },
        position: results[0].geometry.location
      });
    } else {
      console.log(
        "Geocode was not successful for the following reason: " + status
      );
    }
  });
}

// console.log(markers);
if (location.pathname == "/yoga") {
  google.maps.event.addDomListener(window, "load", initMapYoga);
} else if (location.pathname == "/meditation") {
  google.maps.event.addDomListener(window, "load", initMapMedit);
}
