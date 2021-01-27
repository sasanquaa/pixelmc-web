const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const proxy = require('express-http-proxy');
const https = require('https');
const fs = require('fs');
const {Curl} = require('node-libcurl');

app.use(express.static(path.join(__dirname, '..', 'build')));
//app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser());
app.use('/api', proxy('localhost:1337', {
  proxyReqPathResolver: function (req) {
    return req.url.split('/api').join();
  }
}));

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

var API_KEY = '16075239652238559553'
var API_URL = `https://thesieutoc.net/chargingws/v2?APIkey=${API_KEY}&mathe={0}&seri={1}&menhgia={2}&type={3}&content={4}`;

process.env.PORT = 443;

app.post('/napthe/callback', function(req, res) {
    var body2 = req.body;
    var status;
    switch(body2.status) {
      case 'thanhcong':
        status = 'success';
        break;
      case 'thatbai':
        status = 'failure';
        break;
      case 'saimenhgia':
        status = 'invalid';
        break;
      default:
        status = 'error';
        break;
    }

    var curl = new Curl()
    curl.setOpt('URL', `localhost:1337/transactions?transactionID=${body2.transaction_id}`);
    curl.setOpt(Curl.option.FOLLOWLOCATION, true)
    curl.setOpt(Curl.option.SSL_VERIFYHOST, false)
    curl.setOpt(Curl.option.SSL_VERIFYPEER, false);
    curl.setOpt(Curl.option.CUSTOMREQUEST, 'GET');
    curl.setOpt(Curl.option.VERBOSE, true);

    curl.on('end', (statusCode, body, headers, curlInstance) => {
      body = JSON.parse(body)[0];

      console.log(body)

      if(body) {
        curl = new Curl()
        curl.setOpt('URL', `localhost:1337/transactions/${body.id}`);
        curl.setOpt(Curl.option.FOLLOWLOCATION, true)
        curl.setOpt(Curl.option.SSL_VERIFYHOST, false)
        curl.setOpt(Curl.option.SSL_VERIFYPEER, false);
        curl.setOpt(Curl.option.CUSTOMREQUEST, 'PUT');
        curl.setOpt(Curl.option.VERBOSE, true);
        curl.setOpt(Curl.option.POSTFIELDS, 
            JSON.stringify({
              cardStatus: status
            })
        );
        curl.setOpt(Curl.option.HTTPHEADER, ['Content-Type: application/json']);
        curl.on('end', (statusCode, body, headers, curlInstance) => {

          console.log(JSON.parse(body));
        });

        curl.perform();
      }
    });

    curl.perform();

    return res.end();
});

app.post('/napthe/submit', function(req, res) {
  var body2 = req.body;
  var url = API_URL.format(body2.mathe, body2.serial, body2.menhgia, body2.loaithe, body2.content);
	const curl = new Curl()
	curl.setOpt('URL', url)
	curl.setOpt(Curl.option.FOLLOWLOCATION, true)
	curl.setOpt(Curl.option.SSL_VERIFYHOST, false)
	curl.setOpt(Curl.option.SSL_VERIFYPEER, false);
	curl.setOpt(Curl.option.CUSTOMREQUEST, 'GET');
	curl.setOpt(Curl.option.VERBOSE, true);
	curl.on('end', (statusCode, body, headers, curlInstance) => {
    body = JSON.parse(body);
    if(body.status == '00') {

      const curl2 = new Curl()
      curl2.setOpt('URL', 'localhost:1337/transactions');
      curl2.setOpt(Curl.option.FOLLOWLOCATION, true)
      curl2.setOpt(Curl.option.SSL_VERIFYHOST, false)
      curl2.setOpt(Curl.option.SSL_VERIFYPEER, false);
      curl2.setOpt(Curl.option.CUSTOMREQUEST, 'POST');
      curl2.setOpt(Curl.option.VERBOSE, true);
      curl2.setOpt(Curl.option.POSTFIELDS, 
          JSON.stringify({
            transactionID: body.transaction_id,
            username: body2.username,
            cardType: body2.loaithe,
            cardValue: `V${body2.menhgia}`,
            cardSerial: body2.serial,
            cardStatus: 'pending',
            datetime: Date.now(),
            youtuber: body2.youtuber,
            processed: false
          })
      );
      curl2.setOpt(Curl.option.HTTPHEADER, ['Content-Type: application/json']);

      curl2.on('end', (statusCode, body, headers, curlInstance) => {
      });

      curl2.perform();
    }
    res.send(body);
		curl.close();
	});
	curl.on('error', (error, errorCode) => {
		curl.close()
	})
	curl.perform();
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,'..' ,'build', 'index.html'));
}); 

var key = fs.readFileSync(path.join(__dirname, 'key.key'), 'utf8');
var cert = fs.readFileSync(path.join(__dirname, 'certificate.crt'), 'utf8');
var intermediate = fs.readFileSync(path.join(__dirname, 'AlphaSSL_Intermediate.crt'), 'utf8');

https.createServer({
	key: key,
  cert: cert,
  requestCert: true,
  rejectUnauthorized: false
}, app).listen(process.env.PORT, '0.0.0.0');   