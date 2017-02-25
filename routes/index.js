var express = require('express');
var router = express.Router();
var cmd = require('node-cmd');
/* GET home page. */
router.get('/', function(req, res, next) {
if(req['headers']['user-agent'].includes("curl")){
	console.log("Agent exist!")
}
cmd.get(
        'wttr nyc',
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
