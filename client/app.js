/* Clicking a circle pops up infobox w time of session  
 Display all locations in FB on initial map 
 Over repeats loading of current positions in FB - draws circles on every click 
  --> Right now every DOMevent is triggering initialize (bottom line)
  -->  If circle has been drawn, log as already drawn to avoid doing again, 
  -->  Make sure to remove it when the circle ends 
  --> Over rendering due to click event and DOM reload -- when click event disabled, we elim extra render
     -- but have lost ability to remove circle on next click and after timeOut... 
 Add current loc button 
 Further ideas: Keep track of stats (total number, total time, broken down by region)
                Visualize the data - merge the circles in an area
*/


angular.module('meditation', [

]);

var renderUsers = function(map) {

  circle.setVisible(false);
  console.log('renderrr');
  firebase.on('value', function(snapshot) {
    var snapshot = snapshot.val();

    console.log('SNAP: ', snapshot); 
    
    for (var users in snapshot ) {
    
      // if ( logged[users] === undefined ) {
        var user = new google.maps.Circle( {
          strokeColor: '#0099FF',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#3399FF',
          fillOpacity: 0.35,
          map: map,
          center: new google.maps.LatLng( snapshot[users].position.k , snapshot[users].position.B ), 
          radius: 20 
        });
        // logged[users] = true; 
      // } 
    }
  });
};


var circle, emission,
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
      emission = firebase.push({'position': pos });
      setTimeout(function() {         // Circle disappears after 25 mins
        emission.remove();
        renderUsers(); 
        circle.setVisible(false);
      }, 1500000);
    } else {                        // Toggle circle off 
      emission.remove(); 
      circle.setVisible(false);
      // render();
      // initialize();
      // e.target.setVisible(false); 
    }
  });
});


