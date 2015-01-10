var http = require("http")
,	vHostsLoader = require("./app/application-src")
,	proxy = require("http-proxy").createProxyServer({});

vHostsLoader.init(function(conf){
	var server = http.createServer(function(req,res){
		proxy.web( req, res, {
			target:"http://127.0.0.1:" + conf[req.headers.host] + "/",
			ws:true
		}, function(e){
			res.writeHead(404, { 'Content-Type' : 'text/plain' });
			res.end('Requested Application not Found or Active.');
			console.log(conf);
			console.log(req.headers.host + ':' + conf[req.headers.host] + " :: " + e.code);
		});
	}).listen(80);
});
