// The latitude and longitude of your business / place
var position = [0.3226564,32.5764325];
var clinics = [];
var name = '';
var latitude = '';
var longitude = '';
var type = '';
var phone = '';
var token = '';
var html = '';

function display(){
	
}

function reminder(){
	$('#reminder').css({'display':'block','position':'absolute','height':'200px','z-index':'1000'});
}

function setname(name){
	$('#name').html(name);
}

function save(){ // Saves each clinic to the database for offline access 
	var url = "functions/save.php?name=" + name + "&address=" + address +
			"&type=" + type + "&lat=" + latitude + "&lng=" + longitude + "&token=" + token;
	downloadUrl(url, function(data, responseCode) {
		if (responseCode == 200 && data.length >= 1) {
		}
	});
}

function downloadUrl(url, callback) { 
  var request = window.ActiveXObject ?
	  new ActiveXObject('Microsoft.XMLHTTP') :
	  new XMLHttpRequest;

  request.onreadystatechange = function() {
	if (request.readyState == 4) {
	  request.onreadystatechange = doNothing;
	  callback(request.responseText, request.status);
	}
  };
  
  function doNothing() {}

  request.open('GET', url, true);
  request.send(null);
}

function showGoogleMaps() {
 
    var LatLng = new google.maps.LatLng(position[0], position[1]);
 
    var mapOptions = {
        zoom: 16, // initialize zoom level - the max value is 21
        streetViewControl: false, // hide the yellow Street View pegman
        scaleControl: true, // allow users to zoom the Google Map
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: LatLng
    };
 
    map = new google.maps.Map(document.getElementById('googlemaps'),
        mapOptions);
	
	// Try HTML5 geolocation
	  if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
		  var pos = new google.maps.LatLng(position.coords.latitude,
										   position.coords.longitude);
			LatLng = (position.coords.latitude, position.coords.longitude);
		 /* var infowindow = new google.maps.InfoWindow({
			map: map,
			position: pos,
			//content: 'Location found using HTML5.'
		  });*/

		  map.setCenter(LatLng);
		  
		}, function() {
		  handleNoGeolocation(true);
		});
	  } else {
		// Browser doesn't support Geolocation
		handleNoGeolocation(false);
	  }
	  
	  function handleNoGeolocation(errorFlag) {
		  if (errorFlag) {
			var content = 'Error: The Geolocation service failed.';
		  } else {
			var content = 'Error: Your browser doesn\'t support geolocation.';
		  }

		  var options = {
			map: map,
			position: new google.maps.LatLng(0.3226564, 32.5764325),
			content: content
		  };

		  var infowindow = new google.maps.InfoWindow(options);
		  map.setCenter(options.position);
		}
		
	
    // Show the default red marker at the location
    marker = new google.maps.Marker({
        position: LatLng,
        map: map,
        draggable: false,	
        animation: google.maps.Animation.DROP,
		//title: 'You are here'
    });
	
	var service = new google.maps.places.PlacesService(map);

	var request = {
		location: LatLng,
		radius: '15000',
		types: ['hospital','clinic','health centre']
	};
		
	service.nearbySearch(
		request, function(data){
		clinics = data;
		var clinicicon = 'images/clinicicon.png';
		$(data).each(function(index,item){
			var hmarker = new google.maps.Marker({
				position: item.geometry.location,
				map: map,
				draggable: false,
				icon:clinicicon,
				animation: google.maps.Animation.DROP,
				title: item.name
			});
			
			name = item.name;
			longitude = item.geometry.location.B;
			latitude = item.geometry.location.k;
			type = item.types[0];
			address = item.vicinity;
			token = item.place_id;
			
			var contentString = '<div id="content">'+
			  '<div id="siteNotice">'+
			  '</div>'+
			  '<h1 id="firstHeading" class="firstHeading">'+name+'</h1>'+
			  '<div id="bodyContent">'+
			  '<p><b>'+name+'</b>, offers the following services:<br></p>'+'<table><thead><tr><td>Monday</td><td>Tuesday</td><td>Wednesday</td><td>Thursday</td><td>Friday</td></tr></thead><tbody><tr><td>Obstetrics & <br>Gynaecology</td><td>Paediatrics & <br>Geiratrics</td><td>Hypertention & <br>Diabetes Mellitus</td><td>Ear, Nose & Throat <br>Optical<br> Psychiatry </td><td>Anti-Retroviral <br>Therapy</td></tr></tbody></table><ul class="actions"><a href="#" class="jumplink" onclick="reminder();"><li>Set a reminder</li></a><a href="#" class="jumplink"><li>Book an appointment</li></a></ul>'+
			  '</div>'+
			  '</div>';

			var infowindow = new google.maps.InfoWindow({
			  content: contentString
			});

			google.maps.event.addListener(hmarker, 'click', function() {
				infowindow.open(map,hmarker);
			});
			
			html += '<a href="#oneclinic" onclick="setname('+name+')"><li>'+name+'</li></a>';
			save();
			$('#clinicview').html(html);
		});
	});
	
}
 
google.maps.event.addDomListener(window, 'load', showGoogleMaps);
