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
     console.log(ip)
var geo = geoip.lookup(ip);
var location = geo['city'] +', '+geo['region']+', '+geo['country']
    cmd.get(
            'wttr '+location,
            function(data){
                data = data.slice(0, data.search("New feature"))
                if(req['headers']['user-agent'].includes("curl")){
            res.send(data);
    } else {
    		res.redirect('https://naimmiah.com/');
    }       
        console.log(data)
            }
        )
      
    });

module.exports = router;

