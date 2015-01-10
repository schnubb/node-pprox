var fs 			= require('fs')
,	path		= require('path')
,	dir 		= __dirname + '/'
,	filename 	= 'data.txt';

parseDomains = function(data){
	var trial = data.split(':');
	if(trial[1].length !== 4) return false;
	else return true;
}

exports.init = function(cb) {
	fs.readFile( path.join(dir, filename), function(e, content){
		var domains = content.toString().split('\n'),
		proxData=[];
		if(domains[(domains.length-1)] === '') domains.pop();
		if(parseDomains(domains[0])) {
			domains.forEach(function(data) {
				var d = data.split(':');
				proxData[d[0]] = d[1];
			});
			console.log(domains.length + ' Hosts loaded, proceed with server init...');
			cb(proxData);
		}else{
			console.log('ERROR: ' + domains)
		}
	});
}
