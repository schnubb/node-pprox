var fs  = require("fs"),
    path= require("path"),
    dir = __dirname + "/",
    file= "data.txt";

var checkData = function(){
    var p = path.join(dir, file);
    fs.stat( p, function(err, stat){
        if(err.code === "ENOENT") {
            createDatafile();
        }
        else return true;

    })
}

var createDatafile = function() {
    var example = path.join("example.data.txt"),
        data    = path.join("data.txt");

    var write = fs.createWriteStream(data);
    var read  = fs.createReadStream(example).pipe( write );

    read.on("error", function(e){ throw e });
    write.on("error", function(e){ throw e});

    read.on("end", function(){ write.end("copied " + example + " to " + data); });
}

checkData();
