// The latitude and longitude of your business / place
//var position = [0.3226564,32.5764325];
var clinics = [];
var name = '';
var latitude = '';
var longitude = '';
var type = '';
var phone = '';
var token = '';
var html = '';


var pos = '';
var thingsToFind = ['doctor','clinic','hospital','private hospital','health centre'];
var radius = 1000;
	

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


var map;

function initialize() {
  var mapOptions = {
	zoom: 16, // initialize zoom level - the max value is 21
	streetViewControl: false, // hide the yellow Street View pegman
	scaleControl: true, // allow users to zoom the Google Map
	mapTypeId: google.maps.MapTypeId.ROADMAP,
  };
  
  map = new google.maps.Map(document.getElementById('googlemaps'),
	  mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
	  pos = new google.maps.LatLng(position.coords.latitude,
									   position.coords.longitude);
	  
	  var infowindow = new google.maps.InfoWindow({
		map: map,
		position: pos,
		content: 'Finding medical services around you...'
	  });
	  
	  // Show the default red marker at the location
		marker = new google.maps.Marker({
			position: pos,
			map: map,
			draggable: false,	
			animation: google.maps.Animation.DROP,
			//title: 'You are here'
		});

	  map.setCenter(pos);
	  
	  // LOCATION FOUND 
	  
		var service = new google.maps.places.PlacesService(map);

		var request = {
			location: pos,
			radius: radius,
			types: thingsToFind
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
				  '<p><b>'+name+'</b>'+
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


	  // END FIND CLINICS
	  
	  
	  
	  
	  
	  
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
	position: new google.maps.LatLng(0.3226564, 32.5764325),
	content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);