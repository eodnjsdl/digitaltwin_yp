/**
 * 
 */

window.onload = function(){
	module.init();
}

var module = {
		current : null,
		init:function(){
			$.ajax({
				url: "/moduleList.do",
				type: "POST",
				success: function(result) {
					console.log(result);
					var data = JSON.parse(result);
					data = data.result;
					$('#moduelList').html('');
					
					var html = '';
					for(var i=0;i<data.length;i++){
						html +='<li><button type="button" class="dataPopup" onclick="module.select(\''+data[i]+'\')">'+data[i]+'</li>';
					}
					
					$('#moduelList').append(html);
				}
			});
		},
		select:function(id){
			var fileHtml = '/moduleData/'+id+'/'+id+'.html';
			var fileCss =  '/moduleData/'+id+'/'+id+'.css';
			var fileJs =  '/moduleData/'+id+'/'+id+'.js';
			
			if(module.current != id && module.current != null){
				eval(module.current).destory();
				$('#'+module.current).remove();
				
				module.current = id;
				
				$('#container').append('<div id="'+id+'"></div>');
				$('#'+id).load(fileHtml, function(){
					$.loadCSS(fileCss, function() {	
						$.getScript(fileJs, function() {	
							eval(id).init();
						});
					});
				})
			} else if(module.current == null){
				module.current = id;
				
				$('#container').append('<div id="'+id+'"></div>');
				$('#'+id).load(fileHtml, function(){
					$.loadCSS(fileCss, function() {	
						$.getScript(fileJs, function() {	
							eval(id).init();
						});
					});
				})
			} else if(module.current == id){
				eval(module.current).destory();
				$('#'+module.current).remove();
				
				module.current = null;
			}
		}
}

jQuery.loadCSS = function(url, callback) {
    if (!$('link[href="' + url + '"]').length) {
    	$('head').append('<link rel="stylesheet" type="text/css" href="' + url + '">');
    }
    callback();
}