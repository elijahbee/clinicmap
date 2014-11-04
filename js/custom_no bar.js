$('#viewmap').click(function() {
	$('#main').css('display','none');
	$('#nav a:after').css('display','none');
	$('#googlemap').css('margin-top','100px');
});
$('.showmain').click(function() {
	$('#main').css('display','block');
	$('#nav a:after').css('display','block');
	$('#googlemap').css('margin-top','0');
});