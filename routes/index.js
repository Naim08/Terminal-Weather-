var express = require('express');
var geoip = require('geoip-lite');
var router = express.Router();
var cmd = require('node-cmd');
/* GET home page. */
router.get('/', function(req, res, next) {
    var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

     //purpose of location
     var geo = geoip.lookup(ip);
     var location = geo['city'] +', '+geo['region']+', '+geo['country']

 cmd.get(
        'curl wttr.in/@'+ip,
        function(err, data, stderr){
            if(!err) {
            if(req['headers']['user-agent'].includes("curl")){
                data = data.slice(0, data.search("New feature"))
                res.send(data);
            } else {
    		  res.redirect('https://naimmiah.com/');
            }       
            } else {
                console.log(err)
            }
        }
    );
//    cmd.get(
//            'curl wttr.in',
//            function(data){
//                console.log(data);
//                data = data.slice(0, data.search("New feature"))
//                if(req['headers']['user-agent'].includes("curl")){
//            res.send(data);
//    } else {
//    		res.redirect('https://naimmiah.com/');
//    }       
//        console.log(data)
//            }
//        )
//      
    });

module.exports = router;

