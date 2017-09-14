myApp.controller('RidePurposeController', function(DataService, $location, $http) {
  console.log('RidePurposeController created');
  var rc = this;
  rc.ride = {};
  rc.message = '';

  // This controller includes function for Google Maps JavaScript API with the Places Library
  //to provide Autocomplete
  geolocate();

  var placeSearch, autocomplete, autocomplete2, destA, destB, latA, lngA, latB, lngB;


  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
    {types: ['geocode']});

    // second location
    autocomplete2 = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete2')),
      {types: ['geocode']});

      function fillInAddress() {
        var geocoder = new google.maps.Geocoder();
        destA = autocomplete.getPlace();
        destB = autocomplete2.getPlace();


        // check on order of lng/lat AND Geog vs Geom
        if(destA) {
          rc.ride.latA = destA.geometry.location.lat();
          rc.ride.lngA = destA.geometry.location.lng();
          DataService.rideObject.latA = destA.geometry.location.lat();
          DataService.rideObject.lngA = destA.geometry.location.lng();
        }
        if(destB) {
          rc.ride.latB = destB.geometry.location.lat();
          rc.ride.lngB = destB.geometry.location.lng();
          // Adds location data to ride object on data service
          DataService.rideObject.latB = destB.geometry.location.lat();
          DataService.rideObject.lngB = destB.geometry.location.lng();
        }

      }




      // When the user selects an address from the dropdown, populate the address
      // fields in the form.
      autocomplete.addListener('place_changed', fillInAddress);
      rc.addressA = destA;

      autocomplete2.addListener('place_changed', fillInAddress);
      rc.addressB = destB;


      // Bias the autocomplete object to the user's geographical location,
      // as supplied by the browser's 'navigator.geolocation' object.
      function geolocate() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
          });
        }
      }


      //post the rider's start and end destination from the autocomplete
      //removes previous trip data from DB
      //makes a get request to get all matching drivers.
      rc.putDestAB = function() {
        DataService.connectRider();
        $http.delete('/trip/delete-incomplete').then(function(response) {
          $http.post('/rider/destAB', rc.ride).then(function(response) {
            // Requests ride, matching with drivers
            $http.get('/trip/match').then(function(res) {
              console.log('response from match', res.data.drivers);
            })
            $location.path('/trip-view');
          }).catch(function(response) {
            console.log('destAB put error', response);
            alert("Oh no! There was an error getting your ride");
          });
        }).catch(function(err) {
          console.log('error deleting previous trips', err);
        })
      };


      // Assigns the purpose of the ride
      rc.updatePurpose = function(purpose) {
        rc.ride.purpose = purpose;
      };


      // Confirm and assigns the purpose property of the ride object in data service
      rc.confirmPurpose = function() {
        if (rc.ride.purpose) {
          DataService.rideObject.purpose = rc.ride.purpose;
          $location.path('/input-ride');
        } else {
          rc.message = 'Please select a purpose';
        }
      };
    });
