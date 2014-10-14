var map, geocoder;

function initialize() {
  // var access
  geocoder = new google.maps.Geocoder();
  var mapOptions = {
    zoom: 6
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
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
    }, function() {
      handleNoGeolocation(true);
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
  var marker = new google.maps.Marker({
      position: options.position,
      map: map,
      title: 'Hello World!'
  });

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

// Click turns marker on
$(function() {
  $('#on').on('click', function() {
    alert('ON'); 
  });
// Find location
  var location = $('#location').value;
  geocoder.geocode({ 'location': location}, function(results, status) {
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

});


google.maps.event.addDomListener(window, 'load', initialize);