var map, geocoder, pos;

function initialize() {
  geocoder = new google.maps.Geocoder();
  var mapOptions = {
    zoom: 17
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

    var infowindow = new google.maps.InfoWindow({
      map: map,
      position: pos,
      content: 'Current Location'
    });
    var marker = new google.maps.Marker({
      position: pos,
      map: map,
      title: 'Hello World!'
    });

    map.setCenter(pos);
    // }
    // , function() {
    //   handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }

}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(37.775, 122.419),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

var circle,
  meditating = false; 

// Click turns marker on
$(function() {
  $('#on').on('click', function() {

    meditating = !meditating;
    if(meditating) {
      circle = new google.maps.Circle({
        strokeColor: '#0099FF',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#3399FF',
        fillOpacity: 0.35,
        map: map,
        center: pos,
        radius: 24 
      });
    } else {
      circle.setVisible(false);  
    }

  });


// Find location
function codeAddress() {
  geocoder = new google.maps.Geocoder();
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
});


google.maps.event.addDomListener(window, 'load', initialize);