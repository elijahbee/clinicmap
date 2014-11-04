$('#viewmap').click(function() {
	$('#wrapper').css('display','none');
	$('#showmain').css('display','block');
	$('#googlemap').css('margin-top','100px');
});
$('#showmain').click(function() {
	$('#wrapper').css('display','block');
	$('#showmain').css('display','none');
	$('#googlemap').css('margin-top','0');
});