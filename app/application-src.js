var fs 			= require('fs')
,	path		= require('path')
,	dir 		= __dirname
,	filename 	= 'data.txt';

parseDomainPort = function(str){
	if(str.length > 0) {
		var trial = str.split(':');
		if(trial[1].length !== 4) return false;
		else return true;
	} else return false;
}

parseDomainArray = function(domains) {
	var ret = {},
		l	= 0;

	for(i in domains) {
		if( domains[i] !== '' || domains[i].length !== 0 && parseDomainPort(domains[i]) ) {
			d = domains[i].split(':');
			ret[d[0]] = d[1];
			l++;
		}
	}
	ret.length = l;
	console.log('returns:', ret.length, ret);
	return ret;
}

exports.init = function(next) {
	fs.readFile( path.join(dir, '..', filename), function(e, cont){

		if(e) throw new Error(e);

		if (cont.toString().length > 0) {
			var domains = parseDomainArray( cont.toString().replace(/(\r)$/gm,'').split('\n') );
			console.log(domains.length + ' Hosts loaded, proceed with server init...');

			next(domains);

		}else{
			throw new Error({Error: 'No valid domain configuration!'})
		}
	});
}
