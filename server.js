const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}));

const distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.listen(process.env.PORT || 8000, () => {
  console.log('Server started');
});

app.route('/api/authtoken').get((req, res) => {

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer('aeeec6d2a17b46008124e63cda6b9146' + ':' + '2ebf6f87c51a4e4495f14a4a09afd83f').toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, function (error, response, body) {

    if (!error) {
      console.log('sending access token');
      res.send({authtoken: body.access_token});
    } else {
      console.log(`Oh crap, something went wrong:  ${error}`)
    }
  });

});
