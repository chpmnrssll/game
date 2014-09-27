$(document).ready(function () {
	Tabletop.init({
		key: '0ArGSorgsgZvbdEFWWE5uN0NncDA0U1VHbzhHRV9YQVE',
		callback: function(data, tabletop) { 
			var i, dataLength = data.length;
			
			for(i = 0; i < dataLength; i++) {
				$('#cms').append("<div><h3>" + data[i].title + "</h3><hr/><span>" + data[i].content + "</span></div>");
			}
		},
		simpleSheet: true 
	});
});