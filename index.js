var http 			= require("http")
,	path			= require('path')
,	vHostsLoader 	= require("./app/application-src")
,	proxy 			= require("http-proxy").createProxyServer({})
,	dir 			= __dirname
,	filename 		= 'data.txt'
;

startProx = function(config) {
	var server = http.createServer(function(req,res){
		proxy.web( req, res, {
			target:"http://127.0.0.1:" + config[req.headers.host] + "/",
			ws:true
		}, function(e){
			res.writeHead(404, { 'Content-Type' : 'text/plain' });
			res.end('Requested Application not Found or Active.');
			console.log(config, config[req.headers.host], req.headers.host);
			console.log(req.headers.host + ':' + config[req.headers.host] + " :: " + e.code);
		});
	}).listen(80);

	server.on('error', function(e) {
		if (e.code == 'EADDRINUSE') {
			console.log('Address in use... quitting');
			server.close();
		}
	})
}

vHostsLoader.init(path.join(dir, filename), startProx );
