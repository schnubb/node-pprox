const fs = require('fs')
,_ = require('underscore')
;

_log = function(stuff) { console.log(stuff) };

parseDomainArray = function(doms) {
  // cleanup
  const str = doms.replace(/(\r\n|\n|\r)/gm,';;');
  const retArray = [];
  doms = str.split(';;');
  doms = _.without(doms, '', ' ');
  // cleanup done!

  doms.forEach((data) => {
    d = data.split(':');
    retArray[d[0]] = d[1];
  });
  retArray.length = doms.length;
  // Why?!
  retArray.shift();
  // get it
  return retArray;
};

exports.init = function(dirfile, next) {
  fs.readFile(dirfile, function(e, cont) {
      if(e) throw new Error(e);
      let domains = [];
      if (cont.toString().length > 0) {
        domains = parseDomainArray(cont.toString());
        _log(_.size(domains) + domains.length + ' Hosts loaded, proceed with server init...');

        next(domains);
      } else {
        throw new Error({msg: 'No valid domain configuration!'})
      }
  });
};
