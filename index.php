<?php include 'functions/connect.php'; ?>
<!DOCTYPE HTML>
<!--
	Clinic Map was developed to simplify accessing medical assistance especially during emergencies.
	Developed at #Garage48Kampala - 24th - 26th October 2014
	
	Contacts
	
	Team Members 
	1. Dr. Ruth Kemi 	- Project Manager 	- 
	2. Dr. Ruth Terry 	- Marketing Manager - 
	3. Elijah Bee 		- Developer			- 
	4. Aisha Nana 		- Designer			- 
	
	Awards & Recognition
	1. Best Public Service (Special Award) At Garage48 Kampala on 26th October 2014
	
	Words of Gratitude
	1. Garage48 and all the sponsors: Your team did an awesome job setting up this event, if it wasn't for you this whole thing would never have happened. Thank you.
	2. Google: For their cool cloud tools, maps platform and places API. Thank you.
	3. @n33co: The first version of clinic Map was built on the Astral template by HTML5 UP (html5up.net) The template is free for personal and commercial use under the CCA 3.0 license (html5up.net/license). Thank you.
	4. Our Mentors for the great advice and encouragement. Thank you.
	5. Our users. Thank you.
-->
<html>
	<head>
		<title>Clinic Map</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="description" content="" />
		<meta name="keywords" content="" />
		<!--[if lte IE 8]><script src="css/ie/html5shiv.js"></script><![endif]-->
		<script src="js/jquery.min.js"></script>
		<script src="js/skel.min.js"></script>
		<script src="js/init.js"></script>
		<noscript>
			<link rel="stylesheet" href="css/skel.css" />
			<link rel="stylesheet" href="css/style.css" />
			<link rel="stylesheet" href="css/style-desktop.css" />
			<link rel="stylesheet" href="css/style-noscript.css" />
		</noscript>
		<link rel="stylesheet" href="css/custom.css" />
		<!--[if lte IE 8]><link rel="stylesheet" href="css/ie/v8.css" /><![endif]-->
	</head>
	<body>
		<script>
		  window.fbAsyncInit = function() {
			FB.init({
			  appId      : '617923271652346',
			  xfbml      : true,
			  version    : 'v2.1'
			});
		  };
			
		  (function(d, s, id){
			 var js, fjs = d.getElementsByTagName(s)[0];
			 if (d.getElementById(id)) {return;}
			 js = d.createElement(s); js.id = id;
			 js.src = "//connect.facebook.net/en_US/sdk.js";
			 fjs.parentNode.insertBefore(js, fjs);
		   }(document, 'script', 'facebook-jssdk'));
		</script>
		<div id="showmain" style="display:none;">View Clinics</div>
		<div id="googlemaps"></div>
		<!-- Wrapper-->
		<div id="wrapper" style="visibility:hidden;">
		
			<!-- Nav -->
				<nav id="nav">
					<a href="#me" class="active showmain"><img src="images/home.jpg" /></a>
					<a href="#clinics" class="showmain"><img src="images/clinic-icon.jpg" /></a>
					<a href="#" class="" id="viewmap"><img src="images/map.jpg" /></a>
					<!--<a href="#contact" class="icon fa-envelope"><span>Contact</span></a>
					<a href="http://www.twitter.com/clinicmap" target="_blank" class="icon fa-twitter"><span>Twitter</span></a>
					<a href="https://www.facebook.com/pages/Clinic-Map/541168142653474" target="_blank" class="icon fa-facebook"><span>Facebook</span></a>-->
				</nav>

			<!-- Main -->
				
				<div id="main">
				<?php
					include 'pages/home.php';
					include 'pages/clinics.php';
					include 'pages/contact.php'; 
					?>
				</div>
				
			<!-- Footer -->
				<div id="footer">
					<ul class="copyright">
						<li>&copy; 2014 All Rights Reserved </li>
					</ul>
				</div>
		</div>
		<div class="fb-like" data-share="true" data-width="450" data-show-faces="false" style="margin-left:180px;"></div>
		<!--<div id="reminder" class="panel">
			<ul class="actions">
				<a href="#" class="jumplink"><li>Name</li></a>
				<a href="#" class="jumplink"><li>Email</li></a>
				<a href="#" class="jumplink"><li>Mobile</li></a>
				<a href="#" class="jumplink"><li>Save</li></a>
			</ul>
		</div>-->
		<script src="http://maps.googleapis.com/maps/api/js?sensor=false&libraries=places"></script>
		<script src="js/map.js"></script>
		<script src="js/custom.js"></script>

	</body>
</html>
<?php mysql_close(); ?>