function generateInfoMenu(){
	var $ = jQuery;
	// /*
	var linkList = $("#sidebar").prepend('<ul class="infolink-ul"></ul>').find('ul');
	var m = window.location.href.match(/#.+/);
	
	if ( m !== null ) {
		$(m[0]).addClass('active');
	}
	
	$('.infotag').each(function(index){			
		var target = $(this).attr('id'); // target div
		var text = $(this).children('h3').text(); // text content for display
		
		linkList.append('<li><a href="#'+target+'">'+text+'</a></li>');
	});
	
	linkList.find('a').on('click', function(){
		var id = $(this).attr('href');
		$(id).addClass('active');
	});
	// */		
}
