var fs 			= require('fs')
,	path		= require('path')
,	dir 		= __dirname
,	filename 	= 'data.txt';

parseDomains = function(str){
	var trial = str.split(':');
	if(trial[1].length !== 4) return false;
	else return true;
}

exports.init = function(next) {
	fs.readFile( path.join(dir, '..', filename), function(e, cont){
		if(e) throw new Error(e);

		if (!cont) {
			var domains = cont.toString().split('\n'),
			proxData=[];
			if(domains[(domains.length-1)] === '') domains.pop();
			if(parseDomains(domains[0])) {
				domains.forEach(function(str) {
					var d = str.split(':');
					proxData[d[0]] = d[1];
				});
				console.log(domains.length + ' Hosts loaded, proceed with server init...');
				next(proxData);
			}else{
				console.log('ERROR: ' + domains)
			}
		}else{
			throw new Error({Error: 'No valid domain configuration!'})
		}
	});
}
