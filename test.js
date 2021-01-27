const {Curl} = require('node-libcurl');


const curl2 = new Curl()
curl2.setOpt('URL', 'http://103.92.26.5:1337/transactions?transactionID=121414');
curl2.setOpt(Curl.option.FOLLOWLOCATION, true)
curl2.setOpt(Curl.option.SSL_VERIFYHOST, false)
curl2.setOpt(Curl.option.SSL_VERIFYPEER, false);
curl2.setOpt(Curl.option.CUSTOMREQUEST, 'GET');
curl2.setOpt(Curl.option.VERBOSE, true);

curl2.on('end', (statusCode, body, headers, curlInstance) => {
    console.log(body);
});

curl2.perform();